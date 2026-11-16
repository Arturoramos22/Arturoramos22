# Delitos de alto impacto (sin homicidio) en Cúcuta: 7 ago – 16 nov 2026 vs. igual periodo 2025. Datos oficiales de Policía, MinDefensa y Fiscalía

> Notas de investigación (consulta: 16-nov-2026). Las cifras en **negrita** las calculé yo mismo con microdatos oficiales descargados de datos.gov.co (API Socrata) el 16-nov-2026. Son datos preliminares y pueden cambiar en futuras actualizaciones. Ámbito: municipio de Cúcuta (código DANE 54001). El área metropolitana aparece solo como contexto y va rotulada.
>
> **Hallazgo central de cobertura:** ninguna fuente oficial abierta cubre todo el periodo 7-ago a 16-nov-2026.
> - Datasets MinDefensa en datos.gov.co: **corte 30-sep-2026** (actualizados 21-oct-2026). Cubren 7-ago a 30-sep (55 días).
> - Datasets Policía Nacional (DIJIN/DIPON) en datos.gov.co: **corte 31-jul-2026** (actualizados 1-sep-2026). No cubren el periodo; sirven para el acumulado ene-jul y como línea base 2025.
> - SPOA de la Fiscalía ("Procesos Fiscalía – V3"): **corte 31-oct-2026** (actualizado 6-nov-2026). Solo trae mes del hecho, así que la comparación posible es ago-oct.
>
> Para 1-oct/1-nov a 16-nov-2026 no encontré cifras oficiales desagregadas para Cúcuta. **Vacío: no extrapolar.**

## 1. SIEDCO / datos.gov.co: conteos por delito en Cúcuta (periodo 2026 vs 2025, y acumulado del año)

### Takeaway
Con corte al 30-sep-2026, los registros oficiales (MinDefensa/SIEDCO) muestran fuertes alzas entre 7-ago y 30-sep-2026 frente a 2025:
- hurto a personas +69%
- hurto de motos +114%
- violencia intrafamiliar (VIF) +55%
- lesiones personales +53%

En el mismo periodo bajan la extorsión (−42%), el terrorismo (9 → 1) y el hurto de automotores (13 → 6). Comercio, residencias y delitos sexuales suben poco.

Las series mensuales tienen saltos de nivel abruptos en 2026: hurto a personas desde junio, VIF y lesiones desde mayo. El SPOA de la Fiscalía no reproduce esos saltos para VIF. Esto sugiere un posible cambio de registro y no solo más delito. Hay que tratarlo como hipótesis no confirmada.

### Cited Findings

**Fuentes y metodología de extracción**
- Fuentes primarias: datasets de MinDefensa en datos.gov.co, con columnas fecha_hecho, cod_muni, cantidad y fecha máxima 30-sep-2026.
  - Hurto personas — [datos.gov.co 4rxi-8m8d](https://www.datos.gov.co/d/4rxi-8m8d)
  - Hurto a comercio — [7i2x-h5vp](https://www.datos.gov.co/d/7i2x-h5vp)
  - Hurto a residencias — [7mn7-vzqp](https://www.datos.gov.co/d/7mn7-vzqp)
  - Hurto a vehículos (motos y automotores) — [csb4-y6v2](https://www.datos.gov.co/d/csb4-y6v2)
  - Extorsión — [q2ib-t9am](https://www.datos.gov.co/d/q2ib-t9am)
  - Secuestro — [d7zw-hpf4](https://www.datos.gov.co/d/d7zw-hpf4)
  - Lesiones personales — [jr6v-i33g](https://www.datos.gov.co/d/jr6v-i33g)
  - Violencia intrafamiliar — [gepp-dxcs](https://www.datos.gov.co/d/gepp-dxcs)
  - Delitos sexuales — [bz43-8ahq](https://www.datos.gov.co/d/bz43-8ahq)
  - Terrorismo — [yi5j-5fe9](https://www.datos.gov.co/d/yi5j-5fe9)
  - Afectación a miembros de la Fuerza Pública — [8rpn-wpty](https://www.datos.gov.co/d/8rpn-wpty)
- Fecha real del último registro por dataset: extorsión 28-sep, comercio 23-sep, terrorismo 22-sep, secuestro 21-sep, afectación Fuerza Pública 31-ago. Todos se actualizaron el 21-oct-2026.

**Tabla A. Cúcuta (54001), MinDefensa/SIEDCO, por fecha del hecho.** Variaciones y tasas calculadas por mí.

| Delito | 7 ago–30 sep 2025 | 7 ago–30 sep 2026 | Var. | Ene–30 sep 2025 | Ene–30 sep 2026 | Var. YTD | 7 ago–16 nov 2025 (línea base completa) |
|---|---|---|---|---|---|---|---|
| Hurto a personas | 333 | **563** | **+69,1%** | 1.770 | **2.136** | **+20,7%** | 578 |
| Hurto a comercio | 38 | **40** | +5,3% | 270 | **203** | **−24,8%** | 66 |
| Hurto a residencias | 40 | **45** | +12,5% | 194 | **163** | **−16,0%** | 65 |
| Hurto de motocicletas | 85 | **182** | **+114%** | — | — | — | — |
| Hurto de automotores | 13 | **6** | −53,8% | — | — | — | — |
| Hurto vehículos (motos + automotores) | 98 | **188** | **+91,8%** | 530 | **730** | **+37,7%** | 197 |
| Extorsión | 36 | **21** | **−41,7%** | 196 | **183** | −6,6% | 70 |
| Secuestro | 0 | **0** | — | 4 | **2** | −50% | 0 |
| Lesiones personales | 154 | **235** | **+52,6%** | 598 | **864** | **+44,5%** | 301 |
| Violencia intrafamiliar | 244 | **378** | **+54,9%** | 760 | **1.674** | **+120,3%** | 474 |
| Delitos sexuales | 70 | **80** | +14,3% | 286 | **279** | −2,4% | 108 |
| Terrorismo | 9 | **1** | −88,9% | 37 | **14** | −62,2% | 10 |

Fuente: cálculo propio sobre los datasets MinDefensa citados arriba.

**Detalle mensual (Cúcuta, MinDefensa), para ver cambios de nivel**
- Hurto a personas:
  - 2025: ene 215, feb 215, mar 202, abr 209, may 215, jun 162, jul 170, ago 192, sep 190, oct 194, nov 94, dic 125.
  - 2026: ene 142, feb 143, mar 167, abr 128, may 185, **jun 318, jul 397, ago 327, sep 329**.
  - Ene–may 2026 estuvo por debajo de 2025, y desde junio 2026 hay un salto de ~2×.
  - Fuente: [4rxi-8m8d](https://www.datos.gov.co/d/4rxi-8m8d)
- VIF:
  - 2025: ene–jun 41–76/mes, jul–nov 134–157/mes.
  - 2026: ene–abr 126–149/mes, **may–sep 200–240/mes**.
  - Hay dos escalones, en jul-2025 y may-2026.
  - Fuente: [gepp-dxcs](https://www.datos.gov.co/d/gepp-dxcs)
- Lesiones personales:
  - 2025: 54–91/mes.
  - 2026: ene 40, feb 57, mar 65, abr 69, may 96, **jun 126, jul 145, ago 141, sep 125**.
  - Fuente: [jr6v-i33g](https://www.datos.gov.co/d/jr6v-i33g)
- Hurto de vehículos:
  - 2025: 47–77/mes.
  - 2026: abr 92, may 98, jun 93, jul 80, **ago 95, sep 109**.
  - Fuente: [csb4-y6v2](https://www.datos.gov.co/d/csb4-y6v2)
- Extorsión:
  - 2025: ago 17, sep 22, oct 21, nov 22.
  - 2026: **ago 12, sep 11** (los mínimos de la serie 2025-2026).
  - Fuente: [q2ib-t9am](https://www.datos.gov.co/d/q2ib-t9am)
- Delitos sexuales, 7 ago–30 sep 2026, por sexo de la víctima: 54 femenino, 21 masculino, 5 sin establecer (2025: 59, 10 y 1). Fuente: [bz43-8ahq](https://www.datos.gov.co/d/bz43-8ahq)

**Datasets de la Policía Nacional (DIJIN/DIPON), corte 31-jul-2026, Cúcuta, ene–jul 2025 vs ene–jul 2026**
- Hurto motocicletas: 418 vs 521. Hurto automotores: 32 vs 45. Fuente: [Reporte Hurto por Modalidades 9vha-vh9n](https://www.datos.gov.co/d/9vha-vh9n)
- Hurto entidades comerciales: 223 vs 156. Hurto residencias: 152 vs 116. Fuente: [6sqw-8cg5](https://www.datos.gov.co/d/6sqw-8cg5)
- VIF: 491 vs 1.191. Fuente: [vuyt-mqpw](https://www.datos.gov.co/d/vuyt-mqpw)
- Lesiones personales dolosas (arts. 111–119): 432 vs 553. Fuente: [72sg-cybi](https://www.datos.gov.co/d/72sg-cybi)
- Delitos sexuales: 213 vs 184. Fuente: [fpe5-yrmw](https://www.datos.gov.co/d/fpe5-yrmw)
- **Amenazas: 388 vs 437 (+12,6%).**
  - Amenazas 2025 por mes: ago 78, sep 65, oct 49, nov 43. Total 2025: 645. Total 2024: 1.011.
  - Fuente: [Amenazas Policía Nacional meew-mguv](https://www.datos.gov.co/d/meew-mguv)
  - MinDefensa no publica un dataset de amenazas. **No hay cifra oficial abierta de amenazas para ago–nov 2026.**
- Terrorismo (Policía): 8 en ene–jul 2025 y 4 en ene–jul 2026. MinDefensa da cifras mayores: 28 vs 11 en ene–jul y 42 en todo 2025. Las unidades de conteo difieren; ver sección 5.
  - Fuentes: [37p5-impc](https://www.datos.gov.co/d/37p5-impc) y [yi5j-5fe9](https://www.datos.gov.co/d/yi5j-5fe9)
- Coherencia entre fuentes: los totales 2025 coinciden exactamente entre Policía y MinDefensa en VIF (1.162), motos (712), comercio (307), residencias (231) y delitos sexuales (347). Los meses de 2026 en MinDefensa son ligeramente mayores (p. ej. VIF ene–jul 1.249 vs 1.191) porque tienen un corte posterior. Esto ilustra que el dato preliminar crece con cada actualización.
  - Fuentes: [vuyt-mqpw](https://www.datos.gov.co/d/vuyt-mqpw) vs [gepp-dxcs](https://www.datos.gov.co/d/gepp-dxcs)

**Hurto de celulares**
- Ninguno de los datasets abiertos de Policía ni de MinDefensa desagrega el bien hurtado (celular). **No hay cifra oficial abierta de hurto de celulares para Cúcuta en el periodo.** Fuente: revisión de columnas de [4rxi-8m8d](https://www.datos.gov.co/d/4rxi-8m8d)

**Tasas por 100.000 habitantes (cálculo propio)**
- Denominador:
  - 2025: 793.211 habitantes.
  - 2026: 792.180 habitantes.
  - Es la proyección DANE de Cúcuta reproducida por un tercero ([telencuestas.com, Cúcuta 2026](https://telencuestas.com/censos-de-poblacion/colombia/2026/norte-de-santander/san-jose-de-cucuta); [2025](https://telencuestas.com/censos-de-poblacion/colombia/2025/norte-de-santander/san-jose-de-cucuta)). **Hay que verificarla en el anexo oficial de proyecciones municipales del DANE.** No pude consultarlo directamente.
- Tasas del periodo 7 ago–30 sep, no anualizadas (2025 → 2026):

| Delito | 2025 | 2026 |
|---|---|---|
| Hurto a personas | 42,0 | **71,1** |
| Hurto a comercio | 4,8 | **5,0** |
| Hurto a residencias | 5,0 | **5,7** |
| Hurto de motos | 10,7 | **23,0** |
| Hurto de automotores | 1,6 | **0,8** |
| Extorsión | 4,5 | **2,7** |
| Secuestro | 0 | **0** |
| Lesiones personales | 19,4 | **29,7** |
| VIF | 30,8 | **47,7** |
| Delitos sexuales | 8,8 | **10,1** |
| Terrorismo | 1,1 | **0,1** |

- Tasas acumuladas ene–sep (2025 → 2026):

| Delito | 2025 | 2026 |
|---|---|---|
| Hurto a personas | 223,1 | **269,6** |
| Hurto a comercio | 34,0 | **25,6** |
| Hurto a residencias | 24,5 | **20,6** |
| Hurto de vehículos | 66,8 | **92,2** |
| Extorsión | 24,7 | **23,1** |
| Lesiones personales | 75,4 | **109,1** |
| VIF | 95,8 | **211,3** |
| Delitos sexuales | 36,1 | **35,2** |
| Terrorismo | 4,7 | **1,8** |

- Amenazas (Policía), ene–jul: 48,9 (2025) vs 55,2 (2026).

**Cifras de la Policía Metropolitana y la Alcaldía (comunicados, menos verificables)**
- Informe previo de rendición de cuentas de la Policía Metropolitana de Cúcuta (MECUC), vigencia 2025, publicado en mar-2026:
  - Extorsión: 329 casos en 2025 vs 395 en 2024 (−17%).
  - Hurto a personas: 2.714 en 2025 vs 3.207 en 2024 (−15%).
  - Fuente: [policia.gov.co PDF](https://www.policia.gov.co/sites/default/files/2026-03/informe_previo_rendicion_de_cuentas_vigencia_2025_editado.pdf). Cifras tomadas del extracto del buscador; no leí el PDF completo.
  - Ojo: son mayores que las del municipio de Cúcuta en MinDefensa (extorsión 273, hurto a personas 2.183 en 2025). Probablemente reflejan la jurisdicción MECUC, que incluye área metropolitana. **No confirmado.**
- Alcaldía de Cúcuta, 26/27-mar-2026: "reducción del 53% en los casos de extorsión". No da conteos, periodo ni fuente estadística. Fuente: [cucuta.gov.co](https://cucuta.gov.co/cucuta-rompe-el-cerco-de-la-extorsion-reduccion-historica-del-53-marca-un-antes-y-un-despues-en-la-seguridad-de-la-ciudad/)
- Alcaldía de Cúcuta, 21-may-2026, todo "en lo corrido de 2026" y sin corte exacto:
  - "más de mil" capturas en flagrancia.
  - Más de 2.000 armas incautadas.
  - Más de 230 allanamientos.
  - Extorsión −53%.
  - Fuente: [cucuta.gov.co](https://cucuta.gov.co/mas-de-mil-capturados-en-flagrancia-en-lo-corrido-de-2026-cucuta-lidera-resultados-contra-el-delito-a-nivel-nacional/)
- Alcaldía, inicios de 2026 (dos primeros meses): hurtos en todas sus modalidades −5% y extorsión −68%. Fuente: [cucuta.gov.co](https://cucuta.gov.co/cucuta-la-primera-ciudad-capital-en-colombia-con-mayor-reduccion-de-homicidios/). Cifra según el extracto del buscador.
- Prensa: La Opinión informó que, con corte al 29-ene-2026, el área metropolitana registraba 455 hurtos, de ellos 263 a personas. Fuente: [La Opinión](https://www.laopinion.co/cucuta/hurtos-en-cucuta-cifras-en-aumento-y-una-ciudad-en-alerta)

### Inferences
- Los saltos abruptos y sostenidos de jun-2026 (hurto a personas) y may-2026 (VIF y lesiones) no tienen equivalente en el SPOA de la Fiscalía:
  - VIF en el SPOA cae −21% en ago–oct.
  - Hurto en el SPOA sube solo +17%.
  - Esto es compatible con un cambio en la captura o integración de denuncias en SIEDCO, por ejemplo denuncia virtual o integración de noticias criminales. También es compatible con un aumento real.
  - No encontré documento oficial que lo explique. Las variaciones de +55% a +120% deben presentarse con esta advertencia.
- La caída de extorsión es consistente entre fuentes: MinDefensa −42% en el periodo, SPOA −26% en ago–oct y GAULA −37% a mayo (sección 2). Es la tendencia más robusta.
- El hurto de motos es el aumento más plausible como fenómeno real. Sube de forma gradual desde abr-2026, sin un escalón único: 92–109/mes frente a 47–77 en 2025.
- Comparar el periodo de 55 días con la línea base 2025 completa (7 ago–16 nov) no es válido. Para comparaciones parciales usar solo 7 ago–30 sep.

### Gaps
- Sin datos oficiales abiertos para 1-oct a 16-nov-2026 (MinDefensa/SIEDCO) ni para 1-nov a 16-nov-2026 (SPOA).
- No encontré boletines mensuales públicos de la MECUC ni de la Secretaría de Seguridad con corte de octubre o noviembre de 2026.
- Hurto de celulares sin dato oficial abierto.
- Amenazas 2026 posteriores a julio sin dato.
- No pude consultar directamente la plataforma interactiva SIEDCO de policia.gov.co: la página de estadística delictiva no expuso archivos descargables en la consulta.
- La proyección DANE del denominador viene de un sitio secundario.

## 2. Extorsión y secuestro: GAULA Policía/Ejército, Fiscalía, extorsión carcelaria, gota a gota, comerciantes y transportadores

### Takeaway
La extorsión registrada en Cúcuta bajó en todas las fuentes oficiales:
- MinDefensa: 21 vs 36 casos entre 7 ago y 30 sep.
- SPOA: 51 vs 69 noticias criminales en ago–oct.
- GAULA, a mayo: −37% en el área metropolitana.

En el municipio de Cúcuta no hay registros de secuestro en el periodo 2026 según MinDefensa. Sí hay secuestros en el departamento (Ocaña–Cúcuta, El Zulia).

No encontré cifras oficiales específicas sobre extorsión carcelaria, gota a gota o extorsión a transportadores para el periodo.

### Cited Findings
- **Extorsión, MinDefensa, Cúcuta:**
  - 7 ago–30 sep 2026: **21** (2025: 36; **−41,7%**).
  - Ene–sep 2026: **183** (2025: 196; −6,6%).
  - Línea base 7 ago–16 nov 2025: 70.
  - Fuente: [q2ib-t9am](https://www.datos.gov.co/d/q2ib-t9am)
- **Extorsión, SPOA Fiscalía, Cúcuta (noticias criminales por mes del hecho):**
  - Ago–oct 2026: **51** (2025: 69; **−26,1%**).
  - Ene–oct 2026: **247** (2025: 279; −11,5%).
  - Fuente: [Procesos Fiscalía – V3, dbdv-iihs, corte 31-oct-2026](https://www.datos.gov.co/d/dbdv-iihs)
- **Secuestro, MinDefensa, Cúcuta:** 0 casos entre 7 ago y 30 sep en 2025 y en 2026. Ene–sep: 2 en 2026 vs 4 en 2025. Contexto metropolitano: El Zulia registró 1 en sep-2026. Fuente: [d7zw-hpf4](https://www.datos.gov.co/d/d7zw-hpf4)
- **Secuestro, SPOA, Cúcuta:** ago–oct 2026: 4 (2025: 5). Ene–oct 2026: 18 (2025: 33). Fuente: [dbdv-iihs](https://www.datos.gov.co/d/dbdv-iihs)
- **GAULA Metropolitano (prensa con cita oficial, mayo 2026):**
  - 82 denuncias por extorsión en Cúcuta y su área metropolitana, frente a 130 a la misma fecha de 2025 (−37%).
  - Por municipio: 62 en Cúcuta, 7 en Villa del Rosario, 6 en Los Patios.
  - Fuente: [La Opinión](https://www.laopinion.co/region/gaula-reporta-82-denuncias-por-extorsion-en-cucuta-y-su-area-metropolitana). Cifras según el extracto del buscador; el corte exacto no se verificó.
- **Capturas por extorsión (Policía, dataset de capturas, Cúcuta):** 57 en ene–jul 2025 vs 27 en ene–jul 2026 (incluye todos los artículos con "extorsión"). Fuente: [Reporte Capturas Policía Nacional 3jdh-nmwu](https://www.datos.gov.co/d/3jdh-nmwu)
- **Operativo GAULA, ago-2026 (prensa):** el GAULA Militar y el GAULA de la Policía Metropolitana capturaron en flagrancia a cinco presuntos integrantes del Tren de Aragua mientras cobraban extorsiones en La Parada (Villa del Rosario, área metropolitana). Incautaron un millón de pesos y tres celulares. Fuente: [Cambio](https://cambiocolombia.com/conflicto-armado-en-colombia/articulo/2026/8/capturan-a-cinco-presuntos-integrantes-del-tren-de-aragua-por-extorsion-en-norte-de-santander). Según el extracto del buscador; la página no se abrió.
- **Comerciantes:** comunicados sin fecha de la Policía describen capturas de presuntos integrantes de "AK-47". Les cobraban a comerciantes de Cúcuta y su área de 3 a 5 millones de pesos mensuales. Fuente: [policia.gov.co](https://www.policia.gov.co/noticia/policia-nacional-ataca-extorsion-en-ciudad-cucuta). **No se pudo fechar en el periodo.**
- **Secuestro en el corredor departamental (contexto, no es el municipio de Cúcuta):**
  - El 18-ago-2026, en la vía Ocaña–Cúcuta, sector La Curva, fueron secuestrados tres miembros de la Dijín y una civil. Se atribuye al ELN.
  - Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)

### Inferences
- Las tres fuentes oficiales coinciden en la dirección de la extorsión: a la baja.
- La caída en capturas por extorsión (ene–jul) y en denuncias puede reflejar menos hechos o menos denuncia. La ECSC muestra que la denuncia en Cúcuta es baja (sección 5).
- Gota a gota y extorsión carcelaria suelen registrarse dentro de "extorsión" o "constreñimiento ilegal" y no se pueden separar en los datos abiertos.
- Dato relacionado: en el SPOA, "Constreñimiento ilegal art. 182" sumó 192 noticias en Cúcuta en ago–oct 2026. Fuente: [dbdv-iihs](https://www.datos.gov.co/d/dbdv-iihs)

### Gaps
- No encontré boletín del GAULA Militar Norte de Santander ni del GAULA Policía con corte posterior a mayo de 2026.
- Sin cifras oficiales sobre extorsión carcelaria, gota a gota ni extorsión a transportadores en el periodo.
- Sin cifras de secuestro por la Fiscalía Seccional para 2026 diferenciadas por modalidad (extorsivo o simple).

## 3. Fiscalía General de la Nación: noticias criminales, capturas, judicialización e impunidad

### Takeaway
El SPOA abierto (corte 31-oct-2026) permite comparar ago–oct 2026 con ago–oct 2025 en Cúcuta:
- Hurto: +16,6%.
- VIF: −21,4%.
- Amenazas: −17,7%.
- Extorsión: −26,1%.
- Lesiones: +4,3%.
- Delitos sexuales: +3,0%.

Proxy de judicialización: solo ~3,9% de las noticias criminales de hechos de 2025 en Cúcuta habían pasado a juicio o ejecución de penas al 31-oct-2026. El 95,4% seguía en indagación.

La operación más grande del periodo fue "Némesis" (3-4 nov 2026), con 111 capturados y un menor aprehendido.

### Cited Findings

**Tabla B. SPOA Fiscalía, Cúcuta (cod. DANE hecho 54001), noticias criminales Ley 906 por mes del hecho.** Fuente: [Procesos Fiscalía – V3 (dbdv-iihs), corte 31-oct-2026, actualizado 6-nov-2026](https://www.datos.gov.co/d/dbdv-iihs). Agrupación y cálculo propios.

| Grupo de delito (SPOA) | Ago–oct 2025 | Ago–oct 2026 | Var. | Ene–oct 2025 | Ene–oct 2026 | Var. |
|---|---|---|---|---|---|---|
| Hurto (todas las modalidades, incl. hurto por medios informáticos) | 1.448 | **1.689** | +16,6% | 4.487 | **5.727** | +27,6% |
| Extorsión | 69 | **51** | −26,1% | 279 | **247** | −11,5% |
| Secuestro | 5 | **4** | −20,0% | 33 | **18** | −45,5% |
| Lesiones personales dolosas | 323 | **337** | +4,3% | 1.040 | **1.071** | +3,0% |
| Violencia intrafamiliar | 777 | **611** | −21,4% | 2.388 | **2.337** | −2,1% |
| Delitos sexuales (acceso carnal, actos sexuales, acoso, pornografía con menores) | 132 | **136** | +3,0% | 449 | **376** | −16,3% |
| Amenazas | 345 | **284** | −17,7% | 1.060 | **1.002** | −5,5% |
| Terrorismo | 13 | **8** | −38,5% | 57 | **28** | −50,9% |

- Tasas SPOA por 100.000 habitantes en ago–oct (2025 → 2026), mismo denominador DANE de la sección 1:

| Delito | 2025 | 2026 |
|---|---|---|
| Hurto | 182,5 | 213,2 |
| Extorsión | 8,7 | 6,4 |
| Lesiones | 40,7 | 42,5 |
| VIF | 98,0 | 77,1 |
| Delitos sexuales | 16,6 | 17,2 |
| Amenazas | 43,5 | 35,9 |
| Terrorismo | 1,6 | 1,0 |

- Delitos más frecuentes en Cúcuta, ago–oct 2026 (SPOA): VIF 607; hurto menor cuantía 509; hurto calificado menor cuantía 477; estafa 456; estupefacientes 287; falsedad personal 247; hurto por medios informáticos 222; lesiones art. 111 211; amenazas 203; constreñimiento ilegal 192. Fuente: [dbdv-iihs](https://www.datos.gov.co/d/dbdv-iihs)
- **Proxy de judicialización/impunidad (cálculo propio):**
  - Todas las noticias de hechos de 2025 en Cúcuta: 25.832. Indagación 24.652 (95,4%), investigación 170, juicio 643, ejecución de penas 367. Juicio + ejecución = **3,9%**.
  - Extorsión 2025: 347 noticias, de ellas 36 en juicio o ejecución (**10,4%**).
  - Hurto 2025: 5.427 noticias, de ellas 269 en juicio o ejecución (**5,0%**).
  - Estado de las noticias de ago–oct 2025: 3.122 inactivas y 3.727 activas.
  - Fuente: [dbdv-iihs](https://www.datos.gov.co/d/dbdv-iihs)
- **Operación Némesis (Fiscalía + Bosur), 3-4 nov 2026:**
  - 111 capturados y un menor aprehendido.
  - Siete estructuras: ELN, Tren de Aragua, La Familia P, Los Turcos, Los Mexicanos, Los Manilargos y Los de la F.
  - Fuentes: [Asuntos Legales, 4-nov-2026](https://www.asuntoslegales.com.co/actualidad/fiscalia-capturo-a-111-personas-y-aprehendio-a-un-menor-senalado-de-integrar-siete-estructuras-criminales-4517742); [Publimetro, 4-nov-2026](https://www.publimetro.co/noticias/2026/11/04/golpe-al-eln-y-al-tren-de-aragua-en-cucuta-111-capturados-y-graves-delitos-detras-de-siete-estructuras-criminales/)
  - Según el balance de la Fiscalía citado en prensa: 58 allanamientos en ocho comunas de Cúcuta, Villa del Rosario, San Cayetano y La Parada.
  - Según La Opinión: 59 órdenes de allanamiento, 69 capturas en flagrancia y 41 por orden judicial.
  - Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)
  - Discrepancia: 58 vs 59 allanamientos.
- **Capturas (Policía, dataset de capturas, Cúcuta, corte 31-jul-2026):**
  - Ene–jul 2025: 1.872. Ene–jul 2026: **2.184 (+16,7%)**.
  - Línea base 7 ago–16 nov 2025: **708**.
  - Por conducta, ene–jul 2026: estupefacientes 912, hurto a personas 262, armas de fuego 260, VIF 131, lesiones 105, extorsión 23 (art. 244).
  - Fuente: [3jdh-nmwu](https://www.datos.gov.co/d/3jdh-nmwu)
  - **No hay dato oficial abierto de capturas para ago–nov 2026.**
- **Otros resultados con Fiscalía en el periodo (prensa):** en ago-2026, la MECUC, la Brigada 30 y la Fiscalía capturaron a siete presuntos "mandaderos" del Frente Urbano Carlos Germán Velasco Villamizar del ELN. Según el extracto del buscador; sin URL primaria verificada.

### Inferences
- En el SPOA, el hurto sube y la VIF baja en ago–oct 2026. En MinDefensa/SIEDCO, en cambio, la VIF sube +55% y el hurto a personas +69% en 7 ago–30 sep.
  - Las dos bases tienen unidades distintas: noticia criminal vs. víctima o caso registrado por la Policía.
  - También difieren en cortes y fechas: mes del hecho vs. fecha del hecho.
  - La divergencia en VIF es grande y debe reportarse explícitamente.
- La proporción de noticias en juicio o ejecución (~4%) no es una tasa de impunidad formal. Las noticias de 2025 tienen menos de 22 meses de maduración y muchas se archivan legítimamente. Sirve como proxy de baja judicialización.

### Gaps
- No encontré datos abiertos de la Fiscalía con imputaciones, condenas o estructuras desarticuladas por seccional para el periodo.
- Tampoco encontré boletines de la Seccional Norte de Santander con balance ago–nov 2026.
- El SPOA abierto no trae día del hecho, así que no se puede cortar en 7-ago ni en 16-nov.

## 4. Atentados con explosivos, granadas y drones en Cúcuta y el área metropolitana (periodo)

### Takeaway
En el periodo hubo al menos tres hechos con explosivos de alto perfil en la zona:
- Carro bomba contra la estación de Policía de Los Patios, 31-ago-2026 (área metropolitana).
- Incidente con explosivos cerca de la cárcel Modelo de Cúcuta, ~7-oct-2026, según el alcalde.
- Explosivo junto a la sede de la DIAN en El Escobal, Cúcuta, 27-oct-2026.

Pese a ello, el registro oficial de "terrorismo" para el municipio de Cúcuta bajó: 1 caso en 7 ago–30 sep 2026 vs 9 en 2025. Con un corte al 22-sep, el dataset no alcanza los hechos de octubre.

### Cited Findings
- **31-ago-2026, Los Patios (área metropolitana):**
  - Carro bomba contra la estación de Policía.
  - Saldo: un civil muerto (Jhon Sandoval Sepúlveda), nueve civiles heridos y dos policías heridos.
  - La prensa lo atribuye al ELN sin citar fuente oficial.
  - Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)
  - Otra fuente habla de 11 heridos y una recompensa de hasta $200 millones: [Cambio, ago-2026](https://cambiocolombia.com/conflicto-armado-en-colombia/articulo/2026/8/ataque-con-explosivos-contra-la-policia-en-norte-de-santander-deja-11-heridos-ofrecen-hasta-200-millones-de-recompensa-por-informacion-de-los-responsables). Según el extracto del buscador.
- **1-sep-2026:** consejo de seguridad extraordinario del presidente en la Brigada 30 (Cúcuta). Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)
- **27-oct-2026, El Escobal (Cúcuta), detrás de la sede de la DIAN y cerca del puente Francisco de Paula Santander:**
  - Heridos: las cifras varían por medio. Se reportan seis (cuatro civiles y dos policías), siete, o "cuatro uniformados".
  - El secretario de Seguridad departamental, Jorge Quintero, explicó la ubicación del artefacto.
  - Gobernación y Alcaldía ofrecieron hasta $50 millones de recompensa.
  - Fuentes: [Vanguardia, 28-oct-2026](https://www.vanguardia.com/colombia/2026/10/28/se-pudo-haber-evitado-los-rastros-del-atentado-explosivo-en-la-frontera-de-cucuta-con-urena/); [Diario del Sur](https://diariodelsur.com.co/noticias/atentado-con-explosivos-en-cucuta-deja-dos-policias-y-cuatro-civiles-heridos); [El Diario, 27-oct-2026](https://eldiario.com/2026/10/27/heridos-explosion-frontera-colombia-venezuela/)
- **~7-oct-2026, cárcel Modelo de Cúcuta:** el alcalde Jorge Acevedo mencionó un incidente con explosivos cerca de la cárcel unos 20 días antes del atentado de la DIAN. Fuente: prensa citada en los resultados sobre el 27-oct, a partir del extracto del buscador. **Sin URL primaria ni comunicado oficial.**
- **Contexto previo al periodo:** camión bomba en Cúcuta el 1-ago-2026. Fuente: [El Heraldo, 1-ago-2026](https://www.elheraldo.co/colombia/2026/08/01/identifican-a-los-heridos-que-dejo-la-explosion-de-un-camion-bomba-en-cucuta/)
- **Registro oficial de terrorismo, MinDefensa:**
  - Cúcuta, 7 ago–30 sep 2026: **1** (2025: 9). Ago-2026 completo: 3. Ene–sep 2026: 14 (2025: 37).
  - Los Patios, 7 ago–30 sep 2026: **3** (2025: 0). Es contexto metropolitano.
  - Último registro del dataset: 22-sep-2026.
  - Fuente: [yi5j-5fe9](https://www.datos.gov.co/d/yi5j-5fe9)
- **Afectación a miembros de la Fuerza Pública, MinDefensa:** 9 en Cúcuta en ago-2026 y 7 en Los Patios en 7 ago–30 sep 2026. Último registro: 31-ago-2026. Fuente: [8rpn-wpty](https://www.datos.gov.co/d/8rpn-wpty)
- **Drones:**
  - La ONG Corporeddeh contó 33 ataques con drones en Norte de Santander desde el 7-ago-2026, frente a 20 entre enero y el 7-ago.
  - Uno de los ocho municipios afectados está en el área metropolitana de Cúcuta, sin precisar cuál. Es fuente ONG.
  - No encontré ataques con dron dentro del municipio de Cúcuta.
  - Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)
- **Respuesta institucional:** el 3-nov-2026 se activaron la Operación Esparta y el Bloque de Seguridad Urbano (Bosur), con ~1.500 efectivos del Ejército y la Policía. Fuente: [La Opinión, 15-nov-2026](https://laopinion.co/region/bombardeos-y-ataques-con-drones-el-saldo-de-violencia-que-dejan-los-100-dias-de-de-la)

### Inferences
- La caída del registro oficial de terrorismo en Cúcuta no es coherente con la percepción de escalada. Hay tres razones:
  - El corte (22-sep) excluye los hechos de octubre.
  - El hecho grave de agosto ocurrió en Los Patios, no en Cúcuta.
  - El pico de jul-ago 2025 (19 registros) eleva la base.

### Gaps
- No encontré comunicados oficiales de Policía, Ejército, Fiscalía o MinDefensa con conteo consolidado de atentados en Cúcuta para ago–nov 2026.
- Las cifras de heridos del 27-oct no están verificadas oficialmente.
- No hay datos sobre granadas en Cúcuta en el periodo.

## 5. Advertencias metodológicas, subregistro y fuentes de MinDefensa/DANE

### Takeaway
Los datos de SIEDCO y MinDefensa son preliminares, van por fecha del hecho y crecen en cada actualización. Además muestran saltos de nivel en 2026 que pueden reflejar cambios de registro.

La ECSC 2024 del DANE (periodo de referencia 2023) da para Cúcuta:
- victimización 10,6%;
- **tasa de denuncia 24,9%**, una de las más bajas de las 13 ciudades;
- es decir, ~3 de cada 4 delitos no se denuncian.

### Cited Findings
- **ECSC 2024 (DANE, boletín del 20-nov-2025, referencia ene–dic 2023):**
  - Cúcuta: victimización de la población de 15 años y más 10,6% (+1,7 pp vs 2021, no significativa); hurto a residencias 3,4%; hurto a personas 3,6%; hurto a vehículos 5,4% (entre propietarios).
  - **Tasa de denuncia en Cúcuta: 24,9%** (+3,1 pp vs 2021, no significativa), penúltima de 13 ciudades, solo por encima de Ibagué (24,0%). Bogotá tiene 43,1%.
  - Nacional: denuncia 30,8% y cifra oculta 69,2%.
  - Fuente: [DANE, Boletín técnico ECSC 2024](https://www.dane.gov.co/files/operaciones/ECSC/bol-ECSC-2024.pdf)
  - No encontré una ECSC 2025 publicada a la fecha de consulta.
- Dato histórico: en la ECSC 2012, la denuncia en Cúcuta era del 18,3%. Fuente: [DANE ECSC 2012 Cúcuta](https://www.dane.gov.co/files/investigaciones/poblacion/convivencia/ECSC2012_Cucuta.pdf). Según el extracto del buscador.
- **SIEDCO:**
  - Un registro entra a SIEDCO cuando surge una noticia criminal a partir de una denuncia y se cruza con la Fiscalía vía SPOA.
  - Homicidio es el delito mejor medido. Hurto, extorsión, secuestro, lesiones y VIF dependen de la denuncia y tienen subregistro.
  - La Policía atribuía el aumento de denuncias de VIF a la denuncia virtual.
  - Fuente: [La Opinión, 25-oct-2020](https://laopinion.co/cucuta/las-cifras-de-seguridad-en-cucuta-que-tan-confiables-son). Es de 2020; sirve como contexto metodológico.
- **Dato preliminar que cambia:** el mismo mes de 2026 tiene valores distintos según el corte. VIF ene–jul 2026: 1.191 en Policía (corte 31-jul) y 1.249 en MinDefensa (corte 30-sep). Fuentes: [vuyt-mqpw](https://www.datos.gov.co/d/vuyt-mqpw) y [gepp-dxcs](https://www.datos.gov.co/d/gepp-dxcs)
- **Unidades distintas:**
  - SPOA = noticia criminal (proceso), por mes del hecho, Ley 906, con corte al último día del mes. Fuente: [descripción del dataset dbdv-iihs](https://www.datos.gov.co/d/dbdv-iihs)
  - MinDefensa/Policía = casos o víctimas con columna "cantidad".
  - Terrorismo en 2025: Policía da 8 y MinDefensa 42. La metodología no está documentada en los datasets.
- **MinDefensa "Logros de la Política de Defensa":** los datasets de datos.gov.co (corte 30-sep-2026) son la fuente abierta de MinDefensa. No consulté el PDF de "Logros" ni el Observatorio de DDHH para Norte de Santander.
- **Alcaldía:** sus porcentajes (extorsión −53% o −68%, hurtos −5%) carecen de periodo y conteos. No son verificables. Fuentes: [cucuta.gov.co, mar-2026](https://cucuta.gov.co/cucuta-rompe-el-cerco-de-la-extorsion-reduccion-historica-del-53-marca-un-antes-y-un-despues-en-la-seguridad-de-la-ciudad/); [cucuta.gov.co, may-2026](https://cucuta.gov.co/mas-de-mil-capturados-en-flagrancia-en-lo-corrido-de-2026-cucuta-lidera-resultados-contra-el-delito-a-nivel-nacional/)

### Inferences
- Con una tasa de denuncia del ~25%, los registros administrativos de Cúcuta captarían aproximadamente uno de cada cuatro delitos que sufre la población. Es una inferencia gruesa: la ECSC mide personas victimizadas, no eventos, y el dato es de 2023.
- Un aumento de denuncia (por ejemplo, por campañas o canales virtuales como "A Denunciar") puede verse como aumento de delito.
- Para hurto a personas, VIF y lesiones en 2026 conviene presentar rangos o la triangulación SIEDCO vs. SPOA, no una sola cifra.
- Para comparar ago–nov 2026 con 2025 de forma estricta, la única ventana común con día exacto es 7 ago–30 sep (MinDefensa). La ventana mensual es ago–oct (SPOA).

### Gaps
- No encontré nota técnica oficial que explique los saltos de nivel de 2026 en hurto a personas, VIF y lesiones en Cúcuta.
- No hay tasa de denuncia por delito para Cúcuta en el boletín ECSC 2024; quizá esté en los anexos, que no consulté.
- No consulté el informe "Logros de la Política de Defensa y Seguridad" ni el Observatorio de DDHH/DIH de MinDefensa para Norte de Santander en este periodo.
- No encontré información específica sobre el efecto de "A Denunciar" en Cúcuta en 2026.
