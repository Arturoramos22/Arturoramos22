# Trino: simultaneidad de contratos, caso Carlos Alberto Gelves Mogollón

## Texto (versión larga, una sola publicación; requiere X Premium)

Así se desangra el Estado de a poco.

Una sola persona, 10 contratos de prestación de servicios en 2026 con 5 entidades públicas:
- Gobernación de Norte de Santander
- Alcaldía de Cúcuta
- Alcaldía de Los Patios
- IMRD de Los Patios
- Tránsito de Los Patios

Del 23 de enero al 20 de junio tuvo los 5 contratos vigentes al mismo tiempo. Volvió a tenerlos del 15 de octubre al 3 de noviembre.

Todos los contratos son para lo mismo: formular y hacer seguimiento a proyectos de inversión.

Suman $210,5 millones en el año, unos $22 millones al mes cuando están los 5 a la vez.

No es un caso aislado. En el análisis de la contratación de Cúcuta encontramos 454 personas con contratos simultáneos y 55 con 3 o más a la vez.

Aquí se necesita una reforma urgente. Si la @UGPP_Colombia cruzara cédulas y aportes, y la @DIANColombia fuera más enfática, verían que como este hay miles de casos en el país.

Todo es público: SECOP II, datos.gov.co.

## Texto (versión corta, 280 caracteres)

Así se desangra el Estado de a poco: 1 contratista, 5 entidades, 10 contratos en 2026, 5 vigentes al mismo tiempo, todos para "proyectos de inversión". $210 M. En Cúcuta hay 454 casos de simultaneidad. Reforma urgente. ¿@UGPP_Colombia? ¿@DIANColombia? Datos: SECOP II.

## Imágenes (capturas en crudo, sin edición)

Son capturas directas del navegador: sin recortes, recuadros, anotaciones ni gráficas generadas. Para que no aparezca la cédula, se filtró por el nombre del contratista.

1. `01_datosgovco_contratos_crudo.png`: datos.gov.co (SECOP II – Contratos Electrónicos). Muestra los 10 contratos con proveedor, entidad, fecha de inicio, fecha de fin y valor, y la marca "Mostrando filas 1-10 de 10".
2. `02_api_objetos_crudo.png`: respuesta de la API oficial de datos.gov.co con la entidad, las fechas, el valor y el objeto completo de cada contrato.

Para reproducirlas: `node rawshot2.js "<url>" <salida.png> 1500 1150 "Mostrando filas"` y `node rawshot2.js "<url_api>" <salida.png> 1300 720`. Las URL están en `urls2.txt`, una por línea.

## Cifras que sostienen el trino

| Entidad | Contrato | Desde | Hasta | Valor | Valor mes |
|---|---|---|---|---|---|
| Tránsito de Los Patios | CO1.PCCNTR.8933878 | 16-ene | 15-jul | $18,9 M | $3,1 M |
| Gobernación N. de S. | CO1.PCCNTR.8886255 | 19-ene | 18-ago | $47,8 M | $6,8 M |
| Alcaldía de Cúcuta | CO1.PCCNTR.8975560 | 21-ene | 20-jun | $25,0 M | $5,0 M |
| Municipio de Los Patios | CO1.PCCNTR.9000318 | 23-ene | 22-jun | $17,5 M | $3,5 M |
| IMRD de Los Patios | CO1.PCCNTR.9070496 | 23-ene | 22-jul | $20,2 M | $3,3 M |
| Municipio de Los Patios | CO1.PCCNTR.9729416 | 04-ago | 03-nov | $10,5 M | $3,4 M |
| IMRD de Los Patios | CO1.PCCNTR.9763161 | 06-ago | 31-dic | $16,4 M | $3,3 M |
| Alcaldía de Cúcuta | CO1.PCCNTR.9799214 | 13-ago | 27-dic | $22,5 M | $4,9 M |
| Gobernación N. de S. | CO1.PCCNTR.9942258 | 16-sep | 30-dic | $23,9 M | $6,8 M |
| Tránsito de Los Patios | CO1.PCCNTR.10073685 | 15-oct | 29-dic | $7,9 M | $3,1 M |
| **Total** | | | | **$210,5 M** | |

Suma prorrateada por mes, en millones: ene 8,5 · feb 20,2 · mar 22,4 · abr 21,7 · may 22,4 · jun 19,1 · jul 11,0 · ago 13,3 · sep 15,1 · oct 20,8 · nov 18,5 · dic 17,6.

## Cuidado legal antes de publicar

- La prestación de servicios **no exige exclusividad**. Tener varios contratos a la vez no es un delito en sí mismo.
- Atribuirle a una persona identificada que "roba" puede configurar injuria o calumnia (Código Penal, arts. 220-221).
- Por eso el texto propuesto dirige el "así se desangra el Estado" al sistema y presenta los hechos de la persona como datos públicos verificables.
- Si quieres más margen, publica sin el nombre ("un contratista") y deja las capturas con el nombre visible solo para quien pida la fuente.
