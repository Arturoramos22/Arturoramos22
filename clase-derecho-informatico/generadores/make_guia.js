// GUÍA DE TRABAJO DEL ESTUDIANTE (.docx) - Derecho Informático
const fs = require('fs'); const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, LevelFormat, ExternalHyperlink, PageBreak, TabStopType } = require('docx');
const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'fuentes.json'), 'utf8'));
const OUT = process.argv[2] || path.join(__dirname, 'GUIA_DE_TRABAJO_ESTUDIANTES_Derecho_Informatico.docx');
const NAVY = '1F2240', TEAL = '0E8C8C', GREY = '3C3F5C', LIGHT = 'EEF1F8';

const P = (text, o = {}) => new Paragraph({ spacing: { after: o.after ?? 120, line: 276 }, alignment: o.align, children: Array.isArray(text) ? text : [new TextRun({ text, bold: o.bold, italics: o.italics, size: o.size || 22, color: o.color })] });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 140 }, children: [new TextRun({ text: t })] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, children: [new TextRun({ text: t })] });
const B = (t, ref = 'bul') => new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 80, line: 276 }, children: typeof t === 'string' ? [new TextRun({ text: t, size: 22 })] : t });
const N = t => B(t, 'num');
const Link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: 'Hyperlink', size: 22 })] });
const blank = (n = 1) => Array.from({ length: n }, () => new Paragraph({ spacing: { after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA', space: 1 } }, children: [new TextRun({ text: ' ', size: 26 })] }));
function table(rows, widths, opts = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => new TableRow({ tableHeader: i === 0, children: r.map((c, j) => new TableCell({
      width: { size: widths[j], type: WidthType.DXA },
      shading: i === 0 ? { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' } : (opts.zebra && i % 2 === 0 ? { type: ShadingType.CLEAR, fill: LIGHT, color: 'auto' } : undefined),
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ spacing: { after: 0, line: 260 }, children: [new TextRun({ text: c, size: 19, bold: i === 0 || (opts.boldFirst && j === 0), color: i === 0 ? 'FFFFFF' : undefined })] })],
    })) })),
  });
}
const S = F.sentencia, L = F.lectura, V = F.video;

const children = [];
children.push(new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 60 }, children: [new TextRun({ text: 'Universidad Francisco de Paula Santander · Programa de Derecho · Asignatura Tecnología y Derecho', size: 20, color: GREY })] }));
children.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 120 }, children: [new TextRun({ text: 'Guía de trabajo: Derecho Informático' })] }));
children.push(P([new TextRun({ text: 'Sesión: ', bold: true, size: 22 }), new TextRun({ text: 'fundamentos, evolución, objeto, fuentes, campos y problemas contemporáneos (2025-2026) · ', size: 22 }), new TextRun({ text: 'Duración: ', bold: true, size: 22 }), new TextRun({ text: '120 minutos · ', size: 22 }), new TextRun({ text: 'Docente: ', bold: true, size: 22 }), new TextRun({ text: 'Carlos Arturo Ramos Mejía', size: 22 })]));
children.push(P([new TextRun({ text: 'Nombre del estudiante: ______________________________________   Código: ______________   Grupo: ______', size: 22 })], { after: 200 }));

children.push(H1('1. Instrucciones'));
children.push(P('Antes de la clase (tiempo estimado: dos horas).', { bold: true }));
children.push(N([new TextRun({ text: 'Lea la lectura asignada (sección 3) y elabore la ficha de lectura de una página (actividad 6.1). Se entrega al inicio de la clase.', size: 22 })]));
children.push(N([new TextRun({ text: `Lea la ${S.id} directamente en la relatoría de la Corte Constitucional (enlace en la sección 4) y llene en lápiz la matriz de análisis (actividad 6.2). Lea completos los antecedentes, el planteamiento de los problemas jurídicos, el acápite sobre el uso de inteligencia artificial y la parte resolutiva.`, size: 22 })]));
children.push(N([new TextRun({ text: 'Traiga esta guía impresa o en su dispositivo.', size: 22 })]));
children.push(P('Durante la clase.', { bold: true }));
children.push(P('Participará en un ejercicio relámpago de clasificación, verá un video de apoyo, trabajará en grupo la matriz de la sentencia y resolverá un minicaso. Al final responderá un quiz corto y un ticket de salida.'));
children.push(P('Después de la clase.', { bold: true }));
children.push(P('Complete la matriz con lo discutido y conserve esta guía: la próxima sesión (protección de datos personales y habeas data) parte de aquí.'));

children.push(H1('2. Síntesis conceptual'));
children.push(H2('2.1 Qué es el Derecho Informático'));
children.push(P('Conjunto de principios, normas e instituciones que regulan las relaciones jurídicas en las que la información digital, los sistemas informáticos y las redes son objeto o instrumento de la conducta. Julio Téllez Valdés lo definió como el conjunto de leyes, normas y principios aplicables a los hechos y actos derivados de la informática. El nombre cambia según la época (Derecho de las nuevas tecnologías, Derecho de las TIC, Derecho digital); permanece el objeto.'));
children.push(table([
  ['Noción', 'Qué estudia', 'Ejemplo'],
  ['Derecho Informático', 'La informática como objeto de regulación', 'Ley 1581 de 2012 sobre datos personales'],
  ['Informática jurídica', 'La informática como herramienta del jurista', 'Un gestor de expedientes; un buscador de jurisprudencia'],
  ['Derecho de las telecomunicaciones', 'La infraestructura y los servicios de transmisión', 'Ley 1341 de 2009 y la CRC'],
], [2600, 3400, 3360], { boldFirst: true }));
children.push(P(''));
children.push(P([new TextRun({ text: 'Autonomía. ', bold: true, size: 22 }), new TextRun({ text: 'Se exigen cuatro campos: normativo (legislación propia), docente (cátedra propia), científico (doctrina e investigación) e institucional (autoridades propias). En Colombia existen los cuatro; la posición más sólida es que se trata de una disciplina con objeto, principios e instituciones propios, pero transversal a las demás ramas.', size: 22 })]));
children.push(H2('2.2 Evolución en cuatro etapas'));
children.push(table([
  ['Etapa', 'Qué ocurre en el mundo', 'Qué ocurre en Colombia'],
  ['1948-1990: cibernética y primeras leyes de datos', 'Wiener (1948); Losano y Frosini (1968); leyes de datos de Hesse (1970), Suecia (1973), EE. UU. (1974) y Francia (1978); Convenio 108 (1981)', 'Constitución de 1991, art. 15: habeas data; T-414 de 1992'],
  ['1990-2008: comercio electrónico y equivalencia funcional', 'Ley Modelo CNUDMI (1996); Directiva 95/46; Lessig, el código como regulación (1999)', 'Ley 527 de 1999'],
  ['2001-2016: ciberdelincuencia, datos como derecho fundamental y gobierno digital', 'Convenio de Budapest (2001); RGPD (2016)', 'Ley 1266 de 2008; Ley 1273 de 2009; Ley 1341 de 2009; C-748 de 2011 y Ley 1581 de 2012; Decreto 1377 de 2013; Ley 1712 de 2014; Ley 1928 de 2018'],
  ['2017-2026: inteligencia artificial y justicia digital', 'Principios OCDE (2019); Recomendación UNESCO (2021); Reglamento europeo de IA (2024)', 'CONPES 3975 de 2019 y 4144 de 2025; Ley 2213 de 2022; Circular Externa 002 de 2024 de la SIC; T-323 de 2024; STC17832-2025'],
], [2800, 3300, 3260], { zebra: true, boldFirst: true }));
children.push(P(''));
children.push(H2('2.3 Objeto y fuentes'));
children.push(P([new TextRun({ text: 'Objeto: ', bold: true, size: 22 }), new TextRun({ text: '(i) la información sobre las personas (datos, habeas data, identidad digital); (ii) los actos y hechos por medios electrónicos (contratos, firmas, prueba, trámites); (iii) las conductas lesivas contra sistemas e información (delitos informáticos). La inteligencia artificial atraviesa los tres.', size: 22 })]));
children.push(table([
  ['Nivel', 'Fuente', 'Contenido de cabecera'],
  ['Constitución', 'Arts. 15, 20, 61, 74', 'Intimidad y habeas data; información; propiedad intelectual; documentos públicos'],
  ['Tratados y soft law', 'Convenio de Budapest (Ley 1928 de 2018); Convenio 108; Recomendación UNESCO (2021); principios OCDE (2019)', 'Tipos penales y cooperación; estándares de datos; principios para la IA'],
  ['Leyes estatutarias', 'Ley 1266 de 2008; Ley 1581 de 2012; Ley 1712 de 2014', 'Habeas data financiero; régimen general de datos; transparencia'],
  ['Leyes ordinarias', 'Ley 527 de 1999; Ley 1273 de 2009; Ley 1341 de 2009; Ley 2213 de 2022', 'Mensajes de datos; delitos informáticos; sector TIC; justicia digital'],
  ['Reglamentos y regulación', 'Decretos 1377 de 2013 y 1074 de 2015; Circular Externa 002 de 2024 de la SIC; resoluciones de la CRC', 'Desarrollo de la Ley 1581; IA y datos; comunicaciones'],
  ['Jurisprudencia', 'T-414 de 1992; SU-082 de 1995; C-748 de 2011; T-277 de 2015; T-323 de 2024; STC17832-2025', 'Habeas data; control de la ley de datos; derecho al olvido; IA en la decisión judicial'],
  ['Autorregulación y código', 'Políticas de tratamiento, términos de servicio, estándares técnicos', 'La arquitectura técnica también regula'],
], [2200, 3800, 3360], { zebra: true, boldFirst: true }));
children.push(P(''));
children.push(H2('2.4 Siete principios estructurales'));
[
  ['Equivalencia funcional', ' (Ley 527 de 1999, arts. 6 a 8): el mensaje de datos cumple la función del escrito, la firma y el original.'],
  ['Neutralidad tecnológica', ': la norma no privilegia una tecnología concreta.'],
  ['No discriminación del mensaje de datos', ' (Ley 527, arts. 5 y 10): no se le niega efecto jurídico ni fuerza probatoria por ser electrónico.'],
  ['Autodeterminación informativa', ' (art. 15 C.P.; Ley 1581 de 2012, art. 4): la persona decide sobre sus datos.'],
  ['Responsabilidad demostrada', ' (Decreto 1377 de 2013, arts. 26 y 27): quien trata datos prueba que cumple.'],
  ['Supervisión humana y no sustitución', ' (T-323 de 2024): la herramienta apoya, no decide.'],
  ['Transparencia y explicabilidad', ' (T-323 de 2024; Circular 002 de 2024 de la SIC): se informa que se usó la herramienta, cómo y para qué.'],
].forEach(([a, b]) => children.push(B([new TextRun({ text: a, bold: true, size: 22 }), new TextRun({ text: b, size: 22 })], 'num2')));
children.push(H2('2.5 Mapa de campos'));
children.push(table([
  ['Campo', 'Pregunta que responde', 'Norma de cabecera'],
  ['Datos personales y habeas data', '¿Quién controla la información sobre mí?', 'Art. 15 C.P.; Leyes 1266 de 2008 y 1581 de 2012'],
  ['Comercio electrónico y contratación', '¿Vale lo que pacto por medios electrónicos?', 'Ley 527 de 1999'],
  ['Prueba electrónica', '¿Cómo se aporta y valora un mensaje de datos?', 'Ley 527, arts. 10 y 11; CGP, art. 247'],
  ['Delitos informáticos', '¿Qué conductas digitales son delito?', 'Ley 1273 de 2009; Convenio de Budapest'],
  ['Propiedad intelectual digital', '¿A quién pertenece el software, la obra y el dato?', 'Ley 23 de 1982; Decisión Andina 351; Ley 1915 de 2018'],
  ['Gobierno y justicia digital', '¿Cómo se relaciona el ciudadano con el Estado en línea?', 'CPACA; Ley 2213 de 2022; Ley 1712 de 2014'],
  ['Inteligencia artificial', '¿Quién responde por la decisión asistida por una máquina?', 'CONPES 4144 de 2025; Circular 002 de 2024 de la SIC; T-323 de 2024'],
], [2800, 3300, 3260], { zebra: true, boldFirst: true }));
children.push(P(''));

children.push(H1('3. Lectura asignada'));
children.push(P([new TextRun({ text: 'Lectura principal. ', bold: true, size: 22 }), new TextRun({ text: L.referencia_apa + ' ', size: 22 })]));
children.push(P([new TextRun({ text: 'Enlace al PDF: ', size: 22 }), Link(L.url, L.url), new TextRun({ text: ' · Página del recurso: ', size: 22 }), Link(L.url_pagina, L.url_pagina)]));
children.push(P([new TextRun({ text: 'Qué leer: ', bold: true, size: 22 }), new TextRun({ text: L.acceso, size: 22 })]));
children.push(P([new TextRun({ text: 'Complemento colombiano (10 páginas). ', bold: true, size: 22 }), new TextRun({ text: L.complemento.texto + ' ', size: 22 }), Link('Página editorial', L.complemento.url)]));
children.push(P([new TextRun({ text: 'Alternativa arbitrada reciente (opcional). ', bold: true, size: 22 }), new TextRun({ text: L.alternativa_2025.texto + ' ', size: 22 }), Link('Ver artículo', L.alternativa_2025.url)]));
children.push(P('Guía de lectura. Mientras lee, responda en sus notas:', { bold: true }));
[
  '¿Cómo distingue el texto la informática jurídica del derecho informático, y qué lugar le da a la inteligencia artificial aplicada al derecho?',
  '¿Qué argumentos ofrece sobre la denominación (derecho informático o derecho digital) y sobre las características de la disciplina?',
  '¿Qué papel cumplen la neutralidad tecnológica y la mínima intervención como criterios regulatorios? ¿Los reconoce usted en la Ley 527 de 1999?',
  'En el complemento colombiano, ¿qué campos del derecho informático trabajaba el GECTI desde 2002 y qué diagnóstico hace sobre la enseñanza de la materia en las facultades del país?',
].forEach(t => children.push(B(t, 'num3')));
children.push(P([new TextRun({ text: 'Pregunta de la ficha: ', bold: true, size: 22 }), new TextRun({ text: L.pregunta_ficha, italics: true, size: 22 })]));

children.push(H1(`4. Sentencia hito: ${S.id}`));
children.push(table([
  ['Dato', 'Contenido'],
  ['Corporación y sala', 'Corte Constitucional, ' + S.sala],
  ['Magistrado ponente', S.mp],
  ['Fecha', S.fecha],
  ['Expediente', S.expediente],
  ['Tema', 'Uso de inteligencia artificial generativa (ChatGPT 3.5) por un juez al resolver una tutela de salud; condiciones del uso de IA en la Rama Judicial'],
  ['Texto oficial', S.url],
  ['Material de apoyo', 'ABC de la Sentencia T-323 de 2024, Consejo Superior de la Judicatura (Circular PCSJC24-37 de 2024): https://escuelajudicial.ramajudicial.gov.co/sites/default/files/ABC_SentenciaIA_T323De2024.pdf'],
], [2400, 6960], { boldFirst: true }));
children.push(P(''));
children.push(P([new TextRun({ text: 'Cómo leerla. ', bold: true, size: 22 }), new TextRun({ text: 'Identifique primero la parte resolutiva y luego devuélvase a los problemas jurídicos; subraye cada vez que la Corte diga qué puede y qué no puede hacer la IA en la función judicial; anote los criterios que fija para la Rama Judicial. Distinga lo que la Corte necesitó para decidir el caso (ratio) de lo que dijo para orientar casos futuros (reglas prospectivas y órdenes).', size: 22 })]));
children.push(P('Síntesis de referencia (para contrastar después del taller, no antes).', { bold: true }));
[['Hechos', S.hechos], ['Problemas jurídicos', S.problema], ['Decisión', S.decision], ['Ratio decidendi', S.ratio], ['Regla o subregla', S.regla], ['Precedente', S.precedente]].forEach(([a, b]) => children.push(B([new TextRun({ text: a + ': ', bold: true, size: 22 }), new TextRun({ text: b, size: 22 })])));
children.push(P([new TextRun({ text: 'Línea jurisprudencial para ubicar la sentencia: ', bold: true, size: 22 }), new TextRun({ text: S.linea.map(l => `${l.sentencia} (${l.aporte})`).join('; ') + '.', size: 22 })]));
children.push(P([new TextRun({ text: 'Para el contraste: ', bold: true, size: 22 }), new TextRun({ text: 'Corte Suprema de Justicia, Sala de Casación Civil, STC17832-2025 (noviembre de 2025): dejó sin efectos una decisión de un tribunal superior que citó providencias de la Corte Suprema con pasajes inexistentes, y advirtió sobre el uso no verificado de IA. Consúltela en https://cortesuprema.gov.co', size: 22 })]));

children.push(H1('5. Video de apoyo'));
children.push(P([new TextRun({ text: V.titulo + '. ', bold: true, size: 22 }), new TextRun({ text: `${V.experto}${V.credenciales ? ' (' + V.credenciales + ')' : ''}. ${V.canal}${V.fecha ? ', ' + V.fecha : ''}${V.duracion ? ', duración ' + V.duracion : ''}. `, size: 22 }), Link(V.url, V.url)]));
if (V.resumen_corto) children.push(P([new TextRun({ text: 'De qué trata: ', bold: true, size: 22 }), new TextRun({ text: V.resumen_corto, size: 22 })]));
children.push(P([new TextRun({ text: 'Consigna de visionado activo: ', bold: true, size: 22 }), new TextRun({ text: V.consigna, size: 22 })]));
children.push(P('Preguntas para después del video:', { bold: true }));
(V.preguntas.length ? V.preguntas : ['¿Qué problema actual del Derecho Informático plantea el experto y en cuál de los tres grupos del objeto lo ubica usted?', '¿Qué principio de la sesión está en juego y qué norma colombiana lo recoge?', '¿Qué haría usted, como abogado, distinto después de ver el video?']).forEach(t => children.push(B(t, 'num4')));

children.push(H1('6. Actividades'));
children.push(H2('6.1 Actividad individual (antes de la clase): ficha de lectura'));
children.push(P('Una página, letra 11, con cuatro apartados: (a) tesis del autor en dos líneas; (b) tres ideas centrales con la página donde aparecen; (c) una crítica fundamentada; (d) respuesta a la pregunta de la ficha. Se entrega al inicio de la clase.'));
children.push(H2('6.2 Actividad grupal (en clase, 23 minutos): matriz de análisis de la sentencia'));
children.push(P('Grupos de cuatro. Completen la matriz y luego respondan la pregunta de contraste. Un relator expone en dos minutos.'));
children.push(table([['Elemento', 'Su análisis'], ...['Hechos relevantes', 'Problema jurídico (en forma de pregunta)', 'Decisión (qué resolvió la Corte)', 'Ratio decidendi (la razón necesaria para decidir)', 'Regla o subregla jurisprudencial', 'Precedente que establece (a quién vincula y para qué casos)', 'Obiter dicta relevantes', 'Utilidad para el ejercicio profesional', 'Crítica del grupo'].map(e => [e, ' \n \n '])], [3400, 5960], { boldFirst: true }));
children.push(P(''));
children.push(P([new TextRun({ text: 'Pregunta de contraste. ', bold: true, size: 22 }), new TextRun({ text: S.pregunta_contraste, size: 22 })]));
children.push(...blank(3));
children.push(H2('6.3 Preguntas orientadoras para la discusión'));
[
  '¿Es el Derecho Informático una rama autónoma o un método transversal? Defienda una posición con los cuatro criterios de autonomía.',
  '¿Qué cambia en el razonamiento probatorio cuando el documento es un mensaje de datos? Relacione la Ley 527 de 1999 con el artículo 247 del Código General del Proceso.',
  '¿Por qué el habeas data es un derecho fundamental autónomo y no una simple manifestación de la intimidad? Use la T-414 de 1992.',
  `Si la Corte dijo en la ${S.id} que el juez no delegó su decisión, ¿por qué fijó criterios y dio órdenes? ¿Qué tipo de precedente es ese?`,
  '¿Debe prohibirse la IA generativa en los despachos judiciales, regularse o dejarse a la autorregulación? Use la lectura y el video.',
  '¿Quién responde cuando un sistema automatizado niega un servicio de salud: el programador, la EPS o el funcionario que lo adoptó?',
].forEach(t => children.push(B(t, 'num5')));

children.push(H1('7. Ejercicios de aplicación (en clase, 10 minutos; un caso por grupo)'));
F.casos.forEach((c, i) => { children.push(P([new TextRun({ text: `Caso ${i + 1}. ${c.titulo}. `, bold: true, size: 22 }), new TextRun({ text: c.texto.replace(/\n\n/g, ' '), size: 22 })])); children.push(...blank(3)); });

children.push(H1('8. Evaluación y cierre'));
children.push(H2('8.1 Quiz (5 minutos, respuesta breve)'));
F.quiz.forEach(q => { children.push(B(q, 'num6')); children.push(...blank(1)); });
children.push(H2('8.2 Ticket de salida'));
children.push(P('Una regla que me llevo:', { bold: true })); children.push(...blank(1));
children.push(P('Una duda que me queda:', { bold: true })); children.push(...blank(1));
children.push(H2('8.3 Criterios de evaluación'));
children.push(table([['Componente', 'Peso', 'Criterio'], ['Ficha de lectura', '30 %', 'Comprensión de la tesis del autor, ideas con página, capacidad crítica'], ['Matriz de la sentencia', '40 %', 'Precisión en hechos, problema, ratio y regla; distinción entre ratio y obiter; calidad del contraste'], ['Aplicación y quiz', '30 %', 'Uso correcto de las reglas en el caso; respuestas del quiz']], [2800, 1200, 5360], { boldFirst: true }));
children.push(P(''));

children.push(H1('9. Referencias y enlaces'));
F.referencias.forEach(r => children.push(B(r.url ? [new TextRun({ text: r.texto + ' ', size: 22 }), Link(r.url, r.url)] : r.texto)));
children.push(P(''));
children.push(P('Fecha de corte de las fuentes: 5 de octubre de 2026. El estado de verificación de cada fuente está en FUENTES.md / FUENTES.docx de la carpeta de la clase.', { italics: true, size: 20, color: GREY }));

const doc = new Document({
  creator: 'Carlos Arturo Ramos Mejía', title: 'Guía de trabajo: Derecho Informático',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { font: 'Cambria', size: 44, bold: true, color: NAVY }, paragraph: { spacing: { after: 120 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Cambria', size: 30, bold: true, color: NAVY }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Cambria', size: 25, bold: true, color: TEAL }, paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: ['bul'].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] })).concat(['num', 'num2', 'num3', 'num4', 'num5', 'num6'].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] }))) },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1300, bottom: 1300, left: 1300 } } }, children }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('OK', OUT, b.length); });
