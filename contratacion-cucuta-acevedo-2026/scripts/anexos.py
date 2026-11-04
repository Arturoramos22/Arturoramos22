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
L += ['', '## Anexo C. Simultaneidad de contratistas', '',
      f"El cruce tomó cada contrato de prestación de servicios de persona natural firmado en el periodo y lo comparó con todos los contratos de prestación de servicios de esa misma persona en SECOP II, en cualquier entidad pública. Los proveedores comerciantes, que pueden vender a varias entidades a la vez, quedan fuera de este cruce: su concentración se analiza en las fichas A y B. Se encontraron **{len(SIM)} pares simultáneos** que involucran a **{len(SIMP)} personas**:",
      f"- {sum(1 for x in SIM if x['sev']=='ALTO')} pares de severidad ALTA, con 30 días o más de traslape y ambos contratos vigentes;",
      f"- {sum(1 for x in SIM if x['sev']=='ALTO' and x['misma'])} de esos pares son en la **misma entidad**;",
      f"- {sum(1 for x in SIM if x['sev']=='VERIFICAR')} pares deben verificarse porque uno de los contratos figura como terminado, cerrado o cedido;",
      f"- {sum(1 for x in SIM if x['sev']=='BAJO')} pares tienen un traslape corto, menor de 30 días, que puede ser un empalme.", '',
      '### C1. Pares de severidad ALTA en la misma entidad (posible doble contrato por las mismas funciones)', '',
      '| N° | Contratista (doc.) | Entidad | Contrato A (vigencia, valor) | Contrato B (vigencia, valor) | Traslape | Honorario mensual A+B |', '|---|---|---|---|---|---|---|']
k = 0
for x in SIMS:
    if x['sev'] == 'ALTO' and x['misma']:
        k += 1; a, b = x['a'], x['b']
        L.append(f"| C1-{k} | {esc(x['nombre'])} ({x['doc']}) | {a['_ent'][:30]} | `{a['id_contrato']}` {_ini(a)}→{d10(a.get('fecha_de_fin_del_contrato'))}, {mm(a['_v'])}: {esc(a['objeto_del_contrato'][:110])} | "
                 f"`{b['id_contrato']}` {_ini(b)}→{d10(b.get('fecha_de_fin_del_contrato'))}, {mm(f(b['valor_del_contrato']))}: {esc(b['objeto_del_contrato'][:110])} | {x['ts']}→{x['te']} ({x['dias']} d) | {mm((x['h1'] or 0)+(x['h2'] or 0))} |")
L += ['', '### C2. Personas con tres o más contratos vigentes al mismo tiempo', '',
      '| N° | Contratista | Documento | Máx. vigentes a la vez | Pares ALTOS | Valor vigente 2026 | Entidades |', '|---|---|---|---|---|---|---|']
k = 0
for doc, p in SIMPS:
    if p['max_simult'] >= 3:
        k += 1
        L.append(f"| C2-{k} | {esc(p['nombre'])} | {doc} | {p['max_simult']} | {p['alto']} | {mm(p['valor'])} | {esc(', '.join(p['entidades']))} |")
L += ['', '### C3. Pares de severidad ALTA entre entidades distintas', '',
      '| N° | Contratista (doc.) | Contrato A (entidad analizada) | Contrato B (otra entidad) | Traslape | Honorario mensual A+B |', '|---|---|---|---|---|---|']
k = 0
for x in SIMS:
    if x['sev'] == 'ALTO' and not x['misma']:
        k += 1; a, b = x['a'], x['b']
        L.append(f"| C3-{k} | {esc(x['nombre'])} ({x['doc']}) | `{a['id_contrato']}` {a['_ent'][:28]}, {_ini(a)}→{d10(a.get('fecha_de_fin_del_contrato'))}, {mm(a['_v'])} | "
                 f"`{b['id_contrato']}` {esc(ENT.get(b['nit_entidad'], b['nombre_entidad'])[:35])}, {_ini(b)}→{d10(b.get('fecha_de_fin_del_contrato'))}, {mm(f(b['valor_del_contrato']))} | {x['dias']} d | {mm((x['h1'] or 0)+(x['h2'] or 0))} |")
L += ['', 'Los pares de severidad "VERIFICAR" y "BAJO" están en la hoja "Simultaneidad (pares)" de la matriz.']
open(os.path.join(OUT, 'ANEXOS.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
cifras.update(n_alto=len(alto), n_medio=len(medio), n_bajo=len(bajo))
