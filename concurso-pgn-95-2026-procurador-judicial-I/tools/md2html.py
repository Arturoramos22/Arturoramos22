#!/usr/bin/env python3
"""Conversor mínimo de Markdown a HTML (encabezados, párrafos, listas, tablas, citas, negrita, cursiva, código, enlaces).
   Se usa para subir los documentos a Google Drive convertidos en Google Docs."""
import re, sys, html, pathlib

def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'<em>\1</em>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', s)
    return s

def convert(md):
    lines = md.splitlines()
    out = []; i = 0; n = len(lines)
    list_stack = []  # types
    def close_lists():
        while list_stack: out.append('</%s>' % list_stack.pop())
    while i < n:
        line = lines[i]
        if not line.strip():
            close_lists(); i += 1; continue
        m = re.match(r'^(#{1,6})\s+(.*)$', line)
        if m:
            close_lists(); lvl = len(m.group(1)); out.append('<h%d>%s</h%d>' % (lvl, inline(m.group(2)), lvl)); i += 1; continue
        if line.strip() == '---':
            close_lists(); out.append('<hr>'); i += 1; continue
        if line.startswith('>'):
            close_lists(); buf = []
            while i < n and lines[i].startswith('>'):
                buf.append(lines[i][1:].strip()); i += 1
            out.append('<blockquote><p>%s</p></blockquote>' % inline(' '.join(buf))); continue
        if '|' in line and i + 1 < n and re.match(r'^\s*\|?\s*:?-{2,}', lines[i+1]):
            close_lists()
            header = [c.strip() for c in line.strip().strip('|').split('|')]
            i += 2; rows = []
            while i < n and '|' in lines[i] and lines[i].strip():
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            t = ['<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">', '<thead><tr>' + ''.join('<th>%s</th>' % inline(h) for h in header) + '</tr></thead><tbody>']
            for r in rows:
                t.append('<tr>' + ''.join('<td>%s</td>' % inline(c) for c in r) + '</tr>')
            t.append('</tbody></table>'); out.append('\n'.join(t)); continue
        m = re.match(r'^(\s*)([-*]|\d+\.)\s+(.*)$', line)
        if m:
            typ = 'ol' if m.group(2)[0].isdigit() else 'ul'
            if not list_stack or list_stack[-1] != typ:
                close_lists(); out.append('<%s>' % typ); list_stack.append(typ)
            out.append('<li>%s</li>' % inline(m.group(3))); i += 1; continue
        # párrafo (une líneas consecutivas)
        close_lists(); buf = [line.strip()]; i += 1
        while i < n and lines[i].strip() and not re.match(r'^(#{1,6}\s|>|[-*]\s|\d+\.\s|\|)', lines[i]) and lines[i].strip() != '---':
            buf.append(lines[i].strip()); i += 1
        out.append('<p>%s</p>' % inline(' '.join(buf)))
    close_lists()
    return '\n'.join(out)

if __name__ == '__main__':
    src = pathlib.Path(sys.argv[1]); dst = pathlib.Path(sys.argv[2])
    body = convert(src.read_text(encoding='utf-8'))
    title = re.search(r'^#\s+(.*)$', src.read_text(encoding='utf-8'), re.M)
    doc = '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>%s</title><style>body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.4} h1{font-size:20pt} h2{font-size:15pt} h3{font-size:12.5pt} th{background:#e8eeec;text-align:left} td,th{vertical-align:top;font-size:10pt} blockquote{border-left:3px solid #0f6b5b;padding-left:10px;color:#333} code{font-family:Consolas,monospace;font-size:10pt}</style></head><body>%s</body></html>' % (html.escape(title.group(1)) if title else src.stem, body)
    dst.write_text(doc, encoding='utf-8'); print('ok', dst, len(doc))
