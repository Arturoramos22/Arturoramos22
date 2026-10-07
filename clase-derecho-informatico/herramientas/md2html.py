import sys, re, html
def inline(t):
    t=html.escape(t)
    t=re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    t=re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', t)
    t=re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t=re.sub(r'(https?://[^\s<)\]]+)', r'<a href="\1">\1</a>', t)
    return t
def conv(md):
    out=['<html><head><meta charset="utf-8"><style>body{font-family:Calibri,Arial;font-size:11pt} h1,h2,h3{font-family:Cambria,Georgia;color:#1F3A5F} table{border-collapse:collapse} td,th{border:1px solid #9BA7B4;padding:4px;vertical-align:top;font-size:9.5pt} th{background:#1F3A5F;color:#fff}</style></head><body>']
    lines=md.split('\n'); i=0
    while i<len(lines):
        l=lines[i]
        if not l.strip() or l.startswith('---'): i+=1; continue
        m=re.match(r'^(#{1,4})\s+(.*)$', l)
        if m: out.append(f'<h{len(m.group(1))}>{inline(m.group(2))}</h{len(m.group(1))}>'); i+=1; continue
        if l.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'): rows.append(lines[i]); i+=1
            rows=[r for r in rows if not re.match(r'^\|\s*-+', r)]
            out.append('<table>')
            for ri,r in enumerate(rows):
                cells=[c.strip() for c in r.strip().strip('|').split('|')]
                tag='th' if ri==0 else 'td'
                out.append('<tr>'+''.join(f'<{tag}>{inline(c)}</{tag}>' for c in cells)+'</tr>')
            out.append('</table>'); continue
        if re.match(r'^\s*[-*]\s+', l):
            out.append('<ul>')
            while i<len(lines) and re.match(r'^\s*[-*]\s+', lines[i]): out.append('<li>'+inline(re.sub(r'^\s*[-*]\s+','',lines[i]))+'</li>'); i+=1
            out.append('</ul>'); continue
        if re.match(r'^\s*\d+\.\s+', l):
            out.append('<ol>')
            while i<len(lines) and re.match(r'^\s*\d+\.\s+', lines[i]): out.append('<li>'+inline(re.sub(r'^\s*\d+\.\s+','',lines[i]))+'</li>'); i+=1
            out.append('</ol>'); continue
        if l.startswith('<<PAGEBREAK>>'): i+=1; continue
        para=l; i+=1
        while i<len(lines) and lines[i].strip() and not re.match(r'^(#|\||\s*[-*]\s|\s*\d+\.\s|<<)', lines[i]): para+=' '+lines[i]; i+=1
        out.append('<p>'+inline(para)+'</p>')
    out.append('</body></html>')
    return '\n'.join(out)
if __name__=='__main__':
    sys.stdout.write(conv(open(sys.argv[1],encoding='utf-8').read()))
