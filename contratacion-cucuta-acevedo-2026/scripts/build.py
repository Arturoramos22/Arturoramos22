"""Construye la matriz de contratación (xlsx) y el JSON de cifras a partir de los datos SECOP II descargados."""
import json, collections, re, sys, os
from datetime import date
sys.path.insert(0, os.path.dirname(__file__))
from sector import sector
from alertas import ALERTAS
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

DATA, OUT = sys.argv[1], sys.argv[2]
rows = [json.loads(l) for l in open(os.path.join(DATA, 'contratos.jsonl'))]
P = json.load(open(os.path.join(DATA, 'procesos.json')))
MODS = collections.defaultdict(list)
for m in json.load(open(os.path.join(DATA, 'mods.json'))):
    MODS[m['id_contrato']].append(m)
EXT = [json.loads(l) for l in open(os.path.join(DATA, 'externos.jsonl'))]
f = lambda x: float(x or 0)
byp = collections.defaultdict(list)
for p in P:
    byp[p['id_del_portafolio']].append(p)

MENOR = 1_750_905_000   # 1.000 SMMLV 2026 (SMMLV $1.750.905)
MINIMA = MENOR * 0.10

DEP = {'R': 'Secretaría General / Gestión Institucional', 'B': 'Secretaría de Educación', 'BS': 'Secretaría de Bienestar Social',
       'K': 'Secretaría de Infraestructura', 'L': 'Secretaría de Hacienda (incl. Catastro)', 'Z': 'Secretaría de Planeación (incl. servicios públicos)',
       'PT': 'Oficina de Promoción Turística', 'C': 'Secretaría de Salud', 'Y': 'Secretaría de Movilidad', 'O': 'Secretaría de Seguridad Ciudadana',
       'CP': 'Secretaría de Cultura y Patrimonio', 'D': 'Secretaría de Gobierno', 'VP': 'Secretaría de Vivienda / VP', 'H': 'Posconflicto y Víctimas',
       'J': 'Secretaría de Gestión del Riesgo', 'TI': 'Oficina TIC', 'OP': 'Oficina de Prensa', 'HA': 'Secretaría de Hábitat',
       'EG': 'Secretaría de Equidad de Género', 'DR': 'Secretaría de Desarrollo Rural', 'MA': 'Secretaría de Ambiente', 'BP': 'Banco del Progreso',
       'DE': 'Secretaría de Desarrollo Económico', 'DA': 'Bienes / Activos'}
ENT = {'890501434': 'Alcaldía (Municipio de San José de Cúcuta)', '807001836': 'IMRD (Instituto Municipal de Recreación y Deporte)',
       '8905014335': 'Central de Transportes Estación Cúcuta', '807004352': 'ESE IMSALUD', '890500529': 'EIS Cúcuta ESP',
       '800153197': 'Área Metropolitana de Cúcuta'}

def dep(r):
    if r['nit_entidad'] != '890501434':
        return ENT[r['nit_entidad']]
    m = re.match(r'\s*0?2?0?26\s*([A-Z]{1,3})\s*-?\s*\d', r['objeto_del_contrato'].upper())
    return DEP.get(m.group(1), 'Alcaldía - sin código') if m else 'Alcaldía - sin código de dependencia'

def url(r):
    u = r.get('urlproceso')
    return u.get('url', '') if isinstance(u, dict) else (u or '')

def d10(s):
    return (s or '')[:10]

# --- enriquecimiento por contrato
for r in rows:
    r['_v'] = f(r['valor_del_contrato'])
    ps = byp.get(r['proceso_de_compra'], [])
    bases = [f(p.get('precio_base')) for p in ps if f(p.get('precio_base')) > 0]
    r['_base'] = bases[0] if bases else None
    r['_ofertas'] = max((int(p.get('respuestas_al_procedimiento') or 0) for p in ps), default=None)
    r['_invitados'] = max((int(p.get('proveedores_invitados') or 0) for p in ps), default=None)
    r['_visto'] = max((int(p.get('visualizaciones_del') or 0) for p in ps), default=None)
    r['_ent'] = ENT[r['nit_entidad']]
    r['_dep'] = dep(r)
    r['_sector'] = sector(r['objeto_del_contrato'])
    r['_ps'] = 'Servicios profesionales' in r['justificacion_modalidad_de']
    r['_directa'] = 'irecta' in r['modalidad_de_contratacion'] or 'especial' in r['modalidad_de_contratacion']
    fl = []
    if r['_base'] and r['_v'] > r['_base'] * 1.40:
        fl.append(f"Valor supera el presupuesto base en {100*(r['_v']/r['_base']-1):.0f}% (adición cercana al tope legal del 50%)")
    if not r['_directa'] and r['_ofertas'] == 1:
        fl.append('Proceso competitivo con un único oferente')
    if r['modalidad_de_contratacion'] == 'Mínima cuantía' and r['_base'] and r['_base'] >= 0.9 * MINIMA:
        fl.append('Presupuesto de mínima cuantía ≥90% del tope (posible fraccionamiento)')
    if 'Menor' in r['modalidad_de_contratacion'] and r['_base'] and r['_base'] >= 0.95 * MENOR:
        fl.append('Presupuesto de menor cuantía ≥95% del tope (posible elusión de licitación)')
    if 'nteradmin' in r['justificacion_modalidad_de'] and re.search(r'FUNDACI|CORPORACI|ASOCIACI', r['proveedor_adjudicado'].upper()):
        fl.append('Causal "interadministrativo" aplicada a una persona jurídica privada sin ánimo de lucro')
    if r['_ps'] and r['tipodocproveedor'] == 'NIT' and r['_v'] >= 150e6:
        fl.append('Contratación directa "servicios profesionales/apoyo" a persona jurídica por ≥150 millones')
    if r['_v'] >= 100e6 and (r.get('nombre_supervisor') or 'No definido') == 'No definido':
        fl.append('Sin supervisor registrado en SECOP')
    sup = (r.get('nombre_supervisor') or '').strip().upper()
    if r['_v'] >= 100e6 and sup and sup != 'NO DEFINIDO' and sup == (r.get('nombre_ordenador_del_gasto') or '').strip().upper():
        fl.append('El supervisor es el mismo ordenador del gasto (sin separación de funciones)')
    if r['documento_proveedor'] in ('No Definido', ''):
        fl.append('Contratista sin NIT registrado')
    if r['_v'] < 1 and not r['_ps']:
        fl.append('Contrato a valor cero (comodato/aprovechamiento de bien público)')
    if 'científicas' in r['justificacion_modalidad_de'] and 'FIDUCIA' in r['proveedor_adjudicado'].upper():
        fl.append('Causal de ciencia y tecnología usada para un encargo fiduciario')
    r['_flags'] = fl

exec(open(os.path.join(os.path.dirname(__file__), 'riesgo.py'), encoding='utf-8').read())

# --- personas con PS simultáneos
psby = collections.defaultdict(list)
for r in rows:
    if r['_ps']:
        psby[r['documento_proveedor']].append(r)
solap = []
for k, rs in psby.items():
    for i in range(len(rs)):
        for j in range(i + 1, len(rs)):
            a, b = rs[i], rs[j]
            s1, e1 = d10(a.get('fecha_de_inicio_del_contrato')) or d10(a['fecha_de_firma']), d10(a.get('fecha_de_fin_del_contrato'))
            s2, e2 = d10(b.get('fecha_de_inicio_del_contrato')) or d10(b['fecha_de_firma']), d10(b.get('fecha_de_fin_del_contrato'))
            if e1 and e2 and s1 <= e2 and s2 <= e1:
                solap.append((a, b, max(s1, s2), min(e1, e2)))

# ------------------------------------------------------------------ cifras
TOT = sum(r['_v'] for r in rows)
def agg(key, subset=None):
    a = collections.defaultdict(lambda: [0, 0.0, 0, 0.0])
    for r in (subset or rows):
        x = a[key(r)]; x[0] += 1; x[1] += r['_v']
        if r['_ps']: x[2] += 1; x[3] += r['_v']
    return sorted(a.items(), key=lambda t: -t[1][1])

comp = [r for r in rows if not r['_directa'] and r['_ofertas'] is not None]
uno = [r for r in comp if r['_ofertas'] == 1]
cifras = {
    'n': len(rows), 'total': TOT,
    'por_entidad': agg(lambda r: r['_ent']),
    'por_modalidad': agg(lambda r: r['modalidad_de_contratacion']),
    'por_sector': agg(lambda r: r['_sector']),
    'por_dependencia': agg(lambda r: r['_dep'], [r for r in rows if r['nit_entidad'] == '890501434']),
    'por_mes': sorted(agg(lambda r: (r['fecha_de_firma'][:7], 'Directa' if r['_directa'] else 'Competitiva'))),
    'ps_n': sum(r['_ps'] for r in rows), 'ps_v': sum(r['_v'] for r in rows if r['_ps']),
    'comp_n': len(comp), 'comp_v': sum(r['_v'] for r in comp), 'uno_n': len(uno), 'uno_v': sum(r['_v'] for r in uno),
    'pagado': sum(f(r['valor_pagado']) for r in rows), 'con_pago': sum(1 for r in rows if f(r['valor_pagado']) > 0),
    'sin_sup_n': sum(1 for r in rows if (r.get('nombre_supervisor') or 'No definido') == 'No definido'),
    'sin_sup_v': sum(r['_v'] for r in rows if (r.get('nombre_supervisor') or 'No definido') == 'No definido'),
    'solap_pares': len(SIM), 'solap_personas': len(SIMP), 'sim_alto': sum(1 for x in SIM if x['sev']=='ALTO'),
    'riesgo': collections.Counter(r['_nivel'] for r in rows if r['_nivel']),
    'riesgo_v': {k: sum(r['_v'] for r in rows if r['_nivel']==k) for k in ('ALTO','MEDIO','BAJO')},
    'directos_ventana_garantias': sum(1 for r in rows if r['_directa'] and r['_ps'] and r['fecha_de_firma'][:10] <= '2026-06-21'),
    'flagged_n': sum(1 for r in rows if r['_flags']), 'flagged_v': sum(r['_v'] for r in rows if r['_flags']),
    'fecha_min': min(r['fecha_de_firma'] for r in rows)[:10], 'fecha_max': max(r['fecha_de_firma'] for r in rows)[:10],
}
json.dump(cifras, open(os.path.join(OUT, 'cifras.json'), 'w'), ensure_ascii=False, indent=1, default=str)

# ------------------------------------------------------------------ Excel
wb = Workbook()
H = Font(bold=True, color='FFFFFF'); HF = PatternFill('solid', fgColor='1F3864')
T = Font(bold=True, size=14, color='1F3864')
thin = Side(style='thin', color='BFBFBF'); B = Border(left=thin, right=thin, top=thin, bottom=thin)
RISK = {'ALTO': 'F8CBAD', 'MEDIO': 'FFE699', 'BAJO': 'E2EFDA'}
WR = Alignment(wrap_text=True, vertical='top')
M = '#,##0'

def header(ws, row, cols, widths=None):
    for i, c in enumerate(cols, 1):
        cell = ws.cell(row=row, column=i, value=c); cell.font = H; cell.fill = HF; cell.alignment = Alignment(wrap_text=True, vertical='center'); cell.border = B
    if widths:
        for i, w in enumerate(widths, 1):
            ws.column_dimensions[get_column_letter(i)].width = w
    ws.freeze_panes = ws.cell(row=row + 1, column=1)

def put(ws, row, vals, fmt=None, wrap=False):
    for i, v in enumerate(vals, 1):
        c = ws.cell(row=row, column=i, value=v); c.border = B
        if wrap: c.alignment = WR
        if isinstance(v, float) or (isinstance(v, int) and not isinstance(v, bool)):
            c.number_format = (fmt or {}).get(i, M)

# 1. Resumen
ws = wb.active; ws.title = 'Resumen'
ws['A1'] = 'Contratación pública – Alcaldía de Cúcuta y entidades descentralizadas (8-mar-2026 a 4-nov-2026)'; ws['A1'].font = T
ws['A2'] = f"Fuente: SECOP II – Contratos Electrónicos (datos.gov.co, jbjy-vk9h) y Procesos (p6dx-8zbt). Corte de descarga: 4-nov-2026. Firmas entre {cifras['fecha_min']} y {cifras['fecha_max']}. Valores en pesos corrientes."
ws['A2'].alignment = WR; ws.merge_cells('A2:F2'); ws.row_dimensions[2].height = 45
kp = [('Contratos', cifras['n']), ('Valor total (COP)', TOT),
      ('Contratos de prestación de servicios (directa)', cifras['ps_n']), ('Valor prestación de servicios', cifras['ps_v']),
      ('Contratos de procesos competitivos con datos de oferentes', cifras['comp_n']),
      ('...con un ÚNICO oferente', cifras['uno_n']), ('Valor de los adjudicados con único oferente', cifras['uno_v']),
      ('Valor pagado reportado en SECOP', cifras['pagado']), ('Contratos con algún pago reportado', cifras['con_pago']),
      ('Contratos sin supervisor registrado', cifras['sin_sup_n']), ('Valor sin supervisor registrado', cifras['sin_sup_v']),
      ('Personas con contratos simultáneos (cualquier entidad pública)', cifras['solap_personas']),
      ('Pares de contratos simultáneos', cifras['solap_pares']),
      ('...de severidad ALTA', cifras['sim_alto']),
      ('Contratos individualizados con riesgo ALTO', cifras['riesgo'].get('ALTO',0)), ('Valor riesgo ALTO', cifras['riesgo_v']['ALTO']),
      ('Contratos con riesgo MEDIO', cifras['riesgo'].get('MEDIO',0)), ('Valor riesgo MEDIO', cifras['riesgo_v']['MEDIO']),
      ('Contratos con riesgo BAJO', cifras['riesgo'].get('BAJO',0)),
      ('Contratos con al menos una bandera automática', cifras['flagged_n']), ('Valor de contratos con bandera', cifras['flagged_v'])]
header(ws, 4, ['Indicador', 'Valor'], [62, 22, 14, 22, 14, 22])
for i, (k, v) in enumerate(kp, 5): put(ws, i, [k, v])
r0 = 5 + len(kp) + 1
header(ws, r0, ['Entidad', 'N° contratos', '% valor', 'Valor (COP)', 'N° PS', 'Valor PS'])
ws.freeze_panes = 'A5'
for i, (k, (n, v, np_, vp)) in enumerate(cifras['por_entidad'], r0 + 1):
    put(ws, i, [k, n, v / TOT, v, np_, vp], {3: '0.0%'})
r1 = r0 + len(cifras['por_entidad']) + 2
header(ws, r1, ['Modalidad', 'N° contratos', '% valor', 'Valor (COP)', 'N° PS', 'Valor PS'])
for i, (k, (n, v, np_, vp)) in enumerate(cifras['por_modalidad'], r1 + 1):
    put(ws, i, [k, n, v / TOT, v, np_, vp], {3: '0.0%'})
r2 = r1 + len(cifras['por_modalidad']) + 2
header(ws, r2, ['Mes de firma / tipo', 'N° contratos', '', 'Valor (COP)'])
for i, (k, (n, v, _, _)) in enumerate(cifras['por_mes'], r2 + 1):
    put(ws, i, [f'{k[0]} – {k[1]}', n, '', v])
ws.freeze_panes = 'A5'

# 2. Prioridades
ws = wb.create_sheet('Prioridades del gasto')
ws['A1'] = 'En qué se ha contratado: por sector (todas las entidades) y por dependencia (Alcaldía)'; ws['A1'].font = T
ws['A2'] = 'Sector asignado por palabras clave del objeto contractual (ver hoja Metodología). Dependencia asignada por el código interno que la Alcaldía antepone al objeto (p. ej. 2026B = Educación).'
ws['A2'].alignment = WR; ws.merge_cells('A2:G2'); ws.row_dimensions[2].height = 35
header(ws, 4, ['Sector', 'N° contratos', '% del valor', 'Valor (COP)', 'N° PS', 'Valor PS', '% PS en el sector'], [52, 13, 11, 20, 10, 18, 14])
for i, (k, (n, v, np_, vp)) in enumerate(cifras['por_sector'], 5):
    put(ws, i, [k, n, v / TOT, v, np_, vp, vp / v if v else 0], {3: '0.0%', 7: '0.0%'})
r = 5 + len(cifras['por_sector']) + 2
TA = sum(v for _, (n, v, _, _) in cifras['por_dependencia'])
header(ws, r, ['Dependencia (solo Alcaldía)', 'N° contratos', '% valor Alcaldía', 'Valor (COP)', 'N° PS', 'Valor PS', '% PS'])
for i, (k, (n, v, np_, vp)) in enumerate(cifras['por_dependencia'], r + 1):
    put(ws, i, [k, n, v / TA, v, np_, vp, vp / v if v else 0], {3: '0.0%', 7: '0.0%'})
ws.freeze_panes = 'A5'

# 3. Matriz de alertas (curada)
ws = wb.create_sheet('Matriz de alertas')
ws['A1'] = 'Matriz de alertas e indicios de irregularidad (revisión manual sobre datos SECOP II)'; ws['A1'].font = T
ws['A2'] = ('IMPORTANTE: una alerta NO es una conclusión de ilegalidad. Es un indicio objetivo, sacado de los datos públicos, que justifica verificar '
            'los documentos del proceso (estudios previos, ofertas, informes de supervisión, actas) y, si aplica, pedir información o presentar una denuncia ante los entes de control.')
ws['A2'].alignment = WR; ws.merge_cells('A2:L2'); ws.row_dimensions[2].height = 45
cols = ['N°', 'Riesgo', 'Tipo de alerta', 'Entidad', 'Contratista (NIT/CC)', 'Contrato(s) / ID SECOP', 'Valor involucrado (COP)',
        'Hechos verificados en SECOP', 'Por qué es alerta (criterio / norma)', 'Contexto externo (fuentes)', 'Qué verificar / acción sugerida', 'Enlace SECOP']
header(ws, 4, cols, [5, 9, 26, 18, 30, 26, 17, 70, 55, 50, 50, 40])
for i, a in enumerate(ALERTAS, 5):
    put(ws, i, [i - 4, a['riesgo'], a['tipo'], a['entidad'], a['contratista'], a['contratos'], float(a['valor']), a['hechos'], a['criterio'],
                a.get('contexto', ''), a['verificar'], a.get('url', '')], wrap=True)
    ws.cell(row=i, column=2).fill = PatternFill('solid', fgColor=RISK[a['riesgo']])
    ws.row_dimensions[i].height = 230

# 4. Banderas automáticas
ws = wb.create_sheet('Banderas por contrato')
ws['A1'] = 'Contratos con banderas automáticas (reglas objetivas aplicadas a toda la base)'; ws['A1'].font = T
header(ws, 3, ['ID contrato', 'Entidad', 'Dependencia', 'Fecha firma', 'Modalidad', 'Contratista', 'Doc. contratista', 'Valor (COP)', 'Presupuesto base', 'Oferentes', 'Banderas', 'Objeto', 'Enlace'],
       [20, 22, 26, 11, 24, 32, 13, 16, 16, 9, 60, 70, 30])
fl = sorted([r for r in rows if r['_flags']], key=lambda r: -r['_v'])
for i, r in enumerate(fl, 4):
    put(ws, i, [r['id_contrato'], r['_ent'], r['_dep'], r['fecha_de_firma'][:10], r['modalidad_de_contratacion'], r['proveedor_adjudicado'], r['documento_proveedor'],
                r['_v'], r['_base'], r['_ofertas'], ' | '.join(r['_flags']), r['objeto_del_contrato'][:400], url(r)], wrap=False)

# 5. Contratistas
ws = wb.create_sheet('Top contratistas')
ws['A1'] = 'Concentración por contratista (excluye prestación de servicios de personas naturales salvo que superen el umbral)'; ws['A1'].font = T
ag = collections.defaultdict(lambda: {'n': 0, 'v': 0.0, 'ent': set(), 'mod': set(), 'nom': ''})
for r in rows:
    k = r['documento_proveedor'] if r['documento_proveedor'] not in ('No Definido', '') else r['proveedor_adjudicado']
    x = ag[k]; x['n'] += 1; x['v'] += r['_v']; x['ent'].add(r['_ent']); x['mod'].add(r['modalidad_de_contratacion']); x['nom'] = r['proveedor_adjudicado']
# Aventours (901913440) está representada legalmente por la misma persona natural 1090372670
header(ws, 3, ['Contratista', 'Documento', 'N° contratos', 'Valor (COP)', '% del total', 'Entidades', 'Modalidades'], [45, 14, 11, 18, 10, 40, 60])
for i, (k, x) in enumerate(sorted(ag.items(), key=lambda t: -t[1]['v'])[:60], 4):
    put(ws, i, [x['nom'], k, x['n'], x['v'], x['v'] / TOT, ', '.join(sorted(x['ent'])), ', '.join(sorted(x['mod']))], {5: '0.0%'})

exec(open(os.path.join(os.path.dirname(__file__), 'hojas.py'), encoding='utf-8').read())

# 7. Base completa
ws = wb.create_sheet('Base de contratos')
cols = ['ID contrato', 'Proceso (portafolio)', 'Entidad', 'Dependencia', 'Sector (clasificación)', 'Fecha firma', 'Inicio', 'Fin', 'Modalidad', 'Justificación', 'Tipo',
        'Estado', 'Contratista', 'Tipo doc.', 'Documento', 'Representante legal', 'Valor (COP)', 'Presupuesto base', 'Oferentes', 'Valor pagado', 'Destino gasto',
        'Ordenador del gasto', 'Supervisor', 'Nivel de riesgo', 'Puntaje', 'Banderas', 'Objeto', 'Enlace']
header(ws, 1, cols, [20, 20, 22, 26, 26, 11, 11, 11, 24, 26, 16, 12, 32, 12, 13, 26, 16, 16, 9, 14, 12, 24, 24, 10, 8, 40, 80, 30])
for i, r in enumerate(sorted(rows, key=lambda r: r['fecha_de_firma']), 2):
    put(ws, i, [r['id_contrato'], r['proceso_de_compra'], r['_ent'], r['_dep'], r['_sector'], r['fecha_de_firma'][:10], d10(r.get('fecha_de_inicio_del_contrato')),
                d10(r.get('fecha_de_fin_del_contrato')), r['modalidad_de_contratacion'], r['justificacion_modalidad_de'], r['tipo_de_contrato'], r['estado_contrato'],
                r['proveedor_adjudicado'], r['tipodocproveedor'], r['documento_proveedor'], r.get('nombre_representante_legal', ''), r['_v'], r['_base'], r['_ofertas'],
                f(r['valor_pagado']), r.get('destino_gasto', ''), r.get('nombre_ordenador_del_gasto', ''), r.get('nombre_supervisor', ''), r['_nivel'], r['_score'], ' | '.join(r['_flags']),
                r['objeto_del_contrato'], url(r)])
ws.auto_filter.ref = f"A1:{get_column_letter(len(cols))}{len(rows)+1}"

# 8. Metodología
ws = wb.create_sheet('Metodología y límites')
ws.column_dimensions['A'].width = 150
txt = open(os.path.join(os.path.dirname(__file__), 'metodologia.txt'), encoding='utf-8').read().split('\n')
for i, line in enumerate(txt, 1):
    c = ws.cell(row=i, column=1, value=line); c.alignment = WR
    if line.isupper() and line.strip(): c.font = Font(bold=True, color='1F3864')

wb.save(os.path.join(OUT, 'matriz_contratacion_cucuta_2026.xlsx'))
exec(open(os.path.join(os.path.dirname(__file__), 'anexos.py'), encoding='utf-8').read())
print(json.dumps({k: v for k, v in cifras.items() if not isinstance(v, list)}, indent=1, default=str))
