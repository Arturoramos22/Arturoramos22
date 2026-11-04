"""Convierte trino.md (trino único + hilo) en el JSON que usan organizar_entrega.py y
generar_word.js. Uso: python3 analizar_trino.py trino.md salida.json"""
import json
import re
import sys

md = open(sys.argv[1], encoding="utf-8").read()
partes = re.split(r"^## ", md, flags=re.M)
sec = {p.split("\n", 1)[0].strip(): p.split("\n", 1)[1] if "\n" in p else "" for p in partes[1:]}


def capturas(linea):
    return [dict(id=m.group(1), manual=bool(m.group(2))) for m in re.finditer(r"([A-Z]\d{2})( \*\(manual\)\*)?", linea)]


tweets = []
# A. Trino único
cuerpo = sec["A. Trino único"].split("---")[0].strip().splitlines()
texto = [l for l in cuerpo if l.strip() and not l.startswith("🖼️")]
caps = [c for l in cuerpo if l.startswith("🖼️") for c in capturas(l)]
t = "\n".join(texto)
tweets.append(dict(n=0, etiqueta="Trino único", carpeta="Trino-unico", titulo="", bloque="A. Trino único",
                   texto=t, caracteres=len(t), capturas=caps, respaldo=[]))
# B. Hilo
cur = None
for l in sec["B. Hilo"].split("---")[0].splitlines():
    m = re.match(r"^\*\*(\d+)/\s*(.*?)\*\*\s*$", l)
    if m:
        cur = dict(n=int(m.group(1)), titulo=m.group(2).strip(), bloque="B. Hilo de 9 trinos", lineas=[], capturas=[], respaldo=[])
        tweets.append(cur)
        continue
    if cur is None:
        continue
    if l.startswith("🖼️"):
        cur["capturas"] += capturas(l)
    elif l.strip():
        cur["lineas"].append("– " + l[2:] if l.startswith("- ") else l)
for t in tweets[1:]:
    txt = f"{t['n']}/" + (f" {t['titulo']}" if t["titulo"] else "")
    txt = (txt + "\n" if t["titulo"] else txt + " ") + "\n".join(t.pop("lineas"))
    t["texto"] = txt.strip()
    t["caracteres"] = len(t["texto"])

salida = dict(
    titulo="¡Ay, Presidente!",
    subtitulo="Lavado de activos en Cúcuta y la Operación Némesis",
    resumen_portada=f"Trino único + hilo de {len(tweets) - 1} trinos",
    fecha="Borrador del 4 de noviembre de 2026, verificado contra las fuentes",
    pie="¡Ay, Presidente!",
    nombre_entrega="Capturas-trino-lavado-Cucuta",
    titulo_leeme="CAPTURAS DEL TRINO: LAVADO DE ACTIVOS EN CÚCUTA Y OPERACIÓN NÉMESIS",
    como_usar=[
        "Hay dos versiones para elegir: un trino único (largo, para cuenta Premium) y un hilo de 9 trinos.",
        "Cada trino trae su texto listo para copiar y pegar en X (recuadro azul), con su número de caracteres.",
        "Debajo van las capturas que se adjuntan, en el orden en que deben subirse. Son reales y sin edición. Los originales en tamaño completo están en el .zip, en la carpeta del trino y con el mismo número de orden.",
        "Las celdas amarillas son capturas manuales: el sitio bloquea navegadores automáticos o pide registro. Hay que abrir el enlace y tomar la captura desde el navegador.",
        "Al final están qué cambié de tu borrador y por qué, los datos para responder réplicas, lo que hay que revisar antes de publicar y el índice de fuentes.",
    ],
    enfoque=[
        "Se mantiene tu tono (¡Ay, Presidente!, sumercé, las preguntas al final), pero cada afirmación descansa en una fuente que se puede mostrar sin editar.",
        "El golpe central cambia: no que Cúcuta sea la ciudad con más lavado (ninguna entidad lo dice), sino que aquí el lavado casi no se investiga y que la Operación Némesis no trajo ni una captura por lavado.",
    ],
    secciones=[dict(titulo="Qué cambié de tu borrador y por qué", md=sec["Qué cambié de tu borrador y por qué"].strip()),
               dict(titulo="Para las réplicas", md=sec["Para las réplicas"].strip()),
               dict(titulo="Antes de publicar", md=sec["Antes de publicar"].strip())],
    categorias={"X": "Trino del Presidente", "V": "Video del trino presidencial", "F": "Fiscalía (datos.gov.co)", "M": "MinDefensa (datos.gov.co)",
                "A": "Defensoría del Pueblo, AT 027-24", "G": "GAFILAT, DANE y DIAN", "U": "UIAF", "W": "Páginas oficiales (Policía, DIAN, Defensoría)",
                "T": "Caso TD Bank", "N": "Operación Némesis y operativos del Gobierno", "P": "Prensa sobre casos de lavado"},
    orden_categorias="XVFMAGUWTNP",
    tweets=tweets,
)
json.dump(salida, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for t in tweets:
    print(t.get("etiqueta") or t["n"], t["caracteres"], [c["id"] for c in t["capturas"]])
