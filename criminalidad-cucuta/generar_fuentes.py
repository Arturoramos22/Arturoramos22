"""Genera fuentes.md y fuentes.json a partir de consultas_oficiales.json y
capturas/_registro.json. Uso: python3 generar_fuentes.py"""
import json
import os
import urllib.parse

BASE = os.path.dirname(os.path.abspath(__file__))
lista = json.load(open(os.path.join(BASE, "consultas_oficiales.json"), encoding="utf-8"))
reg_path = os.path.join(BASE, "capturas", "_registro.json")
registro = json.load(open(reg_path, encoding="utf-8")) if os.path.exists(reg_path) else {}

TIPOS = {
    "D": "Datos oficiales (MinDefensa/Policía en datos.gov.co; DANE)",
    "O": "Documento oficial o judicial (PDF)",
    "W": "Página web oficial",
    "R": "Ranking de la ONG mexicana CCSPJP (no oficial)",
    "E": "Estudio científico o informe de centro de pensamiento",
    "I": "Organismo internacional",
    "P": "Prensa",
}


def url_de(c):
    if c["tipo"] == "soql":
        return f"https://www.datos.gov.co/{urllib.parse.quote(c['dataset'], safe='/')}/explore/query/{urllib.parse.quote(c['soql'], safe='')}/page/filter"
    return c["url"]


salida = []
for c in lista:
    archivo = c["archivo"]
    existe = os.path.exists(os.path.join(BASE, "capturas", archivo))
    if c.get("manual"):
        estado = "manual"
    elif existe:
        estado = "capturada"
    else:
        estado = "pendiente"
    salida.append({
        "id": c["id"],
        "categoria": TIPOS.get(c["id"][0], ""),
        "que_muestra": c["que_muestra"],
        "url": url_de(c),
        "pagina_pdf": c.get("pagina"),
        "buscar_en_pagina": c.get("buscar"),
        "captura": f"capturas/{archivo}" if existe else None,
        "estado": estado,
        "capturado": registro.get(c["id"], {}).get("capturado"),
        "nota": c.get("nota"),
    })

json.dump(salida, open(os.path.join(BASE, "fuentes.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

orden = "DOWRIEP"
lineas = [
    "# Índice de fuentes",
    "",
    f"{len(salida)} fuentes: {sum(s['estado'] == 'capturada' for s in salida)} con captura real tomada, "
    f"{sum(s['estado'] == 'manual' for s in salida)} para capturar a mano (el sitio bloquea navegadores automáticos o pide registro) "
    f"y {sum(s['estado'] == 'pendiente' for s in salida)} pendientes.",
    "",
    "Las consultas a datos.gov.co abren el explorador oficial con la misma tabla de la captura. "
    "En los PDF se indica la página. Cuando hay texto que buscar en la página, va en la columna «Buscar».",
    "",
]
for letra in orden:
    grupo = [s for s in salida if s["id"][0] == letra]
    if not grupo:
        continue
    lineas += [f"## {TIPOS[letra]}", "", "| ID | Qué prueba | Enlace | Captura | Estado |", "|---|---|---|---|---|"]
    for s in grupo:
        enlace = f"[abrir]({s['url']})" + (f" (p. {s['pagina_pdf']})" if s["pagina_pdf"] else "")
        if s["buscar_en_pagina"]:
            enlace += f" · Buscar: «{s['buscar_en_pagina']}»"
        cap = f"`{os.path.basename(s['captura'])}`" if s["captura"] else "—"
        estado = s["estado"] + (f": {s['nota']}" if s["nota"] and s["estado"] != "capturada" else "")
        que = s["que_muestra"].replace("|", "/")
        lineas.append(f"| {s['id']} | {que} | {enlace} | {cap} | {estado} |")
    lineas.append("")

open(os.path.join(BASE, "fuentes.md"), "w", encoding="utf-8").write("\n".join(lineas))
print("fuentes:", len(salida))
