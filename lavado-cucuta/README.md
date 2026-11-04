# ¡Ay, Presidente! Lavado de activos en Cúcuta y la Operación Némesis

- `trino.md`: dos versiones para elegir, un trino único (largo, para cuenta Premium) y un hilo de 9 trinos. Traen las capturas de cada trino, qué cambió del borrador original y por qué, datos para las réplicas y lo que hay que revisar antes de publicar.
- `Trino-lavado-Cucuta.docx`: lo mismo en Word, con el texto listo para copiar y las capturas en el orden en que se adjuntan.
- `fuentes.md` y `fuentes.json`: índice de las 55 fuentes. Para cada una: qué prueba, enlace exacto y estado (capturada o manual).
- `capturas/`: las capturas reales, sin edición. Los prefijos son:
  - X: trino del Presidente (pantallazos aportados por el usuario).
  - V: video del trino presidencial.
  - F: Fiscalía en datos.gov.co.
  - M: MinDefensa.
  - A: Defensoría, AT 027-24.
  - G: GAFILAT, DANE y DIAN.
  - U: UIAF.
  - W: páginas oficiales.
  - T: caso TD Bank.
  - N: Operación Némesis y operativos del Gobierno.
  - P: prensa.
- `consultas_oficiales.json` y `capturar_fuentes_oficiales.js`: la lista de capturas y el script que las vuelve a tomar.
- `analizar_trino.py`, `organizar_entrega.py` y `generar_word.js`: regeneran el Word y las carpetas de capturas por trino a partir de `trino.md`.
- `generar_fuentes.py`: regenera el índice de fuentes.

Las cifras de la Fiscalía salen de la base «Procesos Fiscalía - V3» (datos.gov.co, corte al 30 de septiembre de 2026):

- **Las de Cúcuta** (338 procesos por lavado, 286 en indagación, 18 en ejecución de penas, 3 por testaferrato, 26 abiertos en 2025) cuentan procesos distintos.
- **Los rankings nacionales** cuentan registros, una fila por cada delito de un proceso. El puesto de Cúcuta es el mismo con cualquiera de los dos conteos.
