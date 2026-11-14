"""Genera el Excel de bienes inmuebles del Municipio de Cúcuta entregados a terceros.

Fuentes: SECOP I y SECOP II (datos.gov.co, Colombia Compra Eficiente), consultados en
noviembre de 2026, y casos documentados en prensa / órganos de control (casos.json).

Uso:  python3 generar_excel.py
"""
import json
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

AQUI = Path(__file__).parent
FONT = "Arial"
HDR_FILL = PatternFill("solid", fgColor="1F3864")
HDR_FONT = Font(name=FONT, bold=True, color="FFFFFF", size=10)
BODY = Font(name=FONT, size=10)
BOLD = Font(name=FONT, size=10, bold=True)
LINK = Font(name=FONT, size=10, color="0563C1", underline="single")
INPUT_FILL = PatternFill("solid", fgColor="FFF2CC")
ALTA = PatternFill("solid", fgColor="F8CBAD")
MEDIA = PatternFill("solid", fgColor="FFE699")
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")

SECOP_I = "https://www.contratos.gov.co/consultas/detalleProceso.do?numConstancia="

# ---------------------------------------------------------------------------
# Bienes del municipio entregados a terceros, revisados uno a uno a partir de SECOP.
# (tercero, tipo_tercero, bien, identificacion, titulo, firma, fin, fuente, id, url,
#  renovacion_visible, prioridad, observacion)
# ---------------------------------------------------------------------------
OITI = ("Local(es) C.C. El Oití, Calle 10 con Av. 7 N° 6-81 y 10-45 (propiedad horizontal)")
OITI_OBS = ("Arriendo a 60 meses firmado el 27-dic-2019. Venció el 27-dic-2024. No aparece "
            "prórroga ni contrato nuevo en SECOP II. Preguntar si el local sigue ocupado, "
            "si se paga canon y si se inició restitución.")
ENTREGADOS = [
    ("JACKSON EDUARDO VARGAS TORRADO", "Persona natural", OITI, "Locales 3-042, 3-043 y 3-044",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3130", SECOP_I + "19-12-10246748",
     "No", "Alta", OITI_OBS + " Canon reportado: $285.000."),
    ("JAQUELINE REYES VALENCIA", "Persona natural", OITI, "Local 3-131",
     "Arrendamiento", "2019-12-27", "2020-02-25", "SECOP I", "3143", SECOP_I + "19-12-10246812",
     "No", "Alta", "Plazo registrado de 60 días (posible error de digitación: los demás son 60 meses). "
     "En cualquier caso está vencido y sin renovación visible."),
    ("FRANCISCO JOSE RODRIGUEZ RESTREPO", "Persona natural", OITI, "Locales 3-062 y 3-063",
     "Arrendamiento (registrado como prestación de servicios)", "2019-12-27", "2024-12-27", "SECOP I", "3140",
     SECOP_I + "19-12-10246779", "No", "Alta", OITI_OBS + " Canon reportado: $460.000."),
    ("ERIKA NORAIMA GAMBOA RODRIGUE", "Persona natural", OITI, "Local 3-011",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3135", SECOP_I + "19-12-10246778",
     "No", "Alta", OITI_OBS + " Canon reportado: $320.000."),
    ("ANA LUCIA BAUTISTA", "Persona natural", OITI, "Local 3-302",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3124", SECOP_I + "19-12-10246672",
     "No", "Alta", OITI_OBS + " Canon reportado: $230.000."),
    ("GABRIEL GIOVANNI DIAZ GAURIN", "Persona natural", OITI, "Local 3-252",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3126", SECOP_I + "19-12-10246702",
     "No", "Alta", OITI_OBS + " Canon reportado: $230.000."),
    ("LEIDY PAOLA GELVEZ RINCON", "Persona natural", OITI, "Locales 3-213 y 3-214",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3127", SECOP_I + "19-12-10246741",
     "No", "Alta", OITI_OBS + " Canon reportado: $460.000."),
    ("CAROLINA BLANCO BLANCO", "Persona natural", OITI, "Local 3-092",
     "Arrendamiento", "2019-12-27", "2024-12-27", "SECOP I", "3142", SECOP_I + "19-12-10246805",
     "No", "Alta", OITI_OBS + " Canon reportado: $230.000."),
    ("FUNDACION LA BANDA DEL INDIO", "Privado sin ánimo de lucro",
     "Inmueble municipal (no identificado en el registro abierto; ver documentos del proceso)", "",
     "Comodato (gratuito)", "2019-02-16", "2024-02-16", "SECOP I", "COMODATO", SECOP_I + "19-12-9092496",
     "No", "Alta", "Comodato a 60 meses vencido en feb-2024 sin renovación visible en SECOP II. "
     "Pedir el contrato, el acta de entrega y el acta de restitución."),
    ("FUNDACION FAMILIAR PRO REHABILITACION DE FARMACODEPENDIENTES (FARO)", "Privado sin ánimo de lucro",
     "Inmueble municipal (no identificado en el registro abierto; ver documentos del proceso)", "",
     "Comodato (gratuito)", "2013-07-22", "2013-12-25", "SECOP I", "705", SECOP_I + "13-12-1988600",
     "No", "Media", "Comodato de 5 meses, renovado en 2015 (contrato 001). Ver fila siguiente. En 2014 el municipio firmó con FARO el convenio de asociación 921 para poner en funcionamiento el Megacentro Santiago Apóstol; verificar si es el mismo inmueble."),
    ("FUNDACION FAMILIAR PRO REHABILITACION DE FARMACODEPENDIENTES (FARO)", "Privado sin ánimo de lucro",
     "Inmueble municipal (no identificado en el registro abierto; ver documentos del proceso)", "",
     "Comodato (gratuito)", "2015-01-06", "2015-12-20", "SECOP I", "001", SECOP_I + "15-12-3858701",
     "No", "Alta", "Último comodato visible; vencido desde dic-2015. Verificar si la fundación "
     "sigue en el inmueble y con qué título."),
    ("CENTRAL DE ABASTOS DE CUCUTA S.A. - CENABASTOS", "Sociedad anónima (verificar participación pública)",
     "Locales del Centro Comercial Las Mercedes de propiedad del municipio", "",
     "Convenio de administración, arrendamiento y venta", "2013-10-01", "2014-01-01", "SECOP I", "1127",
     SECOP_I + "15-12-4021452", "No", "Alta",
     "El convenio cita locales transferidos a Cenabastos bajo condición resolutoria (convenio 1704 de 2009) "
     "que fueron devueltos, y locales vendidos con opción de compra (convenio 921 de 2012). "
     "Pedir el listado de locales: cuáles se vendieron y escrituraron, cuáles siguen a nombre del "
     "municipio y quién los ocupa."),
    ("UNIVERSIDAD DE PAMPLONA", "Público (universidad departamental)",
     "Infraestructura educativa de propiedad del municipio (sede no indicada en el registro)", "",
     "Concesión", "2008-02-04", "2020-02-04", "SECOP I", "01475", SECOP_I + "07-1-28189",
     "No", "Media", "Concesión a 144 meses terminada en feb-2020. Verificar la restitución y la "
     "liquidación del contrato."),
    ("UT COMPAÑÍA DE JESÚS - COLEGIO SAN IGNACIO - FE Y ALEGRÍA", "Privado sin ánimo de lucro",
     "Infraestructura educativa Torcoroma III", "",
     "Concesión", "2009-12-29", "2022-06-01", "SECOP I", "2043", SECOP_I + "09-1-48496",
     "No", "Media", "Concesión educativa terminada. Verificar la restitución y la liquidación, y "
     "si el colegio sigue operado por el concesionario y bajo qué figura."),
    ("UT COMPAÑÍA DE JESÚS - COLEGIO SAN IGNACIO - FE Y ALEGRÍA", "Privado sin ánimo de lucro",
     "Infraestructura educativa Belén", "",
     "Concesión", "2009-12-29", "2023-01-01", "SECOP I", "2044", SECOP_I + "09-1-48496",
     "No", "Media", "Igual que la fila anterior."),
    ("COOPERATIVA MULTIACTIVA DE TRANSPORTE", "Privado (cooperativa)",
     "Local M1-10, Terminal de transporte (Central de Transportes Estación Cúcuta)", "",
     "Arrendamiento", "2022-08-30", "2025-08-18", "SECOP II", "CO1.PCCNTR.3944437",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.3181046",
     "No", "Media", "Arrendador: Central de Transportes Estación Cúcuta (entidad descentralizada; "
     "verificar su naturaleza). Vencido sin renovación visible."),
    ("EXPRESO BARI", "Privado (empresa de transporte)",
     "Locales M1-01 y M1-67, Terminal de transporte", "",
     "Arrendamiento", "2022-09-15", "2025-09-01", "SECOP II", "CO1.PCCNTR.3985616",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.3228688",
     "No", "Media", "Igual que la fila anterior."),
    ("COOPERATIVA DE TRANSPORTADORES COTRANS", "Privado (cooperativa)",
     "Local M1-13, Terminal de transporte", "",
     "Arrendamiento", "2022-10-12", "2025-10-07", "SECOP II", "CO1.PCCNTR.4102683",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.3377227",
     "No", "Media", "Igual que la fila anterior."),
    ("ASOCIACION UNIDOS", "Privado sin ánimo de lucro",
     "Corazón de Barrio, sede La Libertad, 1er piso, zona 1 (124,9 m2)",
     "Matrícula 260-355740 / Cód. catastral 54001-1-22-0486",
     "Comodato (gratuito)", "2025-06-12", "2030-06-15", "SECOP II", "CO1.PCCNTR.7710057",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.7907861",
     "N/A (vigente)", "Baja", "Vigente. Sirve como control: pedir el informe de supervisión."),
    ("EMPRESA DE EXPOSICION DE CUCUTA CIUDAD DESTINO S.A.S.", "Sociedad de economía mixta",
     "Locales 108D y 109E, Conjunto Cerrado Las Almeidas", "",
     "Comodato (gratuito)", "2026-10-29", "2031-10-29", "SECOP II", "CO1.PCCNTR.10124922",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.11139941",
     "N/A (vigente)", "Baja", "Comodato gratuito a una sociedad con capital privado. Pedir el acto "
     "que lo autoriza y la justificación."),
    ("INSTITUTO NACIONAL DE MEDICINA LEGAL", "Público",
     "Morgue municipal, Cementerio Central (aprox. 80 m2)", "",
     "Comodato (gratuito)", "2020-09-17", "2025-09-17", "SECOP II", "CO1.PCCNTR.1851113",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.1455057",
     "No", "Baja", "Entidad pública, no un particular. Vencido sin prórroga visible."),
    ("REGISTRADURÍA NACIONAL DEL ESTADO CIVIL", "Público",
     "Corazón de Barrio, sede La Libertad, 1er piso, zona 2 (209,6 m2)",
     "Matrícula 260-355740 / Cód. catastral 54001-1-22-0486",
     "Comodato (gratuito)", "2025-05-30", "2030-06-03", "SECOP II", "CO1.PCCNTR.7923495",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.8203513",
     "N/A (vigente)", "Baja", "Entidad pública."),
    ("REGISTRADURÍA NACIONAL DEL ESTADO CIVIL", "Público",
     "Salón de 33,15 m2, Centro Cultural del corregimiento Aguaclara", "",
     "Comodato (gratuito)", "2025-11-07", "2030-11-09", "SECOP II", "CO1.PCCNTR.8557375",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.9084570",
     "N/A (vigente)", "Baja", "Entidad pública."),
    ("REGISTRADURÍA NACIONAL DEL ESTADO CIVIL", "Público",
     "Espacio de 103,4 m2 en la I.E. Colegio Nuestra Señora de Belén", "",
     "Comodato (gratuito)", "2026-10-22", "2031-10-21", "SECOP II", "CO1.PCCNTR.10098616",
     "https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=CO1.NTC.11100165",
     "N/A (vigente)", "Baja", "Entidad pública."),
]

ENTREGADOS_IDS = {(e[7], e[8]) for e in ENTREGADOS}


def header(ws, row, cols, widths):
    for i, (c, w) in enumerate(zip(cols, widths), start=1):
        cell = ws.cell(row=row, column=i, value=c)
        cell.font, cell.fill, cell.border = HDR_FONT, HDR_FILL, BORDER
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[row].height = 32


def body(cell, link=False):
    cell.font = LINK if link else BODY
    cell.alignment = WRAP
    cell.border = BORDER


def main():
    wb = Workbook()

    # ------------------------------------------------------------------ Resumen
    ws = wb.active
    ws.title = "Resumen"
    ws.column_dimensions["A"].width = 62
    ws.column_dimensions["B"].width = 16
    ws["A1"] = "Bienes inmuebles del Municipio de San José de Cúcuta en poder de terceros"
    ws["A1"].font = Font(name=FONT, size=14, bold=True)
    ws["A2"] = ("Construido a partir de SECOP I y SECOP II (datos.gov.co) y de casos públicos documentados. "
                "Fecha de consulta: noviembre de 2026. NO es el inventario oficial: el municipio no lo publica.")
    ws["A2"].font = Font(name=FONT, size=10, italic=True)
    ws["A2"].alignment = WRAP
    ws.merge_cells("A2:B2")
    ws.row_dimensions[2].height = 42

    E = "'Entregados a terceros'"
    n = len(ENTREGADOS) + 1
    filas = [
        ("Contratos revisados en que el municipio entrega un inmueble a un tercero", f"=COUNTA({E}!A2:A{n})"),
        ("…de ellos, ya vencidos a hoy", f'=COUNTIF({E}!H2:H{n},"Vencido")'),
        ("…vencidos y en manos de particulares (no entidades públicas)",
         f'=COUNTIFS({E}!H2:H{n},"Vencido",{E}!C2:C{n},"<>Público*")'),
        ("…vencidos sin renovación visible en SECOP", f'=COUNTIFS({E}!H2:H{n},"Vencido",{E}!M2:M{n},"No")'),
        ("Prioridad alta para pedir restitución o explicación", f'=COUNTIF({E}!N2:N{n},"Alta")'),
        ("Locales del C.C. El Oití con arriendo vencido", f'=COUNTIFS({E}!D2:D{n},"*Oití*",{E}!H2:H{n},"Vencido")'),
        ("Casos documentados en prensa, sentencias y órganos de control (hoja 'Casos documentados')",
         "=COUNTA('Casos documentados'!A2:A500)"),
        ("…de ellos, bienes de uso público (parques, canchas, monumentos), vigentes o ya recuperados",
         "=COUNTIF('Casos documentados'!A2:A500,\"Uso público*\")"),
        ("Saldo sin depurar de la cuenta 8347 'Bienes entregados a terceros' (COP, EF 2025-2024)",
         263051810392.01),
        ("Contratos del municipio sobre inmuebles en SECOP (hoja 'SECOP - todos')",
         "=COUNTA('SECOP - todos'!A2:A2000)"),
    ]
    ws["A4"], ws["B4"] = "Indicador", "Valor"
    for c in ("A4", "B4"):
        ws[c].font, ws[c].fill, ws[c].border = HDR_FONT, HDR_FILL, BORDER
    for i, (k, f) in enumerate(filas, start=5):
        ws.cell(row=i, column=1, value=k)
        ws.cell(row=i, column=2, value=f)
        for col in (1, 2):
            body(ws.cell(row=i, column=col))
        ws.cell(row=i, column=2).font = BOLD
        ws.cell(row=i, column=2).number_format = "$#,##0" if isinstance(f, float) else "0"

    r = 5 + len(filas) + 1
    notas = [
        "CÓMO LEER ESTE ARCHIVO",
        "• 'Entregados a terceros': contratos revisados uno a uno en los que el municipio (o una entidad "
        "municipal) entrega un inmueble a otro. La columna 'Estado a hoy' se calcula con la fecha actual.",
        "• 'Renovación visible en SECOP' = No significa que no se encontró en SECOP un contrato posterior "
        "con el mismo tercero. Es una alerta, NO prueba que el bien siga ocupado sin título: el municipio "
        "pudo renovar sin publicar (lo que sería otra irregularidad), o el bien pudo haber sido restituido.",
        "• 'Casos documentados': bienes que, según prensa, sentencias u órganos de control, están o estuvieron "
        "en manos de terceros. Cada fila trae su fuente. Se distinguen los bienes FISCALES de los de USO "
        "PÚBLICO (parques, canchas), que tienen otro régimen pero también son del municipio. Las filas "
        "marcadas 'PISTA SIN VERIFICAR' no se pudieron confirmar en la fuente original.",
        "• 'SECOP - todos': todos los contratos del municipio sobre inmuebles. La mayoría son arriendos "
        "que la Alcaldía PAGA por locales ajenos; se incluyen para revisión.",
        "• Las ocupaciones de hecho (invasiones sin contrato) no aparecen en SECOP. Solo salen del "
        "inventario oficial, del catastro o de los informes de la Contraloría, y por eso se piden en el "
        "derecho de petición.",
        "• Columnas en amarillo de 'Entregados a terceros': para que usted anote la respuesta de la Alcaldía.",
        "",
        "FUENTES",
        "SECOP II - Contratos electrónicos: https://www.datos.gov.co/d/jbjy-vk9h",
        "SECOP I - Procesos de compra pública: https://www.datos.gov.co/d/f789-7hwg",
        "SECOP I - Histórico: https://www.datos.gov.co/d/qddk-cgux",
    ]
    for t in notas:
        c = ws.cell(row=r, column=1, value=t)
        c.font = BOLD if t.isupper() else BODY
        c.alignment = WRAP
        ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=2)
        if len(t) > 90:
            ws.row_dimensions[r].height = 15 * (len(t) // 90 + 1)
        r += 1

    # -------------------------------------------------- Entregados a terceros
    ws = wb.create_sheet("Entregados a terceros")
    cols = ["Tercero", "Fuente / ID", "Tipo de tercero", "Bien", "Identificación (matrícula / catastro)",
            "Título", "Fecha firma", "Estado a hoy", "Fecha fin", "Días vencido", "URL SECOP",
            "Observación", "Renovación visible en SECOP", "Prioridad",
            "Respuesta de la Alcaldía (para llenar)", "¿Sigue ocupado? (para llenar)"]
    widths = [32, 18, 20, 38, 24, 18, 12, 12, 12, 10, 30, 60, 14, 10, 30, 14]
    header(ws, 1, cols, widths)
    for i, e in enumerate(ENTREGADOS, start=2):
        (ter, tipo_t, bien, ident, titulo, firma, fin, fuente, cid, url, renov, prio, obs) = e
        vals = [ter, f"{fuente} · {cid}", tipo_t, bien, ident, titulo, firma, None, fin, None, url, obs,
                renov, prio, None, None]
        for j, v in enumerate(vals, start=1):
            c = ws.cell(row=i, column=j, value=v)
            body(c, link=(j == 11))
        from datetime import date
        ws.cell(row=i, column=7).value = date.fromisoformat(firma)
        ws.cell(row=i, column=9).value = date.fromisoformat(fin)
        ws.cell(row=i, column=7).number_format = "yyyy-mm-dd"
        ws.cell(row=i, column=9).number_format = "yyyy-mm-dd"
        ws.cell(row=i, column=8).value = f'=IF(I{i}="","Sin fecha",IF(I{i}<TODAY(),"Vencido","Vigente"))'
        ws.cell(row=i, column=10).value = f'=IF(H{i}="Vencido",TODAY()-I{i},0)'
        ws.cell(row=i, column=10).number_format = "#,##0;-#,##0;-"
        ws.cell(row=i, column=11).hyperlink = url
        if prio == "Alta":
            ws.cell(row=i, column=14).fill = ALTA
        elif prio == "Media":
            ws.cell(row=i, column=14).fill = MEDIA
        for j in (15, 16):
            ws.cell(row=i, column=j).fill = INPUT_FILL
    dv = DataValidation(type="list", formula1='"Sí,No,Restituido,Sin respuesta"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"P2:P{len(ENTREGADOS) + 1}")
    ws.freeze_panes = "B2"
    ws.auto_filter.ref = f"A1:P{len(ENTREGADOS) + 1}"

    # ------------------------------------------------------- Casos documentados
    ws = wb.create_sheet("Casos documentados")
    cols = ["Naturaleza del bien", "Bien", "Ubicación / identificación", "Quién lo tiene", "Título o situación",
            "Desde", "Qué ha hecho la Alcaldía", "Cifras (área, avalúo)", "Estado (según la fuente)",
            "Fuente", "Fecha de la fuente", "URL"]
    widths = [18, 30, 30, 28, 26, 12, 40, 22, 28, 26, 12, 40]
    header(ws, 1, cols, widths)
    casos_path = AQUI / "casos.json"
    casos = json.loads(casos_path.read_text(encoding="utf-8")) if casos_path.exists() else []
    keys = ["naturaleza", "bien", "ubicacion", "tenedor", "titulo", "desde", "alcaldia", "cifras", "estado",
            "fuente", "fecha_fuente", "url"]
    for i, cs in enumerate(casos, start=2):
        for j, k in enumerate(keys, start=1):
            c = ws.cell(row=i, column=j, value=cs.get(k, ""))
            body(c, link=(k == "url"))
            if k == "url" and cs.get("url", "").startswith("http"):
                c.hyperlink = cs["url"]
    ws.freeze_panes = "B2"
    if casos:
        ws.auto_filter.ref = f"A1:L{len(casos) + 1}"

    # ------------------------------------------------------------ SECOP - todos
    ws = wb.create_sheet("SECOP - todos")
    cols = ["Fuente", "Entidad", "ID / Número", "Fecha firma", "Fecha fin", "Tipo de contrato", "Estado",
            "Contraparte", "Valor (COP)", "Objeto", "¿Incluido en 'Entregados'?", "URL"]
    widths = [9, 18, 22, 11, 11, 18, 14, 32, 14, 80, 12, 30]
    header(ws, 1, cols, widths)
    raw = json.loads((AQUI / "secop_contratos_inmuebles_municipio.json").read_text(encoding="utf-8"))
    raw.sort(key=lambda x: x["firma"] or "0000")
    for i, x in enumerate(raw, start=2):
        cid = x["id"].split(" / ")[0] if x["fuente"] == "SECOP I" else x["id"]
        incl = "Sí" if (x["fuente"], cid) in ENTREGADOS_IDS else ""
        try:
            valor = float(x["valor"]) if x["valor"] not in (None, "") else None
        except ValueError:
            valor = None
        vals = [x["fuente"], x["entidad"], x["id"], x["firma"], x["fin"], x["tipo"], x["estado"],
                x["tercero"], valor, x["objeto"], incl, x["url"]]
        for j, v in enumerate(vals, start=1):
            c = ws.cell(row=i, column=j, value=v)
            body(c, link=(j == 12))
        ws.cell(row=i, column=9).number_format = "$#,##0;($#,##0);-"
        if x["url"]:
            ws.cell(row=i, column=12).hyperlink = x["url"]
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:L{len(raw) + 1}"

    out = AQUI / "bienes_municipio_cucuta_en_poder_de_terceros.xlsx"
    wb.save(out)
    print(out)


if __name__ == "__main__":
    main()
