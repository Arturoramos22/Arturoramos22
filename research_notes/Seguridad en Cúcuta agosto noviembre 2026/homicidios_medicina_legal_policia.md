# Homicidios y muertes violentas en Cúcuta, 7 ago – 16 nov 2026 vs. mismo periodo 2025 (Medicina Legal, Policía/MinDefensa, DANE)

Nota de método general (léase primero):
- Los conteos de Policía de este documento los calculé yo directamente desde el dataset abierto oficial "HOMICIDIO" del Ministerio de Defensa / Policía Nacional (SIEDCO) en datos.gov.co, id `m8fd-ahd9`. La consulta API se hizo el 16-nov-2026. Último registro del dataset: **30-sep-2026**; metadatos actualizados el 21-oct-2026. URL del dataset: https://www.datos.gov.co/d/m8fd-ahd9 ; API: https://www.datos.gov.co/resource/m8fd-ahd9.json. El dataset trae fecha, municipio, zona, sexo, arma, modalidad y caracterización SPOA. **No trae edad, nacionalidad ni barrio/comuna.**
- Los conteos de Medicina Legal los calculé desde el dataset abierto oficial del INMLCF "Lesiones fatales de causa externa – Información preliminar – enero de 2025 a julio de 2026", id `2kpj-cktv`, actualizado el 21-sep-2026 (https://www.datos.gov.co/d/2kpj-cktv). Llega **solo hasta julio de 2026**, así que no cubre nada posterior al 7-ago-2026. Solo tiene mes, no día, así que no permite cortar en el 7 de agosto.
- Los boletines estadísticos mensuales en PDF del INMLCF (patrón https://www.medicinalegal.gov.co/documents/20143/1273727/Boletin_<mes>_2026.pdf) **no se pudieron consultar**: julio, agosto, septiembre y octubre de 2026 (y ago–oct 2025) devolvieron HTTP 403 por un challenge de Cloudflare, tanto con curl como con WebFetch. Están indexados en buscadores los de enero y abril de 2026 (https://www.medicinalegal.gov.co/documents/20143/1273727/Boletin_enero_2026.pdf, https://www.medicinalegal.gov.co/documents/20143/1273727/Boletin_abril_2026.pdf), pero tampoco se pudo leer su contenido.
- La página de estadística delictiva de policia.gov.co (https://www.policia.gov.co/grupo-informaci%C3%B3n-criminalidad/estadistica-delictiva) devolvió **HTTP 404** el 16-nov-2026.
- Población: DANE, PPED "actualizadas con información posterior a la pandemia de COVID-19", archivo municipal por área 2018-2042, "Actualizado el 30 de Julio de 2025" (https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Municipal/PPED-AreaMun-2018-2042_VP.xlsx, enlazado desde https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion).
- Contexto: el 7-ago-2026 es la fecha de posesión del presidente Abelardo de la Espriella. Infobae cita a Indepaz llamando a la masacre del 15-ago-2026 "la segunda masacre desde que asumió Abelardo de la Espriella" — [Infobae, 16-ago-2026](https://www.infobae.com/colombia/2026/08/16/tres-muertos-y-cuatro-heridos-en-nueva-masacre-registrada-en-cucuta/).

---

## 1. Cifras de Medicina Legal (INMLCF): lesiones fatales en Cúcuta / Norte de Santander, 2026 vs 2025

### Takeaway
Los datos oficiales de Medicina Legal accesibles solo llegan a **julio de 2026** (dataset preliminar del 21-sep-2026). **No hay cifra del INMLCF para el periodo posterior al 7-ago-2026.** Entre enero y julio, Medicina Legal registra **165 presuntos homicidios en Cúcuta en 2026, frente a 191 en 2025 (−13,6 %)**. Agosto y septiembre de 2025, la línea base de la comparación, suman 76 homicidios (47 + 29).

### Cited Findings
Fuente de todas las cifras de esta sección, salvo que se diga otra cosa: dataset INMLCF `2kpj-cktv`, "Información preliminar", enero 2025 a julio 2026, actualizado el 21-sep-2026, filtrado por código DANE de municipio del hecho 54001 — [INMLCF / datos.gov.co](https://www.datos.gov.co/d/2kpj-cktv). Conteos por registro (una fila = una víctima).

**Cúcuta (54001) – presuntos homicidios por mes (INMLCF, preliminar)**

| Mes | 2025 | 2026 |
|---|---|---|
| Ene | 24 | 21 |
| Feb | 28 | 18 |
| Mar | 19 | 24 |
| Abr | 17 | 31 |
| May | 45 | 30 |
| Jun | 32 | 28 |
| Jul | 26 | 13 |
| **Ene–Jul** | **191** | **165** |
| Ago | 47 | sin dato (dataset termina en julio) |
| Sep | 29 | sin dato |
| Oct | 27 | sin dato |
| Nov | 38 | sin dato |
| Dic | 30 | sin dato |
| **Año 2025** | **362** | — |

- Agosto + septiembre de 2025: 76 presuntos homicidios; agosto–diciembre de 2025: 171. — [INMLCF datos.gov.co 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)

**Cúcuta – otras lesiones fatales de causa externa (INMLCF, preliminar)**
- Muertes por eventos de transporte: 2025 = 129 (ene–jul 72; ago 12, sep 10, oct 12, nov 12, dic 11). 2026 ene–jul = 77 (5, 11, 15, 14, 10, 16, 6). — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Suicidios: 2025 = 33 (ene–jul 20; ago 7, sep 1). 2026 ene–jul = 14. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Muertes accidentales: 2025 = 26 (ene–jul 15; ago 0, sep 9). 2026 ene–jul = 20. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- El dataset no tiene filas de "indeterminadas" para Norte de Santander. Las maneras de muerte presentes son: homicidio 1.235, transporte 464, accidentales 160, suicidios 131, en total 1.990 registros para el departamento entre ene-2025 y jul-2026. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)

**Perfil de las víctimas de homicidio en Cúcuta (INMLCF)**
- **Nacionalidad (país de nacimiento):** ene–jul 2026: Colombia 135, **Venezuela 25 (15,2 %)**, sin información 5. Ene–jul 2025: Colombia 152, **Venezuela 31 (16,2 %)**, sin información 8. Ago–sep 2025: Colombia 63, Venezuela 12, sin información 1. Año 2025: Colombia 294, **Venezuela 58 (16,0 %)**, sin información 10. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- **Sexo:** ene–jul 2026: 156 hombres, 9 mujeres. Ene–jul 2025: 173 hombres, 18 mujeres. Año 2025: 329 hombres, 31 mujeres, 2 indeterminados. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- **Mecanismo:** ene–jul 2026: proyectil de arma de fuego 148 (89,7 %), cortopunzante 8, generadores de asfixia 3, cortocontundente 3, contundente 2, cortante 1. Ene–jul 2025: arma de fuego 168, cortopunzante 18, contundente 3, explosivo 2. Ago–sep 2025: arma de fuego 63, cortopunzante 4, contundente 3, por determinar 3, cortocontundente 2, cortante 1. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- **Edad / ciclo vital:** ene–jul 2026: adultez (29–59) 78, juventud (18–28) 74, adolescencia (12–17) 6, adulto mayor 5, infancia (6–11) 1, primera infancia (0–5) 1. Menores de 18 años: 8 en 2026 frente a 6 en ene–jul 2025, y 14 en todo 2025. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- **Zona:** los homicidios en zona rural o centro poblado de Cúcuta pasaron de 6 en ene–jul 2025 a 24 en ene–jul 2026 (rural 19 + centro poblado 5). — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- **Circunstancia:** ene–jul 2026: "Sicariato" 48, "Sin información" 96, ajuste de cuentas 5, riña 3, violencia entre familiares 3, hurto 2, feminicidio 2. Presunto agresor "Policía": 3. En ene–jul 2025 "Sicariato" figuraba solo 9 veces y "Sin información" 167, lo que refleja un cambio de codificación más que un cambio real. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)

**Área metropolitana (6 municipios: Cúcuta, Villa del Rosario, Los Patios, El Zulia, San Cayetano, Puerto Santander) – INMLCF, presuntos homicidios**
- 2025: 468 (ene–jul 250; ago 57, sep 33, oct 35, nov 51, dic 42). 2026 ene–jul: 235 (27, 32, 34, 46, 39, 36, 21). — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Muertes por transporte en el área metropolitana: 2025 = 177; ene–jul 2026 = 113. Suicidios: 2025 = 45; ene–jul 2026 = 16. — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)

**Contexto oficial anterior:** las cifras definitivas del INMLCF solo llegan a 2024: "Presuntos Homicidios. Colombia, 2015 a 2024. Cifras definitivas", dataset `vtub-3de2`, actualizado el 19-sep-2025 — [INMLCF / datos.gov.co](https://www.datos.gov.co/d/vtub-3de2).

### Inferences
- Comparado con el dataset de Policía, el INMLCF registra algo más de homicidios en Cúcuta: 362 frente a 344 en 2025 (+18; +5,2 %) y 165 frente a 162 en ene–jul 2026. Ver la sección 6.
- Medicina Legal confirma la tendencia a la baja de ene–jul (−13,6 %), parecida a la de Policía (−8,5 % en ene–jul: 162 frente a 177).
- Julio de 2026 (13 homicidios según INMLCF) es el mes más bajo de la serie 2025–2026. Esto deja un punto de partida bajo justo antes del 7-ago.

### Gaps
- **No hay cifras del INMLCF para agosto, septiembre, octubre ni noviembre de 2026.** Los boletines mensuales PDF estaban bloqueados (403) y el dataset abierto termina en jul-2026. Hay que consultar a mano en medicinalegal.gov.co los boletines de agosto y septiembre de 2026; el de octubre normalmente se publica a mediados o finales de noviembre.
- Faltan las cifras del INMLCF por día; el dataset solo da mes. No se puede calcular un "7-ago a X" exacto con Medicina Legal.
- No se pudo verificar la fecha de corte que declaran los boletines PDF. Como norma general, el INMLCF publica cifras "preliminares" sujetas a cambio, pero no pude citar el texto exacto del boletín de 2026.

---

## 2. Cifras de Policía Nacional (SIEDCO / MinDefensa, datos.gov.co): Cúcuta, 7 ago – 30 sep 2026 vs 2025

### Takeaway
Con datos oficiales de Policía hasta el **30-sep-2026**, Cúcuta registró **49 homicidios entre el 7-ago y el 30-sep-2026, frente a 59 en el mismo periodo de 2025 (−16,9 %)**. En lo corrido del año (ene–sep) son **212 en 2026 frente a 246 en 2025 (−13,8 %)**. Para octubre y noviembre de 2026 no hay datos oficiales desagregados. La única cifra oficial posterior es un acumulado de la Policía Metropolitana citado por Semana: **237 en 2026 frente a 265 en 2025**, sin fecha de corte explícita (artículo del 31-oct-2026).

### Cited Findings
Fuente de las tablas: dataset "HOMICIDIO" de MinDefensa / Policía Nacional `m8fd-ahd9`, cálculos propios, con datos hasta el 30-sep-2026 y metadatos actualizados el 21-oct-2026 — [MinDefensa/Policía – datos.gov.co](https://www.datos.gov.co/d/m8fd-ahd9). Definición del dataset: "Es toda muerte que fuere causada por otra persona por cualquier tipo de elemento. (Se mide en víctimas). Incluye: HOMICIDIO INTENCIONAL". Por eso **excluye homicidios en accidente de tránsito**, que van en un dataset aparte.

**Periodo de estudio, Cúcuta (54001)**

| Periodo | 2025 | 2026 | Var. |
|---|---|---|---|
| 7 ago – 31 ago | 33 | 28 | −15,2 % |
| 1 sep – 30 sep | 26 | 21 | −19,2 % |
| **7 ago – 30 sep** | **59** | **49** | **−16,9 %** |
| 1 oct – 16 nov | 48 (2025) | **sin dato oficial** | — |
| 7 ago – 16 nov | 107 (2025) | **sin dato oficial** | — |

**Serie mensual completa, Cúcuta, Policía**

| Mes | 2024 | 2025 | 2026 |
|---|---|---|---|
| Ene | 23 | 26 | 20 |
| Feb | 15 | 25 | 20 |
| Mar | 20 | 19 | 21 |
| Abr | 26 | 14 | 30 |
| May | 29 | 42 | 29 |
| Jun | 38 | 28 | 26 |
| Jul | 17 | 23 | 16 |
| Ago | 25 | 43 | 29 |
| Sep | 20 | 26 | 21 |
| Oct | 27 | 25 | sin dato |
| Nov | 22 | 39 | sin dato |
| Dic | 29 | 34 | sin dato |
| **Total** | **291** | **344** | **212 (ene–sep)** |

- Ene–sep 2025: 246; ene–sep 2026: 212. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Acumulado 2025 a fechas de octubre: 248 al 5-oct, 252 al 10-oct, 254 al 15-oct, 260 al 20-oct, 264 al 25-oct y 271 al 31-oct-2025. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Distribución diaria, 7-ago a 30-sep-2026: 33 días con al menos un homicidio. Picos: 15-ago (4), 29-ago (4), 12-ago (3), 17-ago (3). — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

**Desagregaciones, Cúcuta, 7 ago – 30 sep (Policía)**
- **Arma / medio:** 2026: arma de fuego 41 (83,7 %), arma blanca/cortopunzante 6, contundente 1, artefacto explosivo 1. 2025: arma de fuego 50 (84,7 %), arma blanca 6, contundente 3. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **Sexo:** 2026: 43 hombres, 6 mujeres. 2025: 55 hombres, 4 mujeres. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **Modalidad presunta:** 2026: sicariato 35 (71 %), riñas 6, "atacados por GAO o GAO-R" 5, terrorismo 1, violencia intrafamiliar 1, por establecer 1. 2025: sicariato 49 (83 %), riñas 5, atraco 2, GAO 2, tortura 1. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **Zona:** 2026: urbana 44, rural 5. 2025: urbana 56, rural 3. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **Caracterización SPOA:** 2026: 48 homicidios intencionales y **1 feminicidio** (11-ago-2026, arma blanca, violencia intrafamiliar). 2025: 59 homicidios intencionales y 0 feminicidios. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

**Desagregaciones, Cúcuta, ene–sep (año corrido, Policía)**
- Arma: 2026: fuego 185, blanca 21, contundente 5, explosivo 1. 2025: fuego 210, blanca 27, contundente 7, explosivo 2. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Sexo: 2026: 194 hombres, 18 mujeres. 2025: 225 hombres, 21 mujeres. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Modalidad: 2026: sicariato 137, **atacados por GAO/GAO-R 38**, riñas 17, atraco 10. 2025: sicariato 197, GAO 8, riñas 24, atraco 9, desmembramiento 3. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Homicidios "atacados por GAO" en Cúcuta por mes en 2026: ene 2, feb 5, mar 3, abr 9, may 2, jun 8, jul 4, ago 5, sep 0. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Zona: 2026: **rural 37** de 212 (17,5 %). 2025: rural 9 de 246 (3,7 %). — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Feminicidios (SPOA) en Cúcuta: 3 en ene–sep 2026 y 0 en ene–sep 2025. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

**Área metropolitana, 7 ago – 30 sep (Policía)**
- Seis municipios: 2026 = 60 frente a 2025 = 72 (−16,7 %). — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Por municipio, 2025 → 2026: Cúcuta 59 → 49; Villa del Rosario 3 → 2; Los Patios 1 → 4; El Zulia 8 → 5; San Cayetano 0 → 0; Puerto Santander 1 → 0. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- Área metropolitana por año: 2024 = 388; 2025 = 444; ene–sep 2026 = 294 (ene–sep 2025 = 314). — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

**Norte de Santander (contexto, Policía, departamento completo)**
- 2025 por mes: 88, 56, 73, 49, 80, 74, 63, **71 (ago)**, **46 (sep)**, 58, 73, 62. 2026: 43, 55, 48, 61, 73, 60, 44, **62 (ago)**, **50 (sep)**. — [m8fd-ahd9 (consulta agregada cod_depto=54)](https://www.datos.gov.co/d/m8fd-ahd9)

**Muertes en tránsito según Policía (dataset aparte)**
- "HOMICIDIO EN ACCIDENTE DE TRÁNSITO" (MinDefensa, `uav5-b85g`, actualizado el 21-oct-2026), Cúcuta: 7-ago a 30-sep-2026 = **37**; mismo periodo de 2025 = 32. Ene–sep 2026 = 162; ene–sep 2025 = 135. — [MinDefensa – datos.gov.co uav5-b85g](https://www.datos.gov.co/d/uav5-b85g)

**Cifras oficiales difundidas por la Policía o la Alcaldía (vía prensa o portal municipal)**
- **"237 frente a 265"**: "se pasó de 265 asesinatos en 2025 a 237 casos en lo que va de 2026", según datos de la Policía Metropolitana conocidos por Semana. No hay fecha de corte explícita. Publicado el 31-oct-2026. — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)
- **Agosto**: según la Policía Metropolitana de Cúcuta, citada en una columna de opinión de La Opinión, agosto de 2026 tuvo "10 muertes menos" que agosto de 2025. Columna de Pablo Uribe Ruan, 1-oct-2026. — [La Opinión, 1-oct-2026](https://laopinion.co/columnistas/homicidios-en-cucuta)
- **Ene–feb**: la Alcaldía, citando a la Policía Nacional, informó 39 homicidios entre el 1-ene y el 1-mar-2026, frente a 54 en 2025 (−28 %), y presentó a Cúcuta como la capital con mayor reducción. — [Alcaldía de Cúcuta](https://cucuta.gov.co/cucuta-la-primera-ciudad-capital-en-colombia-con-mayor-reduccion-de-homicidios/); [Área Cúcuta](https://www.areacucuta.com/cucuta-se-consolida-como-la-capital-con-mayor-reduccion-de-homicidios-en-colombia-al-inicio-de-2026/)
- **Primer trimestre**: El Tiempo reporta 62 homicidios en el primer trimestre de 2026, "cuatro casos menos" que en el mismo periodo de 2025. No cita fuente. — [El Tiempo, 9-jun-2026](https://www.eltiempo.com/justicia/conflicto-y-narcotrafico/la-radiografia-de-la-violencia-en-cucuta-una-ciudad-dividida-por-bandas-y-grupos-armados-3563081)
- **Primeras 100 horas del BOSUL** (Bloque Operacional de Seguridad Urbana; campaña "Esparta", lanzada el martes 3-nov-2026 por el presidente De la Espriella): el gobernador William Villamizar dijo a La FM que el fin de semana posterior fue el primero sin homicidios en ocho años. No dio cifras ni fechas exactas. — [Alerta, aprox. 4-nov-2026](https://www.alerta.com.co/judiciales/militarizacion-cucuta-balance-seguridad-cero-homicidios-254250)
- Semana informa que más de 500 soldados y policías patrullan la ciudad desde el jueves 29-oct-2026, y que la Policía Metropolitana ha capturado este año a 53 presuntos sicarios. — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)

### Inferences
- **Octubre de 2026 (estimación indirecta, NO oficial):** el acumulado de 2025 en el dataset llega a 264–265 entre el 25 y el 26-oct-2025. Por eso el "265" de Semana probablemente corresponde a un corte en torno al 25–27 de octubre. Si el "237" de 2026 usa el mismo corte, entre el 1-oct y ese corte de 2026 habría unos 25 homicidios (237 − 212). Es una deducción con incertidumbre: no hay corte declarado y los datos de prensa pueden diferir del dataset. **No usar como cifra oficial.**
- Si el corte común es aproximadamente el 26-oct, la variación en lo corrido del año sería −10,6 % (237 frente a 265), menor que el −13,8 % de ene–sep. Eso sugiere que octubre de 2026 no siguió bajando con relación a octubre de 2025 (inferencia).
- La caída de agosto de 2026 según el dataset, mes completo, es de −14 (29 frente a 43). La Policía Metropolitana dijo "10 menos". La diferencia puede deberse a cortes preliminares distintos o a que la Policía hablaba del área metropolitana o de otra definición (inferencia).
- El componente "atacados por GAO" y el componente rural crecen mucho en 2026. Es coherente con el traslado del conflicto armado (Catatumbo, frontera, corredor de Puerto Santander y Agua Clara) hacia la zona rural de Cúcuta, mientras el sicariato urbano baja (inferencia a partir de las modalidades).

### Gaps
- **No hay datos oficiales de Policía para el 1-oct al 16-nov-2026** (el dataset abierto termina el 30-sep-2026; la página de SIEDCO en policia.gov.co dio 404).
- El dataset de Policía no trae **nacionalidad, edad ni barrio/comuna**. Para víctimas venezolanas solo hay cifras del INMLCF, hasta jul-2026.
- Se desconoce la fecha de corte del "237 frente a 265" de Semana.

---

## 3. Masacres en Cúcuta y el área metropolitana (oficial frente a Indepaz)

### Takeaway
En el periodo 7-ago a 16-nov-2026 solo se encontró **una masacre en Cúcuta: el 15-ago-2026 en una cancha del barrio María Paz, con 3 hombres muertos**. No se encontró ningún comunicado de Policía, Fiscalía o Defensoría que la califique o cuente como masacre; el conteo proviene de Indepaz (fuente no oficial). Indepaz cuenta **5 masacres y 15 muertos en Cúcuta en 2026**: 6-ene, 23-abr, 3-may, 8-jun y 15-ago.

### Cited Findings
- **15-ago-2026, barrio María Paz (Cúcuta):** ataque en una cancha con 3 muertos y 4 heridos, todos hombres. Infobae no cita declaraciones de Policía ni de Fiscalía; Indepaz la registró como la **masacre n.º 81 de 2026 en Colombia**. — [Infobae, 16-ago-2026](https://www.infobae.com/colombia/2026/08/16/tres-muertos-y-cuatro-heridos-en-nueva-masacre-registrada-en-cucuta/). La Opinión reporta "tres hombres muertos y uno más herido", lo que contradice el número de heridos de Infobae — [La Opinión](https://laopinion.co/cucuta/cucuta-escenario-de-la-masacre-81-de-2026-reportada-por-indepaz).
- Dato oficial correspondiente: el dataset de Policía registra **4 homicidios en Cúcuta el 15-ago-2026**, todos hombres en zona urbana: 3 con arma de fuego y modalidad "sicariato", y 1 con "artefacto explosivo/carga dinamita" y modalidad "terrorismo". — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9). El SIEDCO no tiene una variable de "masacre"; el dataset no identifica eventos colectivos.
- Lista de Indepaz para Cúcuta en 2026: 6-ene, 23-abr, 3-may, 8-jun y 15-ago, con 15 muertos en 5 masacres (no oficial). — [Indepaz, informe de masacres](https://indepaz.org.co/informe-de-masacres-en-colombia-durante-el-2020-2021/); [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)
- Inconsistencia: según EFE, la masacre del 3-may-2026 (barrio Las Delicias) tuvo **4** víctimas, y la Policía dijo que la cuarta estaba en identificación por Medicina Legal — [Diario Libre / EFE](https://www.diariolibre.com/mundo/america-latina/2026/05/03/masacre-en-cucuta-cuatro-asesinatos-conmocionan-la-ciudad/3522018). La tabla de Indepaz, según el resumen del buscador, la lista con 3. Con 4 víctimas el total pasaría de 15 a 16; hay que verificarlo en la tabla de Indepaz.
- ONU Derechos Humanos (30-oct-2026) expresó preocupación por los "homicidios selectivos, feminicidios y masacres" en Cúcuta y su área metropolitana, sin dar cifras. — [Semana, 30-oct-2026](https://www.semana.com/nacion/cucuta/articulo/onu-alerta-por-grave-ola-de-violencia-en-cucuta-masacres-extorsiones-y-ataques-con-explosivos/202634/)
- La Defensoría del Pueblo tiene vigentes la Alerta Temprana AT 027/24 (homicidios selectivos, "limpieza social", reclutamiento, extorsión en Cúcuta) y la AT 013/25. — [El Tiempo, 9-jun-2026](https://www.eltiempo.com/justicia/conflicto-y-narcotrafico/la-radiografia-de-la-violencia-en-cucuta-una-ciudad-dividida-por-bandas-y-grupos-armados-3563081); [Infobae, 16-ago-2026](https://www.infobae.com/colombia/2026/08/16/tres-muertos-y-cuatro-heridos-en-nueva-masacre-registrada-en-cucuta/)

### Inferences
- Los otros días con varias víctimas en el periodo, según la Policía, no aparecen como masacres de Indepaz. El 29-ago-2026 hubo 4 homicidios en Cúcuta, 2 de ellos rurales en la modalidad "atacados por GAO". El 31-ago-2026 hubo 2 en El Zulia (GAO, rural) y 1 en Los Patios (explosivo). Sin datos de evento no se puede saber si alguno cumple la definición de masacre (3 o más víctimas en un mismo hecho).

### Gaps
- No hay pronunciamiento oficial de Fiscalía o Policía que hable de "masacre" o "homicidio múltiple" para el 15-ago-2026, ni un conteo oficial de masacres en Cúcuta en 2026.
- No se encontraron masacres en Cúcuta entre septiembre y el 16-nov-2026. La búsqueda no arrojó resultados, lo que no prueba que no hubiera.

---

## 4. Tasa de homicidios por 100.000 habitantes (DANE)

### Takeaway
Con la población DANE (PPED actualizada post-COVID, 30-jul-2025) de **Cúcuta 793.211 (2025) y 792.180 (2026)**, la tasa anualizada del periodo **7 ago – 30 sep fue de 41,05 en 2026 frente a 49,36 en 2025**. En lo corrido de ene–sep, la tasa anualizada es de 35,78 en 2026 frente a 41,46 en 2025. La tasa de 2025 completo es de **43,37 (Policía, 344)** o **45,64 (INMLCF, 362)**.

### Cited Findings
- Población DANE, total municipal: **San José de Cúcuta 2025 = 793.211** (cabecera 762.256; centros poblados y rural disperso 30.955). **2026 = 792.180** (cabecera 761.043; rural 31.137). — [DANE PPED-AreaMun-2018-2042_VP.xlsx, actualizado 30-jul-2025](https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Municipal/PPED-AreaMun-2018-2042_VP.xlsx)
- Área metropolitana (6 municipios), DANE. 2025: Cúcuta 793.211, Villa del Rosario 125.580, Los Patios 104.220, El Zulia 31.833, Puerto Santander 9.563, San Cayetano 8.839, total **1.073.246**. 2026: 792.180, 127.234, 104.819, 32.036, 9.572, 8.946, total **1.074.787**. — [DANE PPED municipal](https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Municipal/PPED-AreaMun-2018-2042_VP.xlsx)
- Fórmulas: tasa del periodo = homicidios / población × 100.000; tasa anualizada = tasa del periodo × 365 / días del periodo. 7-ago a 30-sep = 55 días; ene–sep = 273 días; ene–jul = 212 días.

| Indicador (Cúcuta) | Cálculo | Tasa periodo | Anualizada |
|---|---|---|---|
| 7 ago–30 sep 2026 (Policía) | 49 / 792.180 × 10⁵ | 6,19 | 6,19 × 365/55 = **41,05** |
| 7 ago–30 sep 2025 (Policía) | 59 / 793.211 × 10⁵ | 7,44 | **49,36** |
| Sep 2026 (Policía) | 21 / 792.180 | 2,65 | 32,25 |
| Sep 2025 (Policía) | 26 / 793.211 | 3,28 | 39,88 |
| Ene–sep 2026 (Policía) | 212 / 792.180 | 26,76 | **35,78** |
| Ene–sep 2025 (Policía) | 246 / 793.211 | 31,01 | **41,46** |
| Año 2025 (Policía) | 344 / 793.211 | **43,37** | — |
| Año 2025 (INMLCF) | 362 / 793.211 | **45,64** | — |
| Ene–jul 2026 (INMLCF) | 165 / 792.180 | 20,83 | 35,86 |
| Ene–jul 2025 (INMLCF) | 191 / 793.211 | 24,08 | 41,46 |
| Área metropolitana, 7 ago–30 sep 2026 (Policía) | 60 / 1.074.787 | 5,58 | 37,05 |
| Área metropolitana, 7 ago–30 sep 2025 (Policía) | 72 / 1.073.246 | 6,71 | 44,52 |
| Área metropolitana, ene–sep 2026 (Policía) | 294 / 1.074.787 | 27,35 | 36,57 |
| Área metropolitana, ene–sep 2025 (Policía) | 314 / 1.073.246 | 29,26 | 39,12 |

- Tasas citadas en prensa. Semana: "424 homicidios" en 2025 con una "tasa de 41,64 por cada 100.000", sin fuente — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/). La columna de La Opinión da "44 muertes violentas por cada 100.000" en 2025 según SIEDCO y estima "probablemente, 35" hoy (estimación del columnista) — [La Opinión, 1-oct-2026](https://laopinion.co/columnistas/homicidios-en-cucuta)

### Inferences
- El "44" de La Opinión cuadra con los 344 homicidios de Policía sobre la población DANE de 793.211 (43,37). El "35" del columnista cuadra con la tasa anualizada de ene–sep 2026 (35,78).
- **Las cifras de Semana son internamente inconsistentes con las fuentes oficiales:** 424 / 41,64 × 100.000 implica una población de 1.018.252, que no corresponde ni a Cúcuta (793.211) ni al área metropolitana DANE (1.073.246). En cambio, 344 / 41,64 implica 826.129 habitantes, posiblemente la proyección DANE anterior a la actualización. Ninguna fuente oficial respalda el "424". No usarlo sin verificar; es posible que mezcle área metropolitana, otro año u otro indicador, o que el ranking de "ciudades más peligrosas del mundo" use cifras propias (ONG mexicana CCSPJP, inferencia).
- La anualización de periodos cortos (55 días) es volátil. Agosto suele ser un mes alto (en 2025 hubo 43 homicidios, el máximo del año).

### Gaps
- No se pudo verificar qué población usan la Policía o la Alcaldía para sus tasas oficiales.
- No hay tasa oficial publicada para 2026.

---

## 5. Discrepancias entre Medicina Legal y Policía (y por qué)

### Takeaway
En Cúcuta, Medicina Legal registra más homicidios que la Policía en 2025 (**362 frente a 344, +18**), pero casi los mismos en ene–jul 2026 (**165 frente a 162**). Mes a mes las diferencias van de −3 a +4 y se compensan en parte. En muertes de tránsito la brecha es grande e invertida: la Policía registra muchas más que el INMLCF.

### Cited Findings
Comparación mensual de homicidios en Cúcuta, INMLCF / Policía. Fuentes: [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv) y [Policía m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9).

| Mes | 2025 INMLCF / Policía | 2026 INMLCF / Policía |
|---|---|---|
| Ene | 24 / 26 | 21 / 20 |
| Feb | 28 / 25 | 18 / 20 |
| Mar | 19 / 19 | 24 / 21 |
| Abr | 17 / 14 | 31 / 30 |
| May | 45 / 42 | 30 / 29 |
| Jun | 32 / 28 | 28 / 26 |
| Jul | 26 / 23 | 13 / 16 |
| Ago | 47 / 43 | — / 29 |
| Sep | 29 / 26 | — / 21 |
| Oct | 27 / 25 | — / — |
| Nov | 38 / 39 | — / — |
| Dic | 30 / 34 | — / — |
| **Total** | **362 / 344** | **ene–jul 165 / 162** |

- Tránsito en Cúcuta, ene–sep 2025: Policía 135 frente a INMLCF 94 (72 en ene–jul + 12 en ago + 10 en sep). Ene–jul 2026: INMLCF 77; Policía 162 en ene–sep 2026. — [Policía uav5-b85g](https://www.datos.gov.co/d/uav5-b85g); [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Definiciones. La Policía mide "toda muerte que fuere causada por otra persona... Incluye: HOMICIDIO INTENCIONAL" y la registra por fecha y municipio del hecho a partir de la denuncia o noticia criminal (SPOA) — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9). El INMLCF clasifica la "manera de muerte" con criterio forense ("no se tipifica un delito... la clasificación, de carácter forense, se genera en el contexto de la información aportada por la autoridad, los hallazgos..."). Su información es "preliminar prevalente" y se registra por municipio del hecho cuando se conoce — [INMLCF 2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Diferencias entre cifras de Policía en distintas fechas: la Alcaldía, con datos de la Policía, publicó 39 homicidios (1-ene a 1-mar-2026) frente a 54 en 2025; el dataset actual da 40 frente a 54. El Tiempo dio 62 para el primer trimestre de 2026 y 66 implícitos para 2025; el dataset actual da 61 y 70. — [Alcaldía](https://cucuta.gov.co/cucuta-la-primera-ciudad-capital-en-colombia-con-mayor-reduccion-de-homicidios/); [El Tiempo](https://www.eltiempo.com/justicia/conflicto-y-narcotrafico/la-radiografia-de-la-violencia-en-cucuta-una-ciudad-dividida-por-bandas-y-grupos-armados-3563081); [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

### Inferences
- Razones probables de la brecha en homicidios, por conocimiento del método y no confirmadas para cada caso:
  1. El INMLCF incluye muertes que la Policía no tipifica como homicidio doloso, como muertes en intervención de la fuerza pública (3 casos con agresor "Policía" en 2026) o enfrentamientos.
  2. Cadáveres hallados (fosas, frontera, ríos) que llegan a necropsia antes de haber noticia criminal.
  3. Lesionados que mueren después.
  4. La reasignación entre municipio del hecho y municipio de necropsia: la sede del INMLCF de Cúcuta practica necropsias para toda el área metropolitana y parte del Catatumbo.
  5. Fechas de corte y reclasificaciones posteriores en ambas bases.
- En tránsito ocurre lo contrario: la Policía cuenta más que el INMLCF. Puede deberse a que la Policía registra muertes en accidente según el lugar del accidente y los decesos en hospital, que no siempre pasan por necropsia, o a diferencias en la cobertura del dataset preliminar del INMLCF (inferencia; no verificado).
- Las cifras de Policía también cambian con el tiempo (+1 en ene–feb de 2026; +4 en el primer trimestre de 2025 frente a lo reportado). Toda cifra debe citarse con su fecha de consulta.

### Gaps
- No se encontró ninguna nota técnica oficial que concilie las bases de INMLCF y Policía para Cúcuta.
- No se pudo verificar si los boletines PDF del INMLCF usan "municipio del hecho" o "municipio de la necropsia" para su tabla de ciudades.

---

## 6. Hechos notables (7 ago – 16 nov 2026) y contexto de actores armados

### Takeaway
El periodo empezó justo después del atentado con explosivos del **1-ago-2026 contra el Comando de Policía de Norte de Santander** e incluyó la masacre de María Paz (15-ago), un carro bomba en **Los Patios (31-ago, 1 muerto)**, el asesinato de un **dragoneante del Inpec (12-oct)** y el del ex secretario de Gobierno **Miguel Castellanos (26-oct)**. Después vinieron la alerta de ONU Derechos Humanos (30-oct), la militarización (desde el 29-oct) y el lanzamiento del BOSUL / campaña "Esparta" (3-nov).

### Cited Findings
- **1-ago-2026 (6 días antes del periodo):** ataque con explosivo contra el Comando de Policía de Norte de Santander en Cúcuta, hacia las 3:20 a. m., con un artefacto explosivo improvisado tipo rampa según el reporte oficial citado por Cambio. El saldo preliminar fue de 11 heridos (8 policías y 3 civiles) y se ofreció una recompensa de 200 millones. — [Cambio](https://cambiocolombia.com/conflicto-armado-en-colombia/articulo/2026/8/ataque-con-explosivos-contra-la-policia-en-norte-de-santander-deja-11-heridos-ofrecen-hasta-200-millones-de-recompensa-por-informacion-de-los-responsables); [El Heraldo, 1-ago-2026](https://www.elheraldo.co/colombia/2026/08/01/autoridades-ofrecen-recompensa-de-200-millones-por-responsables-del-atentado-contra-la-policia-en-cucuta/). Semana habla de 10 policías y 3 civiles heridos — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/). La autoría (ELN según un medio) no estaba confirmada oficialmente — [Blu Radio](https://www.bluradio.com/regiones/santanderes/quien-esta-detras-del-atentado-en-cucuta-esto-se-sabe-del-ataque-al-comando-de-policia-so35).
- **15-ago-2026:** masacre en una cancha del barrio María Paz, con 3 muertos (ver sección 3). — [Infobae](https://www.infobae.com/colombia/2026/08/16/tres-muertos-y-cuatro-heridos-en-nueva-masacre-registrada-en-cucuta/)
- **31-ago-2026, Los Patios (área metropolitana):** carro bomba contra una estación de Policía, con 1 muerto, 2 policías y 9 civiles heridos. — [Publimetro, 1-sep-2026](https://www.publimetro.co/noticias/2026/09/01/carro-bomba-en-cucuta-un-muerto-dos-policias-y-nueve-civiles-resultaron-heridos-tras-el-ataque-a-la-estacion-de-policia-en-los-patios/). El dataset de Policía registra el 31-ago-2026 un homicidio en Los Patios con "artefacto explosivo / terrorismo" — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **29 y 30-ago-2026:** 3 homicidios rurales en Cúcuta con modalidad "atacados por GAO". **31-ago-2026:** 2 homicidios rurales en El Zulia con la misma modalidad. Estos registros son el principal indicio oficial del traslado de la confrontación armada (Catatumbo y frontera) al área rural metropolitana. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- **12-oct-2026:** asesinato de un dragoneante del Inpec al terminar su turno; en otro ataque, en el sector Viejo Escobal, fue baleado un policía de la Policía Metropolitana. — [Metropolitano](https://metropolitano.com.co/asesinan-a-dragoneante-del-inpec-en-cucuta/) (resumen del buscador, página no leída completa)
- **26-oct-2026:** sicarios asesinaron a Miguel Castellanos, precandidato a la Alcaldía y ex secretario de Gobierno, en el anillo vial occidental. — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)
- **29-oct-2026:** despliegue de más de 500 soldados y policías, con restricciones a motos en torno a Halloween. — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)
- **30-oct-2026:** ONU Derechos Humanos alerta sobre un "deterioro de la situación de derechos humanos" en Cúcuta y su área metropolitana, que incluye homicidios selectivos, feminicidios, masacres, extorsión, reclutamiento de menores, trata y uso de explosivos. Pide que la seguridad ciudadana sea liderada por la policía civil y que el papel militar sea excepcional. — [Semana, 30-oct-2026](https://www.semana.com/nacion/cucuta/articulo/onu-alerta-por-grave-ola-de-violencia-en-cucuta-masacres-extorsiones-y-ataques-con-explosivos/202634/)
- **3-nov-2026:** lanzamiento de la campaña "Esparta" y del BOSUL por el presidente De la Espriella. Según el gobernador, tras las "primeras 100 horas" hubo un fin de semana sin homicidios, el primero en ocho años. — [Alerta](https://www.alerta.com.co/judiciales/militarizacion-cucuta-balance-seguridad-cero-homicidios-254250)
- **Actores armados.** Semana menciona al Clan del Golfo, el ELN, el frente 33 de las disidencias, el Tren de Aragua, Los AK-47, La Familia P, Los Turcos, Los Mexicanos y Los de la F — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/). La Defensoría, citada por El Tiempo, identifica unas 20 estructuras criminales, con al menos un actor armado ilegal en cada una de las 10 comunas, y nombra a Clan del Golfo, ELN, frente 33, Los Rastrojos, Los Pelusos, Tren de Aragua, AK-47, Autodefensas Unidas Colombo Venezolanas y La Línea, además de bandas locales (Porras, Carlos Pecueca, Los del Norte, El Hampa, Pepino, Los de Saúl, Carro Rojo) — [El Tiempo, 9-jun-2026](https://www.eltiempo.com/justicia/conflicto-y-narcotrafico/la-radiografia-de-la-violencia-en-cucuta-una-ciudad-dividida-por-bandas-y-grupos-armados-3563081)
- Hechos anteriores del año, como contexto. El 18-feb-2026, ataque a una caravana policial en el anillo vial oriental en el que murió el subintendente Luis Jesús Sarmiento — [Semana, 31-oct-2026](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/). Hacia el 6-jun-2026, asesinato del periodista Cristian Herrera en Guaimaral. El 8-jun-2026, masacre en la vereda Agua Clara, sobre la vía a Puerto Santander — [El Tiempo](https://www.eltiempo.com/justicia/conflicto-y-narcotrafico/la-radiografia-de-la-violencia-en-cucuta-una-ciudad-dividida-por-bandas-y-grupos-armados-3563081)

### Inferences
- La tendencia oficial (menos homicidios totales y menos sicariato urbano) convive con más violencia de tipo armado: explosivos contra la fuerza pública, homicidios rurales "por GAO" y asesinatos de alto perfil. Eso ayuda a explicar la diferencia entre la baja estadística y la percepción o alarma (ONU, militarización).

### Gaps
- No se encontró ningún comunicado oficial de la Fiscalía con capturas o imputaciones por los hechos del periodo, ni el balance de la Policía Metropolitana de octubre y noviembre.
- Faltan datos oficiales sobre cuerpos hallados en la zona de frontera durante el periodo y sobre ataques contra policías posteriores a septiembre (homicidios de uniformados).
- La nota de La Patilla del 1-nov-2026 ("nueve bandas criminales") no fue leída — [La Patilla](https://lapatilla.com/2026/11/01/cucuta-bandas-criminales-trochas-tren-de-aragua-sicarios/).

---

## 7. Contexto del año corrido (ene – última fecha disponible 2026)

### Takeaway
Las fuentes oficiales coinciden en una **baja de entre el 9 % y el 14 % en lo corrido de 2026**: Policía, ene–sep, 212 frente a 246 (−13,8 %); Medicina Legal, ene–jul, 165 frente a 191 (−13,6 %); Policía Metropolitana vía Semana, a fines de octubre, 237 frente a 265 (−10,6 %). Aun así, la tasa anualizada sigue en torno a **36 por 100.000**, muy por encima del umbral de "epidemia" de la OMS (10 por 100.000).

### Cited Findings
- Policía, Cúcuta, ene–sep: 2026 = 212; 2025 = 246. Área metropolitana: 294 frente a 314. — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)
- INMLCF, Cúcuta, ene–jul: 2026 = 165; 2025 = 191. Área metropolitana: 235 frente a 250. — [2kpj-cktv](https://www.datos.gov.co/d/2kpj-cktv)
- Policía Metropolitana (vía Semana): 237 en 2026 frente a 265 en 2025, "en lo que va" del año (artículo del 31-oct-2026). — [Semana](https://www.semana.com/nacion/cucuta/articulo/cucuta-bajo-el-asedio-de-los-criminales-asi-se-vive-en-una-de-las-ciudades-mas-peligrosas-de-colombia/202648/)
- Referencias anuales de la Policía: 2024 = 291 y 2025 = 344 homicidios en Cúcuta (+18,2 %). — [m8fd-ahd9](https://www.datos.gov.co/d/m8fd-ahd9)

### Inferences
- 2025 fue un año alto (344, +18 % frente a 2024), así que parte de la baja de 2026 es un regreso hacia niveles de 2024. Ene–sep 2024 sumó 213 según la serie del dataset (23+15+20+26+29+38+17+25+20), prácticamente igual a los 212 de ene–sep 2026.

### Gaps
- Faltan las cifras oficiales de octubre y del 1 al 16 de noviembre de 2026, de Policía y de INMLCF. El balance oficial del periodo completo 7-ago a 16-nov-2026 **no se puede construir hoy** con fuentes públicas accesibles. Los datos llegan al 30-sep-2026 (Policía) y al 31-jul-2026 (INMLCF).
