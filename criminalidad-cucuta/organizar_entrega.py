"""Arma la entrega: capturas organizadas por trino (copias sin tocar de los
originales en capturas/), notas para las capturas manuales, fuentes de respaldo
aparte y un .zip con todo.
Uso: python3 organizar_entrega.py hilo.json carpeta_salida
(hilo.json es el hilo estructurado que produce el script de análisis de hilo.md)."""
import json
import os
import shutil
import sys
import zipfile

BASE = os.path.dirname(os.path.abspath(__file__))
hilo = json.load(open(sys.argv[1], encoding="utf-8"))
salida = sys.argv[2]
raiz = os.path.join(salida, "Capturas-hilo-Cucuta")
if os.path.exists(raiz):
    shutil.rmtree(raiz)
os.makedirs(raiz)

fuentes = {f["id"]: f for f in json.load(open(os.path.join(BASE, "fuentes.json"), encoding="utf-8"))}
consultas = {c["id"]: c for c in json.load(open(os.path.join(BASE, "consultas_oficiales.json"), encoding="utf-8"))}


def nota_manual(c, f, destino):
    lineas = [
        f"CAPTURA MANUAL {c['id']}",
        "",
        f"Qué debe mostrar: {c['que_muestra']}",
        f"Enlace: {f['url']}",
    ]
    if c.get("pagina"):
        lineas.append(f"Página del PDF: {c['pagina']}")
    if c.get("buscar"):
        lineas.append(f"Buscar en la página (Ctrl+F): {c['buscar']}")
    if c.get("nota"):
        lineas.append(f"Por qué es manual: {c['nota']}")
    lineas += ["", "Abrir el enlace en el navegador y tomar la captura sin editarla."]
    open(destino, "w", encoding="utf-8").write("\n".join(lineas) + "\n")


usadas = set()
resumen = []
for t in hilo["tweets"]:
    carpeta = os.path.join(raiz, f"Trino-{t['n']:02d}")
    os.makedirs(carpeta)
    open(os.path.join(carpeta, "texto-del-trino.txt"), "w", encoding="utf-8").write(t["texto"] + "\n")
    for i, cap in enumerate(t["capturas"], 1):
        c = consultas[cap["id"]]
        f = fuentes[cap["id"]]
        usadas.add(cap["id"])
        if c.get("manual"):
            nota_manual(c, f, os.path.join(carpeta, f"{i}-{cap['id']}-CAPTURA-MANUAL.txt"))
            resumen.append((t["n"], i, cap["id"], "manual"))
        else:
            shutil.copy2(os.path.join(BASE, "capturas", c["archivo"]), os.path.join(carpeta, f"{i}-{c['archivo']}"))
            resumen.append((t["n"], i, cap["id"], "ok"))

extra = os.path.join(raiz, "Respaldo-para-replicas")
os.makedirs(extra)
for cid, c in consultas.items():
    if cid in usadas:
        continue
    if c.get("manual"):
        nota_manual(c, fuentes[cid], os.path.join(extra, f"{cid}-CAPTURA-MANUAL.txt"))
    else:
        shutil.copy2(os.path.join(BASE, "capturas", c["archivo"]), os.path.join(extra, c["archivo"]))

shutil.copy2(os.path.join(BASE, "fuentes.md"), os.path.join(raiz, "Indice-de-fuentes.md"))
leeme = [
    "CAPTURAS DEL HILO: CRIMINALIDAD EN CÚCUTA",
    "",
    "Cada carpeta Trino-XX tiene:",
    "  - texto-del-trino.txt: el texto listo para pegar en X.",
    "  - Las capturas numeradas en el orden en que se adjuntan (1, 2, 3, 4).",
    "  - Archivos ...-CAPTURA-MANUAL.txt cuando el sitio bloquea navegadores automáticos",
    "    o pide registro: traen el enlace exacto para tomar la captura a mano.",
    "",
    "Respaldo-para-replicas: capturas que no van en el hilo pero sirven para responder.",
    "Indice-de-fuentes.md: qué prueba cada captura y su enlace exacto.",
    "",
    "Todas las capturas son reales y sin edición: páginas tomadas con un navegador,",
    "o la página tal cual de los documentos oficiales en PDF.",
]
open(os.path.join(raiz, "LEEME.txt"), "w", encoding="utf-8").write("\n".join(leeme) + "\n")

zip_path = os.path.join(salida, "Capturas-hilo-Cucuta.zip")
if os.path.exists(zip_path):
    os.remove(zip_path)
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for d, _, archivos in os.walk(raiz):
        for a in sorted(archivos):
            p = os.path.join(d, a)
            z.write(p, os.path.relpath(p, salida))
n_ok = sum(1 for r in resumen if r[3] == "ok")
n_man = sum(1 for r in resumen if r[3] == "manual")
print(f"trinos: {len(hilo['tweets'])}; capturas en trinos: {n_ok} reales + {n_man} manuales; "
      f"respaldo: {len(os.listdir(extra))}; zip: {os.path.getsize(zip_path) / 1e6:.1f} MB")
