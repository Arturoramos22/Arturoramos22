# Bienes fiscales de Cúcuta en poder de terceros

Búsqueda (noviembre de 2026) de los inmuebles del Municipio de San José de Cúcuta que están en manos
de particulares y que la Alcaldía no ha recuperado. El municipio **no publica** su inventario de
inmuebles: de sus 14 conjuntos de datos en datos.gov.co, ninguno es de bienes. Por eso esta carpeta
reconstruye lo que se puede ver desde fuentes públicas y deja lista una petición para pedir el resto.

## Archivos

| Archivo | Qué es |
|---|---|
| `bienes_municipio_cucuta_en_poder_de_terceros.xlsx` | Excel con el resumen, 24 contratos de entrega a terceros revisados uno a uno, 18 casos documentados y los 324 contratos sobre inmuebles en SECOP |
| `Derecho de peticion - Bienes fiscales en poder de terceros.docx` | Borrador de petición al Alcalde (10 peticiones y un anexo). Faltan los datos del peticionario, resaltados en amarillo |
| `generar_excel.py` | Regenera el Excel a partir de los dos JSON |
| `secop_contratos_inmuebles_municipio.json` | Extracto de SECOP I y II (datos.gov.co: `jbjy-vk9h`, `f789-7hwg`, `qddk-cgux`) |
| `casos.json` | Casos documentados en prensa, sentencias e informes de control, cada uno con su fuente |

## Hallazgos principales

1. **Cuenta 8347 "Bienes entregados a terceros": $263.051.810.392,01**, el mismo saldo en 2023, 2024 y
   2025. Según la nota de los estados financieros, "son convenios que deben ser depurados y pertenecen a
   vigencias anteriores". La Contaduría reconoce además que no tiene el inventario de los bienes de uso
   público entregados en comodato.
2. **19 contratos vencidos sin renovación visible en SECOP**, de los cuales 17 son con particulares:
   - 8 arriendos de locales del C.C. El Oití, vencidos el 27-dic-2024;
   - el comodato con la Fundación La Banda del Indio, vencido en feb-2024;
   - los comodatos con la Fundación FARO, vencidos desde dic-2015;
   - el convenio con Cenabastos sobre los locales de Las Mercedes;
   - las concesiones educativas de Torcoroma III y Belén;
   - tres locales de la Terminal de transporte.
3. **"La Muela"** (matrícula 260-55425) se recuperó en nov-2026, tras unos 20 años de ocupación. El
   Contralor Municipal la presentó como un "caso piloto" al que seguirán otros, pero no publicó cuáles.
4. **26 parques y canchas entregados a particulares en 2019**, sin contraprestación para el municipio.
   Son bienes de uso público, no fiscales, pero siguen siendo del municipio. Además, según la Contraloría
   (vigencia 2022), el monumento Cristo Rey está invadido por comerciantes.

"Sin renovación visible en SECOP" es una alerta, no una prueba de que el bien siga ocupado. Por eso la
petición pide, contrato por contrato, el acta de restitución o la explicación de quién ocupa el bien hoy.

## Pistas pendientes

- Los ejidos municipales en procesos de extinción de dominio (rad. 2019-00170 y 2017-00005). No se
  pudieron verificar porque ramajudicial.gov.co no estuvo accesible.
- El lote de 3,9 ha del Anillo Vial prometido en comodato al Cúcuta Deportivo en 2009.
- El reporte CGN del CHIP (entidad 210154001), que hay que consultar manualmente en chip.gov.co.
