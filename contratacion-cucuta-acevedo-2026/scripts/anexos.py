# Ejecutado al final de build.py: genera ANEXOS.md con los contratos y simultaneidades individualizados.
L = []
def esc(t): return str(t).replace('|', '/').replace('\n', ' ')
alto = [r for r in RIESGOSOS if r['_nivel'] == 'ALTO']
medio = [r for r in RIESGOSOS if r['_nivel'] == 'MEDIO']
bajo = [r for r in RIESGOSOS if r['_nivel'] == 'BAJO']
L += ['# Anexos: contratos individualizados con riesgo y simultaneidad de contratistas', '',
      'Este anexo complementa `INFORME.md`. Toda la información está también en la matriz (`matriz_contratacion_cucuta_2026.xlsx`), en las hojas "Fichas de riesgo por contrato", "Simultaneidad (pares)" y "Simultaneidad (personas)".',
      '', '> Cada ficha recoge hechos tal como están registrados en SECOP II, más los criterios que los convierten en alerta. No es una conclusión de ilegalidad.', '',
      f'**Resumen:** {len(alto)} contratos de riesgo ALTO ({mm(sum(r["_v"] for r in alto))}), {len(medio)} de riesgo MEDIO ({mm(sum(r["_v"] for r in medio))}) y {len(bajo)} de riesgo BAJO.', '',
      '## Anexo A. Fichas de los contratos con riesgo ALTO', '']
for i, r in enumerate(alto, 1):
    L += [f"### A{i}. {r['proveedor_adjudicado'].strip()}: {mm(r['_v'])} (puntaje {r['_score']})", '',
          f"- **Contrato:** `{r['id_contrato']}` · **Entidad:** {r['_ent']} · **Dependencia:** {r['_dep']} · **Firma:** {r['fecha_de_firma'][:10]}",
          f"- **Modalidad / causal:** {r['modalidad_de_contratacion']} / {r['justificacion_modalidad_de']}",
          f"- **Contratista:** {r['proveedor_adjudicado'].strip()} ({r['tipodocproveedor']} {r['documento_proveedor']}), R.L. {r.get('nombre_representante_legal','')}",
          f"- **Objeto:** {esc(r['objeto_del_contrato'][:500])}",
          f"- **Supervisor / ordenador del gasto:** {r.get('nombre_supervisor','')} / {r.get('nombre_ordenador_del_gasto','')}",
          '- **Análisis del riesgo:**'] + [f'  - {esc(x)}' for x in r['_razones']] + \
         ([f"- **Qué verificar:** {'; '.join(r['_verif'])}."] if r['_verif'] else []) + [f"- **SECOP:** {url(r).split('&')[0]}", '']
L += ['## Anexo B. Contratos con riesgo MEDIO', '', '| N° | Contrato | Entidad | Contratista | Valor | Puntaje | Motivos |', '|---|---|---|---|---|---|---|']
for i, r in enumerate(medio, 1):
    mot = ' · '.join(x for x in r['_razones'] if not x.startswith('Modificaciones'))
    L.append(f"| B{i} | `{r['id_contrato']}` | {r['_ent'][:25]} | {esc(r['proveedor_adjudicado'].strip()[:45])} | {mm(r['_v'])} | {r['_score']} | {esc(mot[:420])} |")
SIMPS = sorted(SIMP.items(), key=lambda t: (not t[1]['misma'], -t[1]['max_simult'], -((t[1]['pico'] or {}).get('mes', 0))))
CASO = {doc: f'S{k}' for k, (doc, _) in enumerate(SIMPS, 1)}
def ficha_sim(doc, p):
    out = [f"#### {CASO[doc]}. {esc(p['nombre'])} (doc. {doc})", '',
           f"{p['n_contratos']} contratos de prestación de servicios en {len(p['entidades'])} entidad(es); hasta **{p['max_simult']} vigentes a la vez**.", '',
           '| N° | Entidad | Contrato SECOP | Origen | Desde | Hasta | Días | Valor total | Valor mes | Estado | Objeto |', '|---|---|---|---|---|---|---|---|---|---|---|']
    for j, c in enumerate(p['contratos'], 1):
        out.append(f"| {j} | {esc(c['ent'][:35])} | `{c['id']}` | {c['origen']} | {c['ini']} | {c['fin']} | {c['dias']} | {mm(c['valor'])} | {mm(c['mes']) if c['mes'] is not None else 'n.d.*'} | {c['estado']} | {esc(c['obj'][:120])} |")
    out.append(f"| | **Total** | | | | | | **{mm(p['valor'])}** | | | |")
    if any(not c['fiable'] for c in p['contratos']):
        out.append('\n\\* La fecha de fin registrada en SECOP es igual o muy cercana a la de inicio, así que la duración no es confiable y no se calcula el valor mes ni se suma al pico.')
    out.append('')
    if p['tramos']:
        out += ['Periodos en que coinciden los contratos:', '']
        for t in p['tramos']:
            n = [str(j) for j, c in enumerate(p['contratos'], 1) if c['id'] in t['ids']]
            out.append(f"- Del {t['desde']} al {t['hasta']} ({_dias(t['desde'], t['hasta'])} días): contratos {', '.join(n)} a la vez, que suman **{mm(t['mes'])} al mes**.")
        pk = p['pico']
        rep = sorted({c['ent'] for t in p['tramos'] for c in p['contratos'] if c['id'] in t['ids'] and sum(1 for o in p['contratos'] if o['id'] in t['ids'] and o['ent'] == c['ent']) > 1})
        if rep:
            out += ['', f"**Contratos simultáneos con la misma entidad:** {', '.join(rep)}."]
        out += ['', f"**Pico:** {pk['n']} contratos simultáneos que suman **{mm(pk['mes'])} mensuales**, del {pk['desde']} al {pk['hasta']}.", '']
    else:
        out += ['Los cruces dependen de contratos terminados o cedidos, o de fechas no confiables. Hay que verificarlos en SECOP.', '']
    return out

n_misma = sum(1 for p in SIMP.values() if p['misma']); n3 = sum(1 for p in SIMP.values() if p['max_simult'] >= 3 and not p['misma'])
L += ['', '## Anexo C. Simultaneidad de contratistas, contrato por contrato', '',
      f"El cruce tomó cada contrato de prestación de servicios de persona natural firmado en el periodo y lo comparó con todos los contratos de prestación de servicios de esa misma persona en SECOP II, en cualquier entidad pública. "
      f"Se encontraron **{len(SIM)} pares simultáneos** que involucran a **{len(SIMP)} personas**.", '',
      '**Cómo leer cada caso:** se listan todos los contratos de la persona vigentes en 2026, con su fecha de inicio y de fin, su valor total y su **valor mes**, que es el valor total dividido entre la duración en meses de 30 días. '
      'Después vienen los periodos en que los contratos coinciden (solo los que incluyen al menos un contrato firmado desde el 8-mar-2026) y lo que suman por mes en cada periodo. Los contratos terminados o cedidos aparecen en la lista, pero no se suman, porque pudieron acabar antes. Tampoco se suman los contratos con duración registrada menor de 15 días, en los que la fecha de fin suele estar mal diligenciada. Solo se cuentan los periodos de coincidencia de 7 días o más. '
      'La prestación de servicios no exige exclusividad, así que esto es un indicio y no una prueba.', '',
      f'### C1. Dos o más contratos simultáneos con una misma entidad ({n_misma} personas)', '']
for doc, p in SIMPS:
    if p['misma']:
        L += ficha_sim(doc, p)
L += [f'### C2. Personas con tres o más contratos vigentes a la vez ({n3} personas)', '']
for doc, p in SIMPS:
    if p['max_simult'] >= 3 and not p['misma']:
        L += ficha_sim(doc, p)
L += ['### C3. Personas con dos contratos simultáneos en entidades distintas', '',
      '| Caso | Contratista (doc.) | Contrato 1: entidad, ID, desde→hasta, valor total / valor mes | Contrato 2: entidad, ID, desde→hasta, valor total / valor mes | Coinciden | Suma valor mes |', '|---|---|---|---|---|---|']
for doc, p in SIMPS:
    if p['max_simult'] >= 3 or p['misma'] or not p['tramos']:
        continue
    t = p['pico']; cs = [c for c in p['contratos'] if c['id'] in t['ids']]
    cel = lambda c: f"{esc(c['ent'][:32])}, `{c['id']}`, {c['ini']}→{c['fin']}, {mm(c['valor'])} / **{mm(c['mes'])}**"
    L.append(f"| {CASO[doc]} | {esc(p['nombre'])} ({doc}) | {cel(cs[0])} | {cel(cs[1])} | {t['desde']}→{t['hasta']} ({_dias(t['desde'], t['hasta'])} d) | **{mm(t['mes'])}** |")
L += ['', 'Las personas cuyos cruces dependen de contratos terminados o cedidos están en las hojas "Simultaneidad (detalle)" y "Simultaneidad (pares)" de la matriz.']
open(os.path.join(OUT, 'ANEXOS.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
cifras.update(n_alto=len(alto), n_medio=len(medio), n_bajo=len(bajo))

# ---- Sección 5 del INFORME, generada con los mismos datos
dist = collections.Counter(p['max_simult'] for p in SIMP.values())
n3m = sum(v for k, v in dist.items() if k >= 3)
pk15 = sum(1 for p in SIMP.values() if (p['pico'] or {}).get('mes', 0) >= 15e6)
pk20 = sum(1 for p in SIMP.values() if (p['pico'] or {}).get('mes', 0) >= 20e6)
SEC = ['## 5. Simultaneidad de contratistas: qué contratos, de qué fecha a qué fecha, cuánto vale cada uno y su valor mes', '',
       'Se cruzó cada contrato de **prestación de servicios** de persona natural firmado en el periodo con todos los contratos de prestación de servicios de esa misma persona en SECOP II, en cualquier entidad pública del país. Los comerciantes proveedores quedan fuera de este cruce.', '',
       'Para cada persona se listan **todos sus contratos** con fecha de inicio y fin, valor total y **valor mes**, que es el valor total dividido entre la duración en meses de 30 días. '
       'Luego se calculan los **periodos en que los contratos coinciden** y cuánto suman por mes. Solo se cuentan periodos de 7 días o más que incluyan al menos un contrato firmado desde el 8-mar-2026. '
       'No se suman los contratos terminados o cedidos, ni los que tienen una duración registrada menor de 15 días, porque su fecha de fin no es confiable.', '',
       '**Resultados:**', '',
       f'- **{len(SIM)} pares de contratos simultáneos** entre **{len(SIMP)} personas**. De ellos, {sum(1 for x in SIM if x["sev"]=="ALTO")} pares se cruzan durante 30 días o más con ambos contratos vigentes.',
       f'- Máximo de contratos vigentes a la vez: {dist.get(2,0)} personas con 2, {dist.get(3,0)} con 3, {dist.get(4,0)} con 4, {dist.get(5,0)} con 5 y {dist.get(6,0)} con 6. Hay {dist.get(1,0)} personas cuyo cruce depende de contratos terminados o de fechas no confiables y quedan para verificar.',
       f'- **{pk15} personas** suman 15 millones o más al mes en contratos simultáneos, y **{pk20}** suman 20 millones o más.',
       f'- **{sum(1 for p in SIMP.values() if p["misma"])} personas** tienen dos o más contratos simultáneos con una **misma entidad**.', '',
       'La prestación de servicios no exige exclusividad, así que la simultaneidad no es ilegal por sí misma. Sin embargo, varios contratos de tiempo completo a la vez indican una posible nómina paralela, doble pago o imposibilidad material de cumplir. '
       'Además, compromete la responsabilidad de los supervisores, que certifican el cumplimiento (Ley 1474 de 2011, arts. 83-84). Antes de afirmar un doble pago hay que pedir los informes de actividades, las planillas de seguridad social y las actas de terminación.', '',
       '### 5.1 Dos o más contratos simultáneos con una misma entidad (de Cúcuta o externa)', '']
for doc, p in SIMPS:
    if p['misma']:
        SEC += ficha_sim(doc, p)
SEC += ['### 5.2 Las diez personas con mayor valor mensual simultáneo', '']
top = [t for t in sorted(SIMP.items(), key=lambda t: -((t[1]['pico'] or {}).get('mes', 0))) if not t[1]['misma']][:10]
for doc, p in top:
    SEC += ficha_sim(doc, p)
SEC += [f'Los demás casos están en el **Anexo C** de `ANEXOS.md` (C2: las {n3m} personas con 3 o más contratos a la vez; C3: las personas con 2 contratos en entidades distintas) y en las hojas "Simultaneidad (detalle)", "Simultaneidad (tramos)", "Simultaneidad (pares)" y "Simultaneidad (personas)" de la matriz.', '']
_inf = os.path.join(OUT, 'INFORME.md')
_s = open(_inf, encoding='utf-8').read()
_i, _j = _s.index('## 5. Simultaneidad'), _s.index('## 6. Siguientes pasos')
open(_inf, 'w', encoding='utf-8').write(_s[:_i] + '\n'.join(SEC) + '\n' + _s[_j:])
cifras.update(sim_dist=dict(dist), sim_pico15=pk15, sim_pico20=pk20, sim_3mas=n3m)
