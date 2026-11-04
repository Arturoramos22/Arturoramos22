# Contratación Alcaldía de Cúcuta y entidades descentralizadas (8-mar a 4-nov-2026)

- `INFORME.md`: resumen ejecutivo con las prioridades del gasto y las alertas.
- `matriz_contratacion_cucuta_2026.xlsx`: la matriz completa, con 2.992 contratos, 16 alertas curadas, banderas automáticas, concentración por contratista, PS simultáneos y la metodología.
- `cifras.json`: los agregados que usa el informe.
- `scripts/`: el código para regenerar la matriz. Uso: `python3 scripts/build.py <dir_datos> <dir_salida>`.
  - `<dir_datos>` debe contener `contratos.jsonl` (SECOP II jbjy-vk9h, filtrado por NIT de las entidades y fecha_de_firma >= 2026-03-08) y `procesos.json` (p6dx-8zbt).
