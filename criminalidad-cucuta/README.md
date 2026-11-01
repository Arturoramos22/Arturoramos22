# Criminalidad en Cúcuta: hilo con fuentes oficiales y capturas sin edición

## Propuesta de enfoque

**Ángulo.** El gancho es la noticia de la semana: la orden presidencial del 29 de octubre de 2026 de militarizar Cúcuta. El hilo no la critica de entrada. Primero reconstruye con cifras oficiales cómo se llegó aquí y al final muestra que la militarización ya se ha probado varias veces en la ciudad y en el mundo, sin resultados sostenidos. Así el cierre llega como conclusión de los datos y no como opinión.

**Estructura (37 trinos en 7 bloques).**

1. El gancho y la foto de hoy.
2. El quiebre de 1999 a 2004: llega el Frente Fronteras y Cúcuta se vuelve la ciudad más violenta del país.
3. Los herederos de 2005 a 2015 y la entrada al ranking mundial.
4. El cierre de la frontera, el ELN y las bandas venezolanas (2015-2021).
5. ¿Cuántas bandas hay? La lista oficial de la Defensoría, con nombres.
6. Cómo se mata y se cobra hoy: sicariato, extorsión, terrorismo y la guerra del Catatumbo.
7. La militarización y lo que dice la ciencia.

**Reglas.**

- Cada dato lleva su captura. Primero la fuente oficial (datos de la Policía y el MinDefensa, Defensoría, sentencias, Corte Constitucional, DANE), después estudios revisados por pares y organismos internacionales, y la prensa solo para los hechos sin documento oficial.
- Nada de capturas editadas ni tarjetas generadas. Las capturas son de las páginas reales, tomadas con un navegador. Las de PDF son la página del documento oficial tal cual.
- Lo que no es oficial se dice. El ranking de "ciudades más violentas del mundo" es de una ONG mexicana y el hilo lo presenta así.
- Las malas noticias para la tesis se dicen en el hilo, antes de que las saquen en las respuestas: la baja de homicidios de 2026, la baja con Esparta en 2018 y el caso de El Salvador. Las demás están en la sección de réplicas de `hilo.md`.
- El fracaso de la militarización se sostiene sobre las militarizaciones anteriores (sobre todo 2025) y sobre la evidencia científica, no sobre la del 29 de octubre: de esa todavía no hay datos.
- Ninguna frase dice que "la ciencia prueba" algo. El hilo dice lo que encontraron los estudios, con sus palabras.

**Respuesta corta a "¿cuántas bandas hay?".** La única cifra oficial publicada en un documento es la de la Defensoría (Alerta Temprana 027-24, diciembre de 2024): 20 estructuras de crimen organizado, 4 de ellas transnacionales, más 4 grupos armados: ELN, disidencias de las Farc, Clan del Golfo y EPL. En total, al menos 24 organizaciones, con presencia en todas las comunas. La Policía ha dado otras cifras en prensa (37 en 2023; 25 identificadas y 17 activas en 2024) y Pares habla de unas 26. La propia Defensoría advierte que los nombres cambian y algunos se repiten.

**Respuesta corta a "¿cuándo se volvió tan peligrosa?".** En 1999, con la llegada del Frente Fronteras de las AUC. En 2002 tuvo más de mil homicidios, y la justicia de Justicia y Paz la llamó la ciudad con el índice de homicidios más alto del país. Al ranking mundial de 50 ciudades entró en 2010, la primera edición de ese tamaño, en el puesto 28. Su puesto más alto fue el 22, en 2012. Está en la lista desde 2019 sin interrupción y en 2025 subió al puesto 28.

**Antes de publicar.**

- **Varios trinos pasan de 280 caracteres.** Funcionan como los del hilo anterior, con cuenta Premium. Si no, se parten.
- **Capturas manuales.** Algunos sitios bloquean navegadores automáticos. Esas capturas hay que tomarlas a mano desde el navegador: en `fuentes.md` aparecen con estado "manual" y el enlace exacto.

## Archivos

- `Hilo-Criminalidad-Cucuta.docx`: el hilo en Word. Cada trino trae el texto listo para copiar, su número de caracteres y las capturas en el orden en que se adjuntan, con su fuente. Al final van las réplicas, los pendientes y el índice de fuentes.
- `analizar_hilo.py`, `organizar_entrega.py` y `generar_word.js` regeneran la entrega desde `hilo.md`:
  1. `python3 analizar_hilo.py hilo.md hilo.json`
  2. `python3 organizar_entrega.py hilo.json salida/` arma las carpetas Trino-01 a Trino-37 y el .zip.
  3. `node generar_word.js hilo.json meta.json salida.docx` genera el Word. `meta.json` lista las copias livianas en JPEG de las capturas que van incrustadas en el documento.
- `hilo.md`: el borrador del hilo, con las capturas de cada trino, datos para las réplicas y lo que falta confirmar. Lo revisó un verificador independiente, cifra por cifra, contra la base oficial y los documentos.
- `fuentes.md` y `fuentes.json`: índice de todas las fuentes. Para cada una: qué prueba, enlace exacto, archivo de la captura y estado (capturada o manual).
- `capturas/`: las capturas reales, sin edición, con estos prefijos:
  - **D**: consultas a la base oficial de datos.gov.co y cuadros del DANE.
  - **O**: páginas de documentos oficiales y judiciales en PDF.
  - **W**: páginas web oficiales.
  - **R**: el ranking de la ONG mexicana.
  - **E**: estudios científicos y sus resúmenes.
  - **I**: organismos internacionales.
  - **P**: prensa.

  El archivo `capturas/_registro.json` guarda la URL exacta y la hora de cada captura.
- `consultas_oficiales.json`: la lista de capturas. Las de tipo "soql" son consultas al explorador oficial de datos.gov.co: cualquiera puede abrir el enlace y ver la misma tabla.
- `capturar_fuentes_oficiales.js`: vuelve a tomar todas las capturas (`node capturar_fuentes_oficiales.js`, o con los ID que se quieran, por ejemplo `node capturar_fuentes_oficiales.js D02 O01`). Requiere Playwright, `pdftoppm` y LibreOffice.
- `descargar_datos.py` y `datos/`: las series oficiales en CSV (homicidios, modalidad, extorsión, terrorismo, masacres y secuestro), con la consulta de origen en la primera línea de cada archivo.
- `generar_fuentes.py`: regenera `fuentes.md` y `fuentes.json` a partir de `consultas_oficiales.json` y del registro de capturas.
