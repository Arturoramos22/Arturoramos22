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

# ---- simultaneidad: cada par individualizado
SEVC = {'ALTO': 'F8CBAD', 'VERIFICAR': 'FFE699', 'BAJO': 'E2EFDA'}
SIMS = sorted(SIM, key=lambda x: ({'ALTO': 0, 'VERIFICAR': 1, 'BAJO': 2}[x['sev']], not x['misma'], -x['dias']))
ws = wb.create_sheet('Simultaneidad (pares)')
ws['A1'] = 'Simultaneidad de contratistas de prestación de servicios: cada par de contratos vigentes al mismo tiempo, en cualquier entidad pública'; ws['A1'].font = T
ws['A2'] = ('Contrato A: firmado en el periodo por una de las entidades analizadas. Contrato B: cualquier otro contrato de PRESTACIÓN DE SERVICIOS de la misma persona en SECOP II (Alcaldía, Gobernación, SENA, IDS, Corponor, otros municipios, etc.) cuyo plazo se cruza con el de A. '
            'La prestación de servicios no exige exclusividad, pero dos o más contratos de tiempo completo a la vez, sobre todo en la MISMA entidad, indican una posible nómina paralela, '
            'doble pago por las mismas actividades o imposibilidad material de cumplir. Honorario mensual estimado = valor / duración. Las fechas son las registradas en SECOP (no reflejan terminaciones anticipadas no publicadas).')
ws['A2'].alignment = WR; ws.merge_cells('A2:V2'); ws.row_dimensions[2].height = 60
cols = ['N°', 'Severidad', 'Misma entidad', 'Documento', 'Contratista', 'Traslape desde', 'Traslape hasta', 'Días de traslape', 'Honorario mensual A + B (estimado)',
        'A: ID contrato', 'A: Entidad', 'A: Inicio', 'A: Fin', 'A: Valor', 'A: Objeto', 'B: ID contrato', 'B: Entidad', 'B: Inicio', 'B: Fin', 'B: Valor', 'B: Estado',
        'B: Objeto', 'Observación', 'A: Enlace', 'B: Enlace']
header(ws, 4, cols, [5, 10, 9, 13, 30, 11, 11, 9, 15, 20, 22, 11, 11, 14, 50, 20, 26, 11, 11, 14, 12, 50, 45, 30, 30])
for i, x in enumerate(SIMS, 5):
    a, b = x['a'], x['b']
    hb = x['h2'] or 0; ha = x['h1'] or 0
    put(ws, i, [i - 4, x['sev'], 'Sí' if x['misma'] else 'No', x['doc'], x['nombre'], x['ts'], x['te'], x['dias'], ha + hb,
                a['id_contrato'], a['_ent'], _ini(a), d10(a.get('fecha_de_fin_del_contrato')), a['_v'], a['objeto_del_contrato'][:300],
                b['id_contrato'], ENT.get(b['nit_entidad'], b['nombre_entidad']), _ini(b), d10(b.get('fecha_de_fin_del_contrato')), f(b['valor_del_contrato']),
                b.get('estado_contrato', ''), b['objeto_del_contrato'][:300], x['obs'], url(a), url(b)])
    ws.cell(row=i, column=2).fill = PatternFill('solid', fgColor=SEVC[x['sev']])
ws.auto_filter.ref = f"A4:{get_column_letter(len(cols))}{len(SIMS)+4}"

# ---- simultaneidad por persona
ws = wb.create_sheet('Simultaneidad (personas)')
ws['A1'] = 'Simultaneidad por contratista: cuántos contratos tuvo vigentes al mismo tiempo y en qué entidades'; ws['A1'].font = T
header(ws, 3, ['N°', 'Documento', 'Contratista', 'Máx. contratos vigentes a la vez', 'Contratos considerados', 'Pares simultáneos', 'Pares de severidad ALTA',
               'Valor de los contratos vigentes en 2026', 'Entidades'], [5, 13, 34, 14, 12, 11, 11, 18, 90])
SIMPS = sorted(SIMP.items(), key=lambda t: (-t[1]['max_simult'], -t[1]['alto'], -t[1]['valor']))
for i, (doc, p) in enumerate(SIMPS, 4):
    put(ws, i, [i - 3, doc, p['nombre'], p['max_simult'], p['n_contratos'], p['pares'], p['alto'], p['valor'], ', '.join(p['entidades'])])
ws.auto_filter.ref = f"A3:I{len(SIMPS)+3}"
