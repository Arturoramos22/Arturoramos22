#!/usr/bin/env python3
"""Genera versiones empaquetadas del simulador:
   dist/simulador-standalone.html  -> un solo archivo (banco incluido) para abrir localmente o desde Drive.
   dist/artifact.html              -> versión sin envoltorio <html>/<head>/<body> para publicar como Artifact.
"""
import re, pathlib
here = pathlib.Path(__file__).resolve().parent
html = (here / 'index.html').read_text(encoding='utf-8')

def inline_banco(h):
    def repl(m):
        src = m.group(1)
        code = (here / src).read_text(encoding='utf-8')
        return '<script>\n' + code + '\n</script>'
    return re.sub(r'<script src="(banco/[^"]+)"></script>', repl, h)

full = inline_banco(html)
dist = here / 'dist'; dist.mkdir(exist_ok=True)
(dist / 'simulador-standalone.html').write_text(full, encoding='utf-8')

# Versión artifact: solo <title>, <link>, <style> y el contenido del body
head = re.search(r'<head>(.*?)</head>', full, re.S).group(1)
title = re.search(r'<title>.*?</title>', head, re.S).group(0)
links = '\n'.join(re.findall(r'<link[^>]*>', head))
style = re.search(r'<style>.*?</style>', head, re.S).group(0)
body = re.search(r'<body>(.*?)</body>', full, re.S).group(1)
artifact = '\n'.join([title, links, style, body])
(dist / 'artifact.html').write_text(artifact, encoding='utf-8')
print('standalone:', len(full), 'bytes | artifact:', len(artifact), 'bytes')
