"""Convierte hilo.md en un JSON estructurado (trinos, texto listo para X, conteo de
caracteres y capturas en orden). Uso: python3 analizar_hilo.py hilo.md salida.json"""
import json, re, sys
src = sys.argv[1]
h = open(src, encoding='utf-8').read()
cuerpo, resto = h.split('## Datos a la mano para las réplicas')
replicas, pendientes = resto.split('## Lo que no pude confirmar o hay que revisar antes de publicar')
intro = cuerpo.split('---')[0]
bloques = []
tweets = []
bloque_actual = None
cur = None
for line in cuerpo.split('---', 1)[1].splitlines():
    if line.startswith('## '):
        bloque_actual = line[3:].strip(); bloques.append(bloque_actual); continue
    m = re.match(r'^\*\*(\d+)/\s*(.*?)\*\*\s*$', line)
    if m:
        cur = dict(n=int(m.group(1)), titulo=m.group(2).strip(), bloque=bloque_actual, lineas=[], capturas=[], respaldo=[])
        tweets.append(cur); continue
    if cur is None: continue
    if line.startswith('🖼️'):
        for mm in re.finditer(r'([DOWREIP]\d{2})( \*\(manual\)\*)?', line):
            cur['capturas'].append(dict(id=mm.group(1), manual=bool(mm.group(2))))
        continue
    if line.startswith('📎'):
        cur['respaldo'].append(line.replace('📎', '').strip()); continue
    cur['lineas'].append(line)
for t in tweets:
    while t['lineas'] and not t['lineas'][0].strip(): t['lineas'].pop(0)
    while t['lineas'] and (not t['lineas'][-1].strip() or t['lineas'][-1].strip() == '---'): t['lineas'].pop()
    # texto listo para pegar en X
    partes = [f"{t['n']}/" + (f" {t['titulo']}" if t['titulo'] else '')]
    for l in t['lineas']:
        if l.startswith('- '): partes.append('– ' + l[2:])
        else: partes.append(l)
    # colapsa líneas vacías múltiples
    txt = '\n'.join(partes)
    txt = re.sub(r'\n{3,}', '\n\n', txt).strip()
    if t['n'] == 1:
        txt = txt.replace('1/\n', '1/ ', 1)
    t['texto'] = txt
    t['caracteres'] = len(txt)
json.dump(dict(intro=intro, bloques=bloques, tweets=tweets, replicas=replicas.strip(), pendientes=pendientes.strip()),
          open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for t in tweets: print(t['n'], t['caracteres'], [c['id'] for c in t['capturas']])
