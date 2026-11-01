# CENS: tarifas, ganancias y regulación en Cúcuta (noviembre de 2026)

Hilo de 7 trinos con capturas reales de fuentes sólidas, sin edición (solo recortadas), y el expediente que lo respalda.

- `hilo.md`: los 7 trinos listos para publicar. Por cada trino van las 4 imágenes en orden, el texto alternativo (ALT) para pegar en X, lo que prueba cada imagen y su URL. Al final, una respuesta fijada opcional y lo que hay que revisar antes de publicar.
- `capturas/trino1` … `capturas/trino7`: las 28 imágenes (`trinoN_1.png` a `trinoN_4.png`) con su `manifiesto.json` (URL, página y texto que se recortó). `capturas/extra/` guarda capturas alternativas útiles para réplicas, por ejemplo la carta de CENS a la CREG en La Opinión.
- `fuentes.md` / `fuentes.json`: índice de fuentes por imagen, fuentes complementarias y huellas SHA-256 de los PDF.
- `EXPEDIENTE.md`:
  - la respuesta a "¿viola CENS la ley?" en tres niveles;
  - la tabla de hallazgos con sus contrapesos;
  - las réplicas probables;
  - lo que se descartó;
  - lo que sigue abierto (derechos de petición);
  - los datos del apagatón.
- `investigacion/`: los 32 expedientes de los 16 frentes (investigación y verificación adversarial, en JSON), el análisis legal consolidado y la revisión final del hilo.
- `scripts/`:
  - `capturar_web.js`: captura páginas web completas sin modificar el DOM. `PROXY_BYPASS` sirve para sitios solo HTTP, como el del Senado.
  - `captura_scroll.js`: para textos dentro de paneles con desplazamiento propio.
  - `recortar.py`: recorta sin editar las capturas web y las páginas de PDF.
  - `descargar_fuentes.sh`: vuelve a bajar los PDF y compara las huellas.

Para regenerar las capturas de un trino:

```bash
NODE_PATH=$(npm root -g) node scripts/capturar_web.js capturas/trinoN/manifiesto.json /tmp/capturas-completas
python3 -I scripts/recortar.py capturas/trinoN/manifiesto.json /tmp/capturas-completas capturas/trinoN
```

Las entradas PDF del manifiesto apuntan a copias locales en `archivo`. Bájalas primero con `scripts/descargar_fuentes.sh` y ajusta la ruta.
