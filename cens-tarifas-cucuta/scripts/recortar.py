"""Recorte de capturas sin edición.

- Web: recorta la captura completa (de capturar_web.js) a la franja que va del
  titular al texto buscado; si quedan muy lejos, produce dos recortes (titular y texto).
- PDF: renderiza la página del documento oficial con pdftoppm y recorta la franja
  que contiene el texto buscado, a todo el ancho útil de la página.
Solo se recorta: no se resalta, no se anota, no se retoca.
Uso: python3 -I recortar.py manifiesto.json carpeta_capturas carpeta_salida
"""
import json, os, subprocess, sys
from PIL import Image

manifest_path, cap_dir, out_dir = sys.argv[1:4]
items = json.load(open(manifest_path, encoding="utf-8"))
os.makedirs(out_dir, exist_ok=True)
web = {}
cw = os.path.join(cap_dir, "cajas_web.json")
if os.path.exists(cw):
    web = {r["id"]: r for r in json.load(open(cw, encoding="utf-8"))}

SCALE = 2  # deviceScaleFactor de capturar_web.js
MAX_ALTO = 1500  # px CSS: más alto que esto, se parte en dos recortes
log = []

def crop_web(it):
    """Franjas horizontales a todo el ancho de la vista, como una captura de pantalla normal.
    A: encabezado del medio + titular + fecha. B: el texto que prueba el dato.
    Si A y B quedan cerca, sale una sola imagen. `recortes` en el manifiesto fija franjas a mano (px CSS)."""
    r = web.get(it["id"])
    if not r or not r.get("ok"):
        return [f"{it['id']}: sin captura web ({r.get('error') if r else 'no corrida'})"]
    Image.MAX_IMAGE_PIXELS = None  # captura propia de página completa
    img = Image.open(r["completa"])
    W, H = img.size
    b = r["boxes"]
    vw = b.get("viewportWidth", W / SCALE)
    msgs = [f"{it['id']}: NO encontrado en la página: {f['find']!r}" for f in b["finds"] if not f["box"]]
    bands = []
    if it.get("recortes"):
        bands = [tuple(x) for x in it["recortes"]]
    else:
        finds = [f["box"] for f in b["finds"] if f["box"]]
        t, fe, hd = b.get("titular"), b.get("fecha"), b.get("header")
        A = None
        if it.get("con_titular", True) and t:
            top = t["y"] - it.get("arriba_titular", 70)
            if hd and hd["y"] < t["y"] and t["y"] - (hd["y"] + hd["h"]) < it.get("max_hueco_cabecera", 450):
                top = min(top, hd["y"])
            bottom = t["y"] + t["h"]
            if fe and fe["y"] >= t["y"] and fe["y"] - bottom < 600:
                bottom = max(bottom, fe["y"] + fe["h"])
            A = [max(0, top), bottom + it.get("abajo_titular", 30)]
        B = None
        if finds:
            B = [max(0, min(f["y"] for f in finds) - 20), max(f["y"] + f["h"] for f in finds) + 20]
        if A and B and B[1] - A[0] <= MAX_ALTO and B[0] >= A[0]:
            bands = [(0, A[0], vw, B[1])]
        else:
            bands = [(0, x[0], vw, x[1]) for x in (A, B) if x]
    for i, (x0, y0, x1, y1) in enumerate(bands):
        suf = "" if len(bands) == 1 else f"_{chr(97 + i)}"
        box = tuple(int(v * SCALE) for v in (x0, y0, min(x1, W / SCALE), min(y1, H / SCALE)))
        p = os.path.join(out_dir, f"{it['id']}{suf}.png")
        img.crop(box).save(p, optimize=True)
        msgs.append(f"{it['id']}{suf}: {p} {box}")
    return msgs

def crop_pdf(it):
    import pdfplumber
    pdf, page_no = it["archivo"], it["pagina"]
    dpi = it.get("dpi", 200)
    with pdfplumber.open(pdf) as doc:
        page = doc.pages[page_no - 1]
        boxes, missing = [], []
        for f in it.get("buscar", []):
            m = page.search(f, regex=False, case=False)
            if m:
                boxes.extend(m if it.get("todas") else m[:1])
            else:
                missing.append(f)
        pw, ph = page.width, page.height
    msgs = [f"{it['id']}: NO encontrado en p.{page_no}: {m!r}" for m in missing]
    if it.get("franja"):
        top, bottom = it["franja"]  # puntos PDF, para tablas sin texto buscable
    elif boxes:
        top = min(b["top"] for b in boxes) - it.get("margen_arriba", 28)
        bottom = max(b["bottom"] for b in boxes) + it.get("margen_abajo", 28)
    else:
        return msgs
    left, right = it.get("x", (18, pw - 18))
    prefix = os.path.join(out_dir, f"_{it['id']}_render")
    subprocess.run(["pdftoppm", "-f", str(page_no), "-l", str(page_no), "-r", str(dpi), "-png", "-singlefile", pdf, prefix], check=True)
    img = Image.open(prefix + ".png")
    k = dpi / 72.0
    box = (int(max(0, left) * k), int(max(0, top) * k), int(min(pw, right) * k), int(min(ph, bottom) * k))
    p = os.path.join(out_dir, f"{it['id']}.png")
    img.crop(box).save(p, optimize=True)
    os.remove(prefix + ".png")
    msgs.append(f"{it['id']}: {p} {box}")
    return msgs

for it in items:
    try:
        log += crop_web(it) if it["tipo"] == "web" else crop_pdf(it)
    except Exception as e:
        log.append(f"{it['id']}: ERROR {e}")
print("\n".join(log))
