"""Descarga las series oficiales (MinDefensa / Policía Nacional, datos.gov.co)
para Cúcuta y su área metropolitana y las guarda en datos/*.csv.
Uso: python3 descargar_datos.py"""
import csv, json, os, urllib.parse, urllib.request

BASE = "https://www.datos.gov.co/resource/{}.json?"
AM = ("54001", "54874", "54405", "54261", "54673", "54553")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "datos")
os.makedirs(OUT, exist_ok=True)

def q(ds, **params):
    url = BASE.format(ds) + urllib.parse.urlencode({"$" + k: v for k, v in params.items()})
    with urllib.request.urlopen(url, timeout=120) as r:
        return json.load(r), url

def guardar(nombre, filas, url, campos):
    with open(os.path.join(OUT, nombre), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["# fuente: " + url])
        w.writerow(campos)
        for r in filas:
            w.writerow([r.get(c, "") for c in campos])
    print("ok", nombre, len(filas))

inm = "cod_muni in(" + ",".join(f"'{c}'" for c in AM) + ")"
anio = "date_extract_y(fecha_hecho)"
series = [
    ("homicidios_cucuta_anual.csv", "m8fd-ahd9", dict(select=f"{anio} as anio, sum(cantidad) as homicidios", where="cod_muni='54001'", group="anio", order="anio"), ["anio", "homicidios"]),
    ("homicidios_cucuta_ene_sep.csv", "m8fd-ahd9", dict(select=f"{anio} as anio, sum(cantidad) as homicidios_ene_sep", where="cod_muni='54001' AND date_extract_m(fecha_hecho) <= 9", group="anio", order="anio"), ["anio", "homicidios_ene_sep"]),
    ("homicidios_area_metropolitana.csv", "m8fd-ahd9", dict(select=f"{anio} as anio, municipio, sum(cantidad) as homicidios", where=inm, group="anio, municipio", order="anio, municipio", limit="1000"), ["anio", "municipio", "homicidios"]),
    ("homicidios_cucuta_modalidad.csv", "m8fd-ahd9", dict(select=f"{anio} as anio, _modalidad_presunta as modalidad, sum(cantidad) as homicidios", where="cod_muni='54001'", group="anio, modalidad", order="anio, homicidios DESC", limit="2000"), ["anio", "modalidad", "homicidios"]),
    ("extorsion_cucuta_anual.csv", "q2ib-t9am", dict(select=f"{anio} as anio, sum(cantidad) as extorsiones", where="cod_muni='54001'", group="anio", order="anio"), ["anio", "extorsiones"]),
    ("terrorismo_cucuta_anual.csv", "yi5j-5fe9", dict(select=f"{anio} as anio, sum(cantidad) as terrorismo", where="cod_muni='54001'", group="anio", order="anio"), ["anio", "terrorismo"]),
    ("terrorismo_area_metropolitana_detalle_2024_2026.csv", "yi5j-5fe9", dict(select="fecha_hecho, municipio, zona, cantidad", where=inm + " AND fecha_hecho >= '2024-01-01'", order="fecha_hecho", limit="1000"), ["fecha_hecho", "municipio", "zona", "cantidad"]),
    ("masacres_cucuta.csv", "u8eq-92tb", dict(select="fecha_hecho, municipio, casos, victimas", where="cod_muni='54001'", order="fecha_hecho"), ["fecha_hecho", "municipio", "casos", "victimas"]),
    ("secuestro_cucuta_anual.csv", "d7zw-hpf4", dict(select=f"{anio} as anio, sum(cantidad) as secuestros", where="cod_muni='54001'", group="anio", order="anio"), ["anio", "secuestros"]),
]
for nombre, ds, params, campos in series:
    filas, url = q(ds, **params)
    guardar(nombre, filas, url, campos)
