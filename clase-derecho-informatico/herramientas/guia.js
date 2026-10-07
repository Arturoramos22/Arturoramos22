const fs = require("fs");
const { Packer } = require("docx");
const { mdToChildren, buildDoc } = require("./md2docx.js");
const CT = require("./content.js");
const OUT = process.argv[2] || "GUIA_DE_TRABAJO_ESTUDIANTES.docx";
const S = CT.sentencia, L = CT.lectura, V = CT.video;
const blank = (n) => Array.from({ length: n }, () => "| | |").join("\n");

const md = `# Guía de trabajo: Derecho Informático

**Universidad Francisco de Paula Santander · Programa de Derecho · Asignatura Tecnología y Derecho**

**Docente:** Carlos Arturo Ramos Mejía · **Sesión:** Derecho Informático: fundamentos, evolución, objeto, fuentes y campos · **Duración:** 120 minutos.

**Nombre del estudiante:** ______________________________ · **Código:** ____________ · **Grupo de trabajo:** ____

## 1. Instrucciones

**Antes de la clase (tiempo estimado: 2 horas).**
1. Lea la lectura asignada (sección 3) y elabore la ficha de lectura de una página (actividad 6.1). Se entrega al inicio de la clase.
2. Lea la Sentencia T-323 de 2024 directamente en la relatoría de la Corte Constitucional (enlace en la sección 4) y llene en lápiz la matriz de análisis (actividad 6.2). Lea completos los antecedentes, el planteamiento de los problemas jurídicos, el acápite sobre el uso de inteligencia artificial y la parte resolutiva; los demás apartados pueden leerse por encima.
3. Traiga esta guía impresa o en su dispositivo.

**Durante la clase.** Participará en un ejercicio relámpago de clasificación, verá un video de apoyo, trabajará en grupo la matriz de la sentencia y resolverá un minicaso. Al final responderá un quiz corto y un ticket de salida.

**Después de la clase.** Complete la matriz con lo discutido y conserve esta guía: la próxima sesión (protección de datos personales y habeas data) parte de aquí.

## 2. Síntesis conceptual

### 2.1 Qué es el Derecho Informático

**Punto de partida: una regla de tres.** Para entender el Derecho Informático hay que distinguir primero tres nociones: (1) Informática y Derecho, la relación general entre las dos disciplinas; (2) informática jurídica, la informática al servicio del derecho (el jurista usa la máquina), en tres modalidades: documental (relatorías, bases de datos jurídicas), de gestión (expediente electrónico, despachos) y decisional (sistemas de apoyo a la decisión, IA generativa); (3) Derecho Informático, el derecho que regula la informática (la máquina y la información son objeto de la norma). La T-323 de 2024 está en el cruce: una herramienta de informática jurídica decisional (ChatGPT) que se vuelve objeto del Derecho Informático.

| Noción | Dirección | Ejemplo |
|---|---|---|
| Informática y Derecho | La relación general entre las dos disciplinas (el género) | El campo de esta asignatura |
| Informática jurídica | La informática al servicio del derecho | Relatoría de la Corte; expediente electrónico; ChatGPT como apoyo del juez |
| Derecho Informático | El derecho que regula la informática | Ley 1581 de 2012; Ley 527 de 1999; T-323 de 2024 |

**Definición.** Conjunto de principios, normas e instituciones que regulan las relaciones jurídicas en las que la información digital, los sistemas informáticos y las redes son objeto o instrumento de la conducta. Julio Téllez Valdés lo definió como el conjunto de leyes, normas y principios aplicables a los hechos y actos derivados de la informática. Cambia el nombre según la época (Derecho de las nuevas tecnologías, Derecho de las TIC, Derecho digital, Ciberderecho); permanece el objeto.

| Noción | Qué estudia | Ejemplo |
|---|---|---|
| Derecho Informático | La informática como objeto de regulación | Ley 1581 de 2012 sobre datos personales |
| Informática jurídica | La informática como herramienta del jurista | Un sistema de gestión de expedientes; un buscador de jurisprudencia |
| Derecho de las telecomunicaciones | La infraestructura y los servicios de transmisión | Ley 1341 de 2009 y la Comisión de Regulación de Comunicaciones |

**Autonomía.** Se exigen cuatro campos: normativo (legislación propia), docente (cátedra propia), científico (doctrina e investigación) e institucional (autoridades propias). En Colombia existen los cuatro; la posición más sólida es que se trata de una disciplina con objeto, principios e instituciones propios, pero transversal a las demás ramas.

### 2.2 Evolución en cuatro etapas

| Etapa | Qué ocurre en el mundo | Qué ocurre en Colombia |
|---|---|---|
| 1948-1990: cibernética y primeras leyes de datos | Wiener (1948); Losano y Frosini (1968); leyes de datos de Hesse (1970), Suecia (1973), Estados Unidos (1974) y Francia (1978); Convenio 108 (1981) | Constitución de 1991, art. 15: habeas data; T-414 de 1992 |
| 1990-2008: comercio electrónico y equivalencia funcional | Ley Modelo CNUDMI (1996); Directiva 95/46; Lessig, el código como regulación (1999) | Ley 527 de 1999 |
| 2001-2016: ciberdelincuencia, datos como derecho fundamental y gobierno digital | Convenio de Budapest (2001); RGPD (2016) | Ley 1266 de 2008; Ley 1273 de 2009; Ley 1341 de 2009; C-748 de 2011 y Ley 1581 de 2012; Decreto 1377 de 2013; Ley 1712 de 2014; Ley 1928 de 2018 |
| 2017-2026: inteligencia artificial y justicia digital | Reglamento europeo de IA (2024); Directrices UNESCO para IA en cortes (versión en español, 2025) | CONPES 3975 de 2019 y 4144 de 2025; Ley 2213 de 2022; Circular Externa 002 de 2024 de la SIC; T-323 de 2024; STC17832-2025; AC739-2026 |

### 2.3 Objeto y fuentes

**Objeto:** (i) la información sobre las personas (datos, habeas data, identidad digital); (ii) los actos y hechos por medios electrónicos (contratos, firmas, prueba, trámites); (iii) las conductas lesivas contra sistemas e información (delitos informáticos). La inteligencia artificial atraviesa los tres.

| Nivel | Fuente | Contenido de cabecera |
|---|---|---|
| Constitución | Arts. 15, 20, 61, 74 | Intimidad y habeas data; información; propiedad intelectual; documentos públicos |
| Tratados y soft law | Convenio de Budapest (Ley 1928 de 2018); Convenio 108; Recomendación UNESCO sobre ética de la IA (2021); principios OCDE (2019) | Tipos penales y cooperación; estándares de datos; principios para la IA |
| Leyes estatutarias | Ley 1266 de 2008; Ley 1581 de 2012; Ley 1712 de 2014 | Habeas data financiero; régimen general de datos; transparencia |
| Leyes ordinarias | Ley 527 de 1999; Ley 1273 de 2009; Ley 1341 de 2009; Ley 2213 de 2022 | Mensajes de datos; delitos informáticos; sector TIC; justicia digital |
| Reglamentos y regulación | Decretos 1377 de 2013 y 1074 de 2015; Circular Externa 002 de 2024 de la SIC; resoluciones de la CRC | Desarrollo de la Ley 1581; IA y datos; comunicaciones |
| Jurisprudencia | T-414 de 1992; SU-082 de 1995; C-748 de 2011; T-323 de 2024; STC17832-2025; AC739-2026 | Habeas data; control de la ley de datos; IA en la decisión judicial |
| Autorregulación y código | Políticas de tratamiento, términos de servicio, estándares técnicos | La arquitectura técnica también regula |

### 2.4 Siete principios estructurales

1. **Equivalencia funcional** (Ley 527 de 1999, arts. 6 a 8): el mensaje de datos cumple la función del escrito, la firma y el original.
2. **Neutralidad tecnológica**: la norma no privilegia una tecnología concreta.
3. **No discriminación del mensaje de datos** (Ley 527, arts. 5 y 10): no se le niega efecto jurídico ni fuerza probatoria por ser electrónico.
4. **Autodeterminación informativa** (art. 15 C.P.; Ley 1581 de 2012, art. 4): la persona decide sobre sus datos.
5. **Responsabilidad demostrada** (Decreto 1377 de 2013, arts. 26 y 27): quien trata datos prueba que cumple.
6. **Supervisión humana y no sustitución** (T-323 de 2024): la herramienta apoya, no decide.
7. **Transparencia y explicabilidad** (T-323 de 2024; Circular 002 de 2024 de la SIC): se informa que se usó la herramienta, cómo y para qué.

### 2.5 Mapa de campos

| Campo | Pregunta que responde | Norma de cabecera |
|---|---|---|
| Datos personales y habeas data | ¿Quién controla la información sobre mí? | Art. 15 C.P.; Leyes 1266 de 2008 y 1581 de 2012 |
| Comercio electrónico y contratación | ¿Vale lo que pacto por medios electrónicos? | Ley 527 de 1999 |
| Prueba electrónica | ¿Cómo se aporta y valora un mensaje de datos? | Ley 527, arts. 10 y 11; CGP, art. 247 |
| Delitos informáticos | ¿Qué conductas digitales son delito? | Ley 1273 de 2009; Convenio de Budapest |
| Propiedad intelectual digital | ¿A quién pertenece el software, la obra y el dato? | Ley 23 de 1982; Decisión Andina 351; Ley 1915 de 2018 |
| Gobierno y justicia digital | ¿Cómo se relaciona el ciudadano con el Estado en línea? | CPACA; Ley 2213 de 2022; Ley 1712 de 2014 |
| Inteligencia artificial | ¿Quién responde por la decisión asistida por una máquina? | CONPES 4144 de 2025; Circular 002 de 2024 de la SIC; T-323 de 2024 |

<<PAGEBREAK>>
## 3. Lectura asignada

**Lectura principal.** ${L.autor}. *${L.titulo}*. ${L.fuente.split(". Complemento")[0]}. Disponible en: ${L.url}

**Complemento colombiano (10 páginas).** Flórez Rojas, María Lorena (coord.). *Derecho de las tecnologías y las tecnologías para el derecho*. GECTI, Facultad de Derecho, Ediciones Uniandes, Bogotá, 2022. Leer la Presentación (pp. xi-xiv) y la sección «El papel de la academia» (pp. 44-53). Página editorial: ${L.urlComplemento}

**Guía de lectura.** Mientras lee, responda en sus notas:
1. ¿Cómo distingue el texto la informática jurídica del derecho informático, y qué lugar le da a la inteligencia artificial aplicada al derecho?
2. ¿Qué argumentos ofrece sobre la denominación (derecho informático o derecho digital) y sobre las características de la disciplina?
3. ¿Qué papel cumplen la neutralidad tecnológica y la mínima intervención del sistema normativo como criterios regulatorios? ¿Los reconoce usted en la Ley 527 de 1999?
4. En el complemento colombiano, ¿qué campos del derecho informático trabajaba el GECTI desde 2002 y qué diagnóstico hace sobre la enseñanza de la materia en las facultades del país?

**Pregunta de la ficha:** ${L.pregunta}

## 4. Sentencia hito: ${S.id}

| Dato | Contenido |
|---|---|
| Corporación y sala | ${S.corte} |
| Magistrado ponente | ${S.mp.replace("M.P. ", "")} |
| Fecha | ${S.fecha} |
| Expediente | ${S.expediente.replace("Expediente ", "")} |
| Tema | Uso de inteligencia artificial generativa (ChatGPT 3.5) por un juez al resolver una tutela de salud |
| Texto oficial | https://www.corteconstitucional.gov.co/relatoria/2024/T-323-24.htm |
| Material de apoyo | ABC de la sentencia T-323 de 2024, Consejo Superior de la Judicatura (Circular PCSJC24-37 de 2024): https://escuelajudicial.ramajudicial.gov.co/sites/default/files/ABC_SentenciaIA_T323De2024.pdf |

**Cómo leerla.** Identifique primero la parte resolutiva y luego devuélvase a los problemas jurídicos; subraye cada vez que la Corte diga qué puede y qué no puede hacer la IA en la función judicial; anote los doce criterios que fija para la Rama Judicial. Distinga lo que la Corte necesitó para decidir el caso (ratio) de lo que dijo para orientar casos futuros (reglas prospectivas y órdenes).

**Síntesis de referencia (para contrastar después del taller, no antes).**
- Hechos: ${S.hechos.join(" ")}
- Problemas jurídicos: (1) ${S.problemas[0]} (2) ${S.problemas[1]}
- Decisión: ${S.decision.join(" ")}
- Ratio decidendi: ${S.ratio}
- Criterios para el uso de IA en la Rama Judicial: ${S.criterios.map((c, i) => `(${i + 1}) ${c.toLowerCase()}`).join("; ")}.
- Regla: ${S.regla}
- Precedente: ${S.precedente}

**Para el contraste:** Corte Suprema de Justicia, Sala de Casación Civil, STC17832-2025 (noviembre de 2025). Un tribunal superior terminó un proceso ejecutivo por desistimiento tácito citando dos providencias de la Corte Suprema con pasajes que no existían; la Corte dejó sin efectos la decisión y advirtió sobre el uso no verificado de IA. En 2026 la misma Corte volvió sobre el problema en el Auto AC739-2026. Consulte ambas en https://cortesuprema.gov.co

<<PAGEBREAK>>
## 5. Video de apoyo

**${V.titulo}.** ${V.experto}. ${V.canal}. ${V.fecha}. Enlace: ${V.url}

Se proyecta en clase un fragmento de máximo 15 minutos. Si desea verlo completo antes, hágalo con estas preguntas a la vista:
1. ${V.preguntas[0]}
2. ${V.preguntas[1]}
3. ${V.preguntas[2]}

## 6. Actividades

### 6.1 Actividad individual (antes de la clase): ficha de lectura

Una página, letra 11, con cuatro apartados: (a) tesis del autor en dos líneas; (b) tres ideas centrales con la página donde aparecen; (c) una crítica fundamentada; (d) respuesta a la pregunta de la ficha. Se entrega al inicio de la clase.

### 6.2 Actividad grupal (en clase, 23 minutos): matriz de análisis de la sentencia

Grupos de cuatro. Completen la matriz y luego respondan la pregunta de contraste. Un relator expone en dos minutos.

| Elemento | Su análisis |
|---|---|
| Hechos relevantes | |
| Problema jurídico (en forma de pregunta) | |
| Decisión (qué resolvió la Corte) | |
| Ratio decidendi (la razón necesaria para decidir) | |
| Regla o subregla jurisprudencial | |
| Precedente que establece (a quién vincula y para qué casos) | |
| Obiter dicta relevantes | |
| Utilidad para el ejercicio profesional | |
| Crítica del grupo | |

**Pregunta de contraste.** ¿La regla de la T-323 de 2024 habría evitado lo ocurrido en la STC17832-2025? ¿Qué le falta a esa regla para el abogado litigante, que no es destinatario de las órdenes dadas a la Rama Judicial?

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

### 6.3 Preguntas orientadoras para la discusión

1. ¿Es el Derecho Informático una rama autónoma o un método transversal? Defienda una posición con los cuatro criterios de autonomía.
2. ¿Qué cambia en el razonamiento probatorio cuando el documento es un mensaje de datos? Relacione la Ley 527 de 1999 con el artículo 247 del Código General del Proceso.
3. ¿Por qué el habeas data es un derecho fundamental autónomo y no una simple manifestación de la intimidad?
4. Si la Corte dijo en la T-323 de 2024 que el juez no delegó su decisión, ¿por qué fijó criterios y dio órdenes? ¿Qué tipo de precedente es ese?
5. ¿Debe prohibirse la IA generativa en los despachos judiciales, regularse o dejarse a la autorregulación? Use la lectura y el video.
6. ¿Quién responde cuando un sistema automatizado niega un servicio de salud: el programador, la EPS o el funcionario que lo adoptó?

<<PAGEBREAK>>
## 7. Ejercicios de aplicación (en clase, 10 minutos; un caso por grupo)

**Caso 1. El auto redactado por la máquina.** Un juez municipal pide a una IA generativa que redacte el auto que decreta pruebas y lo firma sin cambios ni mención de la herramienta. ¿Qué criterios de la T-323 de 2024 se afectan? ¿Qué debió hacer? ¿Es nulo el auto?

________________________________________________________________________________

________________________________________________________________________________

**Caso 2. La tutela con la cita inexistente.** Un estudiante de consultorio jurídico redacta una tutela con una IA que cita una sentencia que no existe; el juez lo advierte en la sentencia. Identifique las consecuencias éticas (Ley 1123 de 2007), procesales y para el usuario del consultorio, y redacte en tres pasos el protocolo de verificación que aplicaría antes de radicar cualquier escrito.

________________________________________________________________________________

________________________________________________________________________________

**Caso 3. La EPS que decide sola.** Una EPS usa un sistema automatizado que niega autorizaciones de servicios sin revisión humana. ¿Qué derechos están en juego (salud, habeas data, debido proceso)? ¿Qué exigiría usted como apoderado del paciente y con qué fundamento normativo?

________________________________________________________________________________

________________________________________________________________________________

## 8. Evaluación y cierre

### 8.1 Quiz (5 minutos, respuesta breve)

1. Explique en una frase la diferencia entre Derecho Informático e informática jurídica. ______________________________________________
2. ¿Qué principio permite que un correo electrónico valga como escrito y en qué artículos de la Ley 527 de 1999 se apoya? ______________________________________________
3. ¿Por qué la Ley 1581 de 2012 es estatutaria y qué sentencia la revisó? ______________________________________________
4. Nombre dos de los criterios fijados por la T-323 de 2024 para el uso de IA en la justicia y explique uno. ______________________________________________
5. ¿Qué decidió la Corte Suprema de Justicia en la STC17832-2025 y por qué? ______________________________________________

### 8.2 Ticket de salida

**Una regla que me llevo:** ______________________________________________

**Una duda que me queda:** ______________________________________________

### 8.3 Criterios de evaluación

| Componente | Peso | Criterio |
|---|---|---|
| Ficha de lectura | 30 % | Comprensión de la tesis del autor, ideas con página, capacidad crítica |
| Matriz de la sentencia | 40 % | Precisión en hechos, problema, ratio y regla; distinción entre ratio y obiter; calidad del contraste |
| Aplicación y quiz | 30 % | Uso correcto de las reglas en el caso; respuestas del quiz |

## 9. Referencias y enlaces

- ${L.autor}. *${L.titulo}*. Academia Judicial de Chile, 2021. ${L.url}
- Flórez Rojas, M. L. (coord.). *Derecho de las tecnologías y las tecnologías para el derecho*. GECTI, Ediciones Uniandes, 2022. ${L.urlComplemento}
- Corte Constitucional. Sentencia T-323 de 2024 (M.P. Juan Carlos Cortés González). https://www.corteconstitucional.gov.co/relatoria/2024/T-323-24.htm
- Consejo Superior de la Judicatura. ABC de la sentencia T-323 de 2024 (Circular PCSJC24-37 de 2024). https://escuelajudicial.ramajudicial.gov.co/sites/default/files/ABC_SentenciaIA_T323De2024.pdf
- Corte Suprema de Justicia, Sala de Casación Civil. STC17832-2025; Auto AC739-2026. https://cortesuprema.gov.co
- ${V.canal}. ${V.titulo}. ${V.url}
- Normas citadas (texto oficial en https://www.suin-juriscol.gov.co y https://www.secretariasenado.gov.co): Constitución Política, arts. 15, 20, 61 y 74; Ley 527 de 1999; Ley 1266 de 2008; Ley 1273 de 2009; Ley 1341 de 2009; Ley 1581 de 2012; Decreto 1377 de 2013; Ley 1712 de 2014; Ley 1928 de 2018; Ley 2213 de 2022; Código General del Proceso, art. 247; Circular Externa 002 de 2024 de la Superintendencia de Industria y Comercio; CONPES 4144 de 2025.
- Doctrina de referencia: Téllez Valdés, J. *Derecho informático*. UNAM, 1991 (ediciones posteriores McGraw-Hill); Lessig, L. *Code and other laws of cyberspace*. Basic Books, 1999; Frosini, V. *Cibernética, derecho y sociedad*. 1968; Losano, M. *Giuscibernetica*. 1969.
`;

fs.writeFileSync(OUT.replace(/\.docx$/, ".md"), md);
const doc = buildDoc(mdToChildren(md), { title: "Guía de trabajo: Derecho Informático", header: "Tecnología y Derecho · Derecho Informático · UFPS · Guía de trabajo del estudiante" });
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log("written", OUT); });
