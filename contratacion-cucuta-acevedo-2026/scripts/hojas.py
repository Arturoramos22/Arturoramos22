# Ejecutado dentro de build.py: hojas individualizadas de riesgo y simultaneidad.
ORD = {'ALTO': 0, 'MEDIO': 1, 'BAJO': 2}
RIESGOSOS = sorted([r for r in rows if r['_nivel']], key=lambda r: (ORD[r['_nivel']], -r['_score'], -r['_v']))

ws = wb.create_sheet('Fichas de riesgo por contrato', 3)
ws['A1'] = 'Contratos individualizados con riesgo de corrupción: análisis del contenido del riesgo, contrato por contrato'; ws['A1'].font = T
ws['A2'] = ('Puntaje: suma de criterios objetivos. Alerta curada ALTO = 4, adición mayor al 40% = 3, causal interadministrativa con un privado = 3, fiducia por la causal de CTI = 4, único oferente = 2, '
            'presupuesto pegado al umbral = 2, PS a persona jurídica ≥150 M = 2, convenio ESAL ≥500 M sin ofertas = 2, simultaneidad en la misma entidad = 2 (en otra = 1), y 1 punto por cada debilidad de control. '
            'Nivel ALTO ≥ 6, MEDIO 3-5, BAJO 1-2. Es un indicio para priorizar la revisión, no una prueba.')
ws['A2'].alignment = WR; ws.merge_cells('A2:P2'); ws.row_dimensions[2].height = 48
cols = ['N°', 'Nivel', 'Puntaje', 'ID contrato SECOP', 'Entidad', 'Dependencia', 'Fecha firma', 'Modalidad / causal', 'Contratista', 'NIT / CC', 'Representante legal',
        'Valor actual (COP)', 'Presupuesto base', 'Oferentes', 'Objeto del contrato', 'Análisis del riesgo (hechos del contrato)', 'Alerta curada asociada',
        'Qué verificar', 'Supervisor', 'Ordenador del gasto', 'Enlace SECOP']
header(ws, 4, cols, [5, 8, 8, 20, 20, 24, 11, 28, 32, 13, 24, 16, 16, 9, 60, 90, 34, 45, 22, 22, 32])
for i, r in enumerate(RIESGOSOS, 5):
    put(ws, i, [i - 4, r['_nivel'], r['_score'], r['id_contrato'], r['_ent'], r['_dep'], r['fecha_de_firma'][:10],
                f"{r['modalidad_de_contratacion']} / {r['justificacion_modalidad_de']}", r['proveedor_adjudicado'], r['documento_proveedor'],
                r.get('nombre_representante_legal', ''), r['_v'], r['_base'], r['_ofertas'], r['objeto_del_contrato'][:1000],
                '\n'.join(f'• {x}' for x in r['_razones']), r['_alerta'] or '', '; '.join(r['_verif']), r.get('nombre_supervisor', ''),
                r.get('nombre_ordenador_del_gasto', ''), url(r)], wrap=True)
    ws.cell(row=i, column=2).fill = PatternFill('solid', fgColor=RISK[r['_nivel']])
    ws.row_dimensions[i].height = min(400, 45 + 30 * len(r['_razones']))
ws.auto_filter.ref = f"A4:{get_column_letter(len(cols))}{len(RIESGOSOS)+4}"

# ---- simultaneidad
SEVC = {'ALTO': 'F8CBAD', 'VERIFICAR': 'FFE699', 'BAJO': 'E2EFDA'}
SIMS = sorted(SIM, key=lambda x: ({'ALTO': 0, 'VERIFICAR': 1, 'BAJO': 2}[x['sev']], not x['misma'], -x['dias']))
SIMPS = sorted(SIMP.items(), key=lambda t: (not t[1]['misma'], -t[1]['max_simult'], -((t[1]['pico'] or {}).get('mes', 0))))
NOTA = ('Valor mes = valor total del contrato / (días de duración / 30). Fechas: inicio (o firma si no hay acta de inicio) y fin registradas en SECOP II. '
        'Los contratos en estado terminado/cerrado/cedido se listan, pero no se suman al pico porque pudieron terminar antes. Tampoco se suman los contratos con duración registrada menor de 15 días: casi siempre la fecha de fin está mal diligenciada, y se marcan "duración no confiable". Solo se cuentan los periodos de coincidencia de 7 días o más. '
        'La prestación de servicios no exige exclusividad: la simultaneidad es un indicio (nómina paralela, doble pago, imposibilidad material de cumplir), no una prueba.')

# (1) Detalle por persona: una fila por contrato, agrupada por persona
ws = wb.create_sheet('Simultaneidad (detalle)')
ws['A1'] = 'Simultaneidad de contratistas: cada contrato de cada persona, con fechas, valor total y valor mensual'; ws['A1'].font = T
ws['A2'] = NOTA; ws['A2'].alignment = WR; ws.merge_cells('A2:P2'); ws.row_dimensions[2].height = 45
cols = ['Caso', 'Contratista', 'Documento', 'N°', 'ID contrato SECOP', 'Entidad', 'Objeto', 'Desde', 'Hasta', 'Días', 'Meses',
        'Valor total (COP)', 'Valor mes (COP)', 'Estado', 'Simultáneo con', 'Enlace', 'Origen']
header(ws, 4, cols, [7, 30, 13, 4, 20, 28, 60, 11, 11, 7, 7, 16, 15, 12, 45, 30])
GRIS = PatternFill('solid', fgColor='D9E1F2'); row = 5
for k, (doc, p) in enumerate(SIMPS, 1):
    for j, c in enumerate(p['contratos'], 1):
        put(ws, row, [f'S{k}', p['nombre'], doc, j, c['id'], c['ent'], c['obj'][:250], c['ini'], c['fin'], c['dias'], round(c['meses'], 1),
                      c['valor'], c['mes'], c['estado'] + ('' if c['fiable'] else ' (duración no confiable)'), ', '.join(c['con']), c['url'], c['origen']], {11: '0.0'})
        row += 1
    pk = p['pico']
    txt = (f"PICO: {pk['n']} contratos vigentes a la vez del {pk['desde']} al {pk['hasta']}, que suman un valor mes de" if pk else 'Sin tramo con 2+ contratos vigentes (revisar estados)')
    put(ws, row, [f'S{k}', p['nombre'], doc, '', 'TOTAL', f"{p['n_contratos']} contratos en {len(p['entidades'])} entidad(es)", txt, pk['desde'] if pk else '', pk['hasta'] if pk else '',
                  '', '', p['valor'], pk['mes'] if pk else None, '', ', '.join(pk['ids']) if pk else '', ''])
    for cc in range(1, 17):
        ws.cell(row=row, column=cc).fill = GRIS; ws.cell(row=row, column=cc).font = Font(bold=True)
    row += 2
ws.auto_filter.ref = f"A4:P{row}"

# (2) Tramos de simultaneidad: periodos en que coinciden 2+ contratos y cuánto suman al mes
ws = wb.create_sheet('Simultaneidad (tramos)')
ws['A1'] = 'Periodos de simultaneidad: en qué fechas coincidieron los contratos y cuánto sumaban por mes'; ws['A1'].font = T
header(ws, 3, ['Caso', 'Contratista', 'Documento', 'Desde', 'Hasta', 'Días', 'Contratos vigentes', 'IDs de los contratos', 'Suma valor mes (COP)'], [7, 30, 13, 11, 11, 7, 10, 70, 18])
row = 4
for k, (doc, p) in enumerate(SIMPS, 1):
    for t in p['tramos']:
        put(ws, row, [f'S{k}', p['nombre'], doc, t['desde'], t['hasta'], _dias(t['desde'], t['hasta']), t['n'], ', '.join(t['ids']), t['mes']]); row += 1
ws.auto_filter.ref = f"A3:I{row}"

# (3) Pares individualizados
ws = wb.create_sheet('Simultaneidad (pares)')
ws['A1'] = 'Pares de contratos de prestación de servicios vigentes al mismo tiempo (misma persona), en cualquier entidad pública'; ws['A1'].font = T
ws['A2'] = NOTA; ws['A2'].alignment = WR; ws.merge_cells('A2:Z2'); ws.row_dimensions[2].height = 45
cols = ['N°', 'Severidad', 'Misma entidad', 'Documento', 'Contratista', 'Traslape desde', 'Traslape hasta', 'Días de traslape',
        'A: ID contrato', 'A: Entidad', 'A: Desde', 'A: Hasta', 'A: Valor total', 'A: Valor mes', 'A: Objeto',
        'B: ID contrato', 'B: Entidad', 'B: Desde', 'B: Hasta', 'B: Valor total', 'B: Valor mes', 'B: Estado', 'B: Objeto',
        'Valor mes A + B', 'Observación', 'A: Enlace', 'B: Enlace']
header(ws, 4, cols, [5, 10, 9, 13, 30, 11, 11, 9, 20, 22, 11, 11, 14, 13, 45, 20, 26, 11, 11, 14, 13, 12, 45, 14, 40, 30, 30])
for i, x in enumerate(SIMS, 5):
    a, b = x['a'], x['b']; ha, hb = x['h1'] or 0, x['h2'] or 0
    put(ws, i, [i - 4, x['sev'], 'Sí' if x['misma'] else 'No', x['doc'], x['nombre'], x['ts'], x['te'], x['dias'],
                a['id_contrato'], a['_ent'], _ini(a), d10(a.get('fecha_de_fin_del_contrato')), a['_v'], ha, a['objeto_del_contrato'][:300],
                b['id_contrato'], ENT.get(b['nit_entidad'], b['nombre_entidad']), _ini(b), d10(b.get('fecha_de_fin_del_contrato')), f(b['valor_del_contrato']), hb,
                b.get('estado_contrato', ''), b['objeto_del_contrato'][:300], ha + hb, x['obs'], url(a), url(b)])
    ws.cell(row=i, column=2).fill = PatternFill('solid', fgColor=SEVC[x['sev']])
ws.auto_filter.ref = f"A4:{get_column_letter(len(cols))}{len(SIMS)+4}"

# (4) Resumen por persona
ws = wb.create_sheet('Simultaneidad (personas)')
ws['A1'] = 'Resumen por contratista: contratos, máximo vigentes a la vez y pico de valor mensual simultáneo'; ws['A1'].font = T
header(ws, 3, ['Caso', 'Documento', 'Contratista', 'Doble contrato en la misma entidad', 'Contratos considerados', 'Máx. vigentes a la vez', 'Pico: desde', 'Pico: hasta',
               'Pico: suma valor mes (COP)', 'Valor total de los contratos', 'Pares ALTOS', 'Entidades'], [7, 13, 32, 10, 10, 10, 11, 11, 16, 17, 8, 80])
for k, (doc, p) in enumerate(SIMPS, 1):
    pk = p['pico'] or {}
    put(ws, k + 3, [f'S{k}', doc, p['nombre'], 'Sí' if p['misma'] else 'No', p['n_contratos'], p['max_simult'], pk.get('desde', ''), pk.get('hasta', ''),
                    pk.get('mes'), p['valor'], p['alto'], ', '.join(p['entidades'])])
ws.auto_filter.ref = f"A3:L{len(SIMPS)+3}"
