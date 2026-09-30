# Preparación · Concurso PGN 2026 · Procurador Judicial I (Convocatoria 95-2026)

Paquete de estudio de alto nivel para la prueba de conocimientos y la prueba comportamental del concurso abierto de méritos de la Procuraduría General de la Nación (Resolución 076 de 2026 y modificatorias, versión 4 del formato de convocatoria), diseñado para el formato de **juicio situacional** de la **Universidad de Antioquia**, operadora de las pruebas.

## Contenido

| Archivo | Qué contiene | Cuándo usarlo |
|---|---|---|
| `01_PROGRAMA_DE_ESTUDIO.md` | Ficha del concurso, estrategia, método RETAE, cronograma de 32 semanas (octubre 2026 a mayo 2027), indicadores, análisis de antecedentes y logística del día de la prueba | Léalo completo la primera semana y revíselo al cierre de cada fase |
| `02_ADN_PRUEBAS_UNIVERSIDAD_DE_ANTIOQUIA.md` | Cómo evalúa la UdeA: anatomía del ítem, patrones de distractores, protocolo de resolución en 2 minutos, graduación de la prueba comportamental, diferencias con el concurso de 2015 y documentos a monitorear | Antes del primer simulacro y antes de cada simulacro completo |
| `03_MAPA_NORMATIVO_Y_JURISPRUDENCIAL.md` | Normas y sentencias por eje (núcleo, complemento, jurisprudencia clave, alertas de verificación) | Guía de lectura semanal |
| `simulador/index.html` + `simulador/banco/*.js` | Simulador web: 144 ítems de conocimientos en 10 ejes y 30 comportamentales; modos simulacro, práctica por eje, repaso de errores y banco de estudio; cronómetro; calificación con umbral 65/100 y ponderación 70/20/10 | Diario (práctica) y quincenal/semanal (simulacros) |
| `simulador/dist/simulador-standalone.html` | El mismo simulador en un solo archivo (banco incluido) para abrir sin servidor, desde el computador o descargado de Drive | Uso local |
| `simulador/build.py` | Regenera las versiones empaquetadas después de editar el banco | Solo si modifica ítems |

## Cómo usar el simulador

1. Abra `simulador/dist/simulador-standalone.html` en cualquier navegador moderno (doble clic). No requiere instalación ni conexión, salvo para cargar las fuentes tipográficas.
2. **Modo 1 – Simulacro completo:** 100 ítems de conocimientos con la distribución ponderada por eje más 20 comportamentales, 240 minutos continuos, sin retroalimentación hasta el final.
3. **Modo 2 – Práctica por eje:** elija ejes, cantidad y retroalimentación inmediata (recomendado para estudiar).
4. **Modo 3 – Repaso de errores:** vuelve a presentar los ítems fallados en intentos anteriores (guardados en el navegador).
5. **Modo 4 – Banco de estudio:** fichas con respuesta, explicación y fuente.
6. Atajos: `A`–`D` o `1`–`4` responden; flechas navegan; `M` marca para revisar.

El historial y la lista de errores se guardan en el almacenamiento local del navegador que use; si cambia de equipo o borra datos del navegador, se reinician.

## Cómo ampliar o corregir el banco

Cada archivo en `simulador/banco/` agrega ítems a `window.BANCO`. Un ítem de conocimientos tiene `caso`, `enunciado`, cuatro `opciones`, el índice `correcta` (0 a 3), `explicacion`, `fuente`, `tema` y `nivel`. Un ítem comportamental tiene tres `opciones` con texto `t` y valor `v` (2 alto, 1 medio, 0 bajo). Después de editar, ejecute `python3 simulador/build.py` para regenerar `dist/`.

## Advertencias

- El banco es material de preparación construido a partir de la normativa y la jurisprudencia vigentes a septiembre de 2026; **no reproduce ítems oficiales** ni sustituye la lectura de las normas.
- Los datos del concurso marcados como **(verificar)** en el programa deben contrastarse con los documentos oficiales en `procuraduria.gov.co` y `meritoconstruyendoexcelencia.com.co`, que no pudieron descargarse desde el entorno en que se elaboró este paquete.
- Cuando la Universidad de Antioquia publique la Guía de Orientación al Aspirante para las pruebas y los ejes temáticos oficiales, reajuste los pesos del programa y del simulador.
