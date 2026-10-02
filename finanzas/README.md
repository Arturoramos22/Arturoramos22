# Registro de finanzas

Libro diario de gastos e ingresos, un archivo CSV por mes (`AAAA-MM-registro.csv`).

Columnas:

- `fecha`: día del movimiento (AAAA-MM-DD).
- `tipo`: `gasto` o `ingreso`.
- `descripcion`: concepto del movimiento.
- `monto`: valor en pesos colombianos, sin puntos ni separadores.

El balance general del mes se calcula el último día del mes a partir de este archivo:
total de ingresos, total de gastos y saldo (ingresos menos gastos).
