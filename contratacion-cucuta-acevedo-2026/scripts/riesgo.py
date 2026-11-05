# Ejecutado dentro de build.py. Calcula un puntaje de riesgo por contrato, redacta el análisis
# individual de cada uno y detecta la simultaneidad de contratistas en cualquier entidad pública.

def mm(v):
    """Formatea pesos en millones al estilo colombiano: $1.234,5 M."""
    s = f"{v/1e6:,.1f}".replace(',', 'X').replace('.', ',').replace('X', '.')
    return f"${s} M"

# Contratistas o contratos que forman parte de cada alerta curada (índice en ALERTAS)
AMAP = {'1090372670': 0, '901913440': 0, '901990330': 1, '901902466': 2, 'CO1.PCCNTR.9419451': 3, 'CO1.PCCNTR.9456905': 4,
        '900245671': 5, '901454711': 6, '800104609': 6, '901545609': 7, '807007375': 7, '900357984': 7, '890309152': 8,
        '901417108': 8, '900793360': 12, '900575452': 12, '860014923': 12, '800214941': 12}

# Concentración por contratista
_conc = collections.defaultdict(lambda: [0, 0.0])
for r in rows:
    if r['documento_proveedor'] not in ('No Definido', ''):
        _conc[r['documento_proveedor']][0] += 1; _conc[r['documento_proveedor']][1] += r['_v']

# ---------------------------------------------------------------- simultaneidad
_ext = collections.defaultdict(list)
for x in EXT:
    _ext[x['documento_proveedor']].append(x)
NITS_CUCUTA = set(ENT)

def _dur_meses(s, e):
    try:
        d0, d1 = date.fromisoformat(s), date.fromisoformat(e)
        dd = (d1 - d0).days + 1
        return dd / 30 if dd >= 15 else None
    except Exception:
        return None

def _ini(x):
    return d10(x.get('fecha_de_inicio_del_contrato')) or d10(x.get('fecha_de_firma'))

SIM, seen = [], set()
for r in rows:
    if r['tipodocproveedor'] == 'NIT' or r['documento_proveedor'] in ('No Definido', '') or not r['_ps']:
        continue
    s1, e1 = _ini(r), d10(r.get('fecha_de_fin_del_contrato'))
    if not e1:
        continue
    for o in _ext.get(r['documento_proveedor'], []):
        if o['id_contrato'] == r['id_contrato'] or 'Servicios profesionales' not in (o.get('justificacion_modalidad_de') or ''):
            continue
        s2, e2 = _ini(o), d10(o.get('fecha_de_fin_del_contrato'))
        if not e2 or not (s1 <= e2 and s2 <= e1):
            continue
        k = tuple(sorted([r['id_contrato'], o['id_contrato']]))
        if k in seen:
            continue
        seen.add(k)
        ts, te = max(s1, s2), min(e1, e2)
        dias = (date.fromisoformat(te) - date.fromisoformat(ts)).days + 1
        m1 = _dur_meses(s1, e1); m2 = _dur_meses(s2, e2)
        h1 = r['_v'] / m1 if m1 else None
        h2 = f(o['valor_del_contrato']) / m2 if m2 else None
        misma = r['nit_entidad'] == o['nit_entidad']
        cerrado = (o.get('estado_contrato') or '').lower() in ('terminado', 'cerrado', 'cedido') or (r.get('estado_contrato') or '').lower() in ('terminado', 'cerrado', 'cedido')
        if cerrado:
            sev, obs = 'VERIFICAR', 'Uno de los contratos figura como terminado, cerrado o cedido: pudo terminarse de forma anticipada. Hay que verificar la fecha real de terminación.'
        elif dias >= 30:
            sev = 'ALTO'
            obs = ('Dos contratos vigentes a la vez en la MISMA entidad, posiblemente por las mismas funciones' if misma else
                   'Contratos vigentes a la vez en entidades distintas') + f' durante {dias} días.'
        else:
            sev, obs = 'BAJO', f'Traslape corto ({dias} días): puede ser un empalme entre un contrato y el siguiente.'
        SIM.append(dict(doc=r['documento_proveedor'], nombre=r['proveedor_adjudicado'], a=r, b=o, ts=ts, te=te, dias=dias, h1=h1, h2=h2,
                        misma=misma, sev=sev, obs=obs, b_en_cucuta=o['nit_entidad'] in NITS_CUCUTA))

# Detalle por persona: cada contrato con sus fechas, valor y valor mensual, y el pico de honorarios simultáneos
CERR = ('terminado', 'cerrado', 'cedido', 'cancelado')
def _dias(s, e):
    return (date.fromisoformat(e) - date.fromisoformat(s)).days + 1

SIMP = {}
for doc in {x['doc'] for x in SIM}:
    cs = {x['id_contrato']: x for x in _ext[doc] if 'Servicios profesionales' in (x.get('justificacion_modalidad_de') or '')}
    for r in rows:
        if r['documento_proveedor'] == doc and r['_ps']:
            cs[r['id_contrato']] = r
    IDS_PER = {r['id_contrato'] for r in rows}
    det = []
    for x in cs.values():
        s_, e_ = _ini(x), d10(x.get('fecha_de_fin_del_contrato'))
        if not (s_ and e_ and e_ >= '2026-03-08' and e_ >= s_):
            continue
        dd = _dias(s_, e_); val = f(x['valor_del_contrato'])
        det.append(dict(id=x['id_contrato'], ent=ENT.get(x['nit_entidad'], x['nombre_entidad']), obj=x['objeto_del_contrato'], ini=s_, fin=e_,
                        dias=dd, meses=dd / 30, valor=val, mes=val / (dd / 30) if dd >= 15 else None, fiable=dd >= 15, estado=x.get('estado_contrato', ''),
                        vigente=(x.get('estado_contrato') or '').lower() not in CERR, url=url(x), en_periodo=x['id_contrato'] in IDS_PER,
                        origen=('Cúcuta – periodo' if x['id_contrato'] in IDS_PER else 'Cúcuta – antes del 8-mar' if x['nit_entidad'] in NITS_CUCUTA else 'Otra entidad')))
    det.sort(key=lambda c: c['ini'])
    for c in det:
        c['con'] = [o['id'] for o in det if o['id'] != c['id'] and o['ini'] <= c['fin'] and c['ini'] <= o['fin']]
    # tramos: entre fechas de corte, qué contratos vigentes coinciden y cuánto suman por mes
    vig = [c for c in det if c['vigente'] and c['fiable']]
    cortes = sorted({c['ini'] for c in vig} | {(date.fromisoformat(c['fin']) + __import__('datetime').timedelta(days=1)).isoformat() for c in vig})
    tramos = []
    for i in range(len(cortes) - 1):
        t0, t1 = cortes[i], (date.fromisoformat(cortes[i + 1]) - __import__('datetime').timedelta(days=1)).isoformat()
        act = [c for c in vig if c['ini'] <= t0 and c['fin'] >= t1]
        if len(act) >= 2 and _dias(t0, t1) >= 7 and any(c['en_periodo'] for c in act):
            tramos.append(dict(desde=t0, hasta=t1, n=len(act), ids=[c['id'] for c in act], mes=sum(c['mes'] for c in act)))
    pico = max(tramos, key=lambda t: (t['mes'], t['n']), default=None)
    pares = [x for x in SIM if x['doc'] == doc]
    SIMP[doc] = dict(nombre=pares[0]['nombre'], n_contratos=len(det), max_simult=max((t['n'] for t in tramos), default=1), pares=len(pares),
                     alto=sum(1 for x in pares if x['sev'] == 'ALTO'), entidades=sorted({c['ent'] for c in det}),
                     valor=sum(c['valor'] for c in det), contratos=det, tramos=tramos, pico=pico,
                     misma=any(len({c['ent'] for c in p_['contratos'] if c['id'] in t['ids']}) < t['n'] for p_ in [dict(contratos=det)] for t in tramos))

SIM_BY_ID = collections.defaultdict(list)
for x in SIM:
    SIM_BY_ID[x['a']['id_contrato']].append(x)

# ---------------------------------------------------------------- puntaje y análisis por contrato
for r in rows:
    sc, razones, verif = 0, [], []
    al = AMAP.get(r['id_contrato'], AMAP.get(r['documento_proveedor']))
    r['_alerta'] = None
    if al is not None:
        A = ALERTAS[al]; r['_alerta'] = f"N° {al+1} – {A['tipo']}"
        sc += 4 if A['riesgo'] == 'ALTO' else 2
        razones.append(f"Hace parte de la alerta N° {al+1} de la matriz ({A['tipo']}).")
    b, v = r['_base'], r['_v']
    if b and v > b * 1.40:
        sc += 3
        razones.append(f"Se abrió con un presupuesto de {mm(b)} y hoy vale {mm(v)} (+{f'{100*(v/b-1):.1f}'.replace('.', ',')}%), cerca del tope de adiciones del 50% (Ley 80, art. 40).")
        verif.append('Justificación técnica de la adición y si los hechos eran imprevisibles')
    elif b and v > b * 1.05:
        sc += 1; razones.append(f"Valor actual {mm(v)} frente a un presupuesto base de {mm(b)} (+{f'{100*(v/b-1):.1f}'.replace('.', ',')}%).")
    if not r['_directa'] and r['_ofertas'] == 1:
        sc += 2
        inv = f", con {r['_invitados']} proveedores invitados" if r['_invitados'] else ''
        vis = f" y {r['_visto']} visualizaciones del proceso" if r['_visto'] else ''
        razones.append(f"Proceso competitivo ({r['modalidad_de_contratacion']}) con una sola oferta{inv}{vis}.")
        verif.append('Requisitos habilitantes, observaciones al pliego y plazo para ofertar')
    if r['modalidad_de_contratacion'] == 'Mínima cuantía' and b and b >= 0.9 * MINIMA:
        sc += 2; razones.append(f"El presupuesto de mínima cuantía ({mm(b)}) equivale al {100*b/MINIMA:.0f}% del tope de la modalidad ({mm(MINIMA)}).")
        verif.append('Si hay objetos similares contratados en fechas cercanas (fraccionamiento)')
    if 'Menor' in r['modalidad_de_contratacion'] and b and b >= 0.95 * MENOR:
        sc += 2; razones.append(f"El presupuesto ({mm(b)}) queda a {mm(MENOR-b)} del tope de menor cuantía ({mm(MENOR)}), que obliga a licitar.")
        verif.append('Estudio de mercado que soporta el presupuesto')
    if 'nteradmin' in r['justificacion_modalidad_de'] and re.search(r'FUNDACI|CORPORACI|ASOCIACI|\bS\.?A\.?S\b|ESCUELA', r['proveedor_adjudicado'].upper() + ' ' + str(r.get('nombre_representante_legal', '')).upper()):
        sc += 3; razones.append('Se contrató directamente con la causal "interadministrativa", pero el contratista es una persona jurídica privada o una S.A.S. (RUES). Esa causal solo procede entre entidades estatales.')
        verif.append('Certificado de existencia y representación, y composición accionaria')
    if r['_ps'] and r['tipodocproveedor'] == 'NIT' and v >= 150e6:
        sc += 2; razones.append(f"Contratación directa por \"servicios profesionales y apoyo a la gestión\" con una persona jurídica, por {mm(v)}. El objeto no parece intuitu personae.")
        verif.append('Certificado de idoneidad y productos entregados')
    if '092' in r['justificacion_modalidad_de'] and 'con ofertas' not in r['modalidad_de_contratacion'] and v >= 500e6:
        sc += 2; razones.append(f"Convenio con una ESAL (Decreto 092 de 2017) por {mm(v)}, firmado sin proceso competitivo.")
        verif.append('Aporte de la ESAL (mínimo 30% si es de asociación) y certificado de reconocida idoneidad')
    if '092' in r['justificacion_modalidad_de'] and r['fecha_de_firma'][:10] <= '2026-06-21' and (r['_ofertas'] or 0) <= 1:
        sc += 1; razones.append('Convenio de la ESAL firmado durante la Ley de Garantías con una sola oferta o ninguna.')
    if 'científicas' in r['justificacion_modalidad_de'] and 'FIDUCIA' in r['proveedor_adjudicado'].upper():
        sc += 4; razones.append('Encargo fiduciario contratado directamente con la causal de "actividades científicas y tecnológicas", que no corresponde a ese objeto.')
    if v >= 100e6 and (r.get('nombre_supervisor') or 'No definido') == 'No definido':
        sc += 1; razones.append('SECOP no registra supervisor.')
        verif.append('Acto de designación del supervisor e informes de supervisión')
    sup = (r.get('nombre_supervisor') or '').strip().upper()
    if v >= 100e6 and sup and sup != 'NO DEFINIDO' and sup == (r.get('nombre_ordenador_del_gasto') or '').strip().upper():
        sc += 1; razones.append(f"El supervisor ({r['nombre_supervisor']}) es el mismo ordenador del gasto, así que no hay control cruzado.")
    if r['documento_proveedor'] in ('No Definido', ''):
        sc += 1; razones.append('El contratista plural (unión temporal o consorcio) no tiene NIT registrado en SECOP.')
    if v < 1 and not r['_ps']:
        sc += 1; razones.append('Contrato a valor cero sobre un bien público (comodato o aprovechamiento económico).')
    n, vt = _conc.get(r['documento_proveedor'], [0, 0])
    if n >= 3 and vt >= 1e9 and not r['_ps']:
        sc += 1; razones.append(f"Contratista recurrente: {n} contratos por {mm(vt)} en el periodo.")
    sims = [x for x in SIM_BY_ID.get(r['id_contrato'], []) if x['sev'] == 'ALTO']
    if sims:
        sc += 2 if any(x['misma'] for x in sims) else 1
        det = '; '.join(f"{x['b']['nombre_entidad'][:40]} ({x['b']['id_contrato']}, {x['dias']} días)" for x in sims[:4])
        razones.append(f"El contratista tiene {len(sims)} contrato(s) vigente(s) a la vez con este: {det}.")
        verif.append('Informes de actividades y horarios de los contratos simultáneos')
    mods = MODS.get(r['id_contrato'], [])
    if mods and (sc > 0):
        razones.append('Modificaciones registradas: ' + '; '.join(f"{m['fecharegistro'][:10]} {m['tipo']}: {m['descripcion'][:120]}" for m in sorted(mods, key=lambda m: m['fecharegistro'])))
    r['_score'] = sc
    r['_nivel'] = 'ALTO' if sc >= 6 else 'MEDIO' if sc >= 3 else 'BAJO' if sc >= 1 else ''
    r['_razones'] = razones
    r['_verif'] = list(dict.fromkeys(verif))
