# Balance de seguridad: gobierno De la Espriella (ago–oct 2026)

- `hilo.md`: borrador del hilo (39 mensajes en 7 bloques: promesa, Santa Marta, bombardeos y Catatumbo, suroccidente, Caribe y Antioquia, lo que no sale en la alocución, cifras y cierre). Cada mensaje cita el número de nota del índice. Al final: datos de respaldo para réplicas y lo que no se pudo confirmar.
- `fuentes.md`: índice de 97 notas de prensa con enlace, fecha, titular y qué prueba cada una.
- `fuentes.json`: las mismas fuentes en formato de datos.
- `capturar_notas_reales.js`: script que abre cada enlace con Chromium y guarda una captura real de la nota en `capturas-reales/` (`node capturar_notas_reales.js`, o `--full` para página completa). Requiere Playwright y acceso de red a los sitios de prensa; en el entorno de la sesión los sitios estaban bloqueados y por eso las capturas no están incluidas.
