// Generador de DIAPOSITIVAS - Clase Derecho Informático (Tecnología y Derecho, UFPS)
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { applyTheme } = require('/root/.claude/skills/synced/fa8f1208-14cf-4912-ad5e-dd86e63d955e_bfb753fc-4c9e-4e5f-82d6-c5898d1c5fff/pptx/scripts/apply_theme.js');

const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'fuentes.json'), 'utf8'));
const OUT = process.argv[2] || path.join(__dirname, 'DIAPOSITIVAS_Derecho_Informatico.pptx');

const THEME = {
  name: 'Derecho Informatico UFPS',
  headFontFace: 'Cambria',
  bodyFontFace: 'Calibri',
  colors: {
    dk1: '1F2240', lt1: 'FFFFFF', dk2: '3C3F5C', lt2: 'EEF1F8',
    accent1: '0E8C8C', accent2: 'E39B2C', accent3: 'B33951', accent4: '5C6BC0', accent5: '7FB7BE', accent6: 'C9CCE0',
    hlink: '0E8C8C', folHlink: '3C3F5C',
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.author = 'Carlos Arturo Ramos Mejía';
pres.title = 'Derecho Informático: fundamentos, evolución, objeto, fuentes y campos';
pres.subject = 'Clase de la asignatura Tecnología y Derecho';
const C = pres.SchemeColor;

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: 'DARK', background: { color: HEX.dk1 },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 1.6, w: 8.8, h: 1.4, fontSize: 40, bold: true, color: C.background1, align: 'left', valign: 'bottom', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: 0.6, y: 3.1, w: 8.8, h: 1.2, fontSize: 18, color: C.accent6, align: 'left', valign: 'top', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 9.2, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.accent6 },
});
pres.defineSlideMaster({
  title: 'LIGHT', background: { color: HEX.lt1 },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 0.35, w: 7.6, h: 0.8, fontSize: 24, bold: true, color: C.text1, align: 'left', valign: 'middle', margin: 0 }, text: '' } },
    { text: { text: 'Tecnología y Derecho · Derecho Informático · UFPS', options: { x: 0.5, y: 5.22, w: 6, h: 0.3, fontSize: 9, color: C.text2, margin: 0, isTextBox: true } } },
  ],
  slideNumber: { x: 9.2, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.text2 },
});
pres.defineSlideMaster({
  title: 'SECTION', background: { color: HEX.dk2 },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 2.0, w: 8.8, h: 1.2, fontSize: 38, bold: true, color: C.background1, align: 'left', valign: 'bottom', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: 0.6, y: 3.3, w: 8.8, h: 0.9, fontSize: 18, color: C.accent6, align: 'left', valign: 'top', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 9.2, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.accent6 },
});

// ---------- helpers ----------
let n = 0;
const tag = (slide, txt, color) => slide.addText(txt, { x: 8.2, y: 0.45, w: 1.3, h: 0.32, fontSize: 9, bold: true, color: C.background1, fill: { color: color || C.accent1 }, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'bloque' });
function light(title, sectionTitle, blockTag, notes) {
  const s = pres.addSlide({ masterName: 'LIGHT', sectionTitle });
  s.addText(title, { placeholder: 'title' });
  if (blockTag) tag(s, blockTag.text, blockTag.color);
  if (notes) s.addNotes(notes);
  n++;
  return s;
}
function section(title, sub, sectionTitle, notes) {
  const s = pres.addSlide({ masterName: 'SECTION', sectionTitle });
  s.addText(title, { placeholder: 'title' });
  if (sub) s.addText(sub, { placeholder: 'body' });
  if (notes) s.addNotes(notes);
  n++;
  return s;
}
function card(s, x, y, w, h, head, body, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: opts.fill || C.background2 }, line: { color: opts.fill || C.background2 }, rectRadius: 0.08, objectName: 'card ' + head });
  if (opts.num !== undefined) {
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.15, y: y + 0.15, w: 0.42, h: 0.42, fill: { color: opts.accent || C.accent1 }, line: { color: opts.accent || C.accent1 }, objectName: 'num ' + head });
    s.addText(String(opts.num), { x: x + 0.15, y: y + 0.15, w: 0.42, h: 0.42, fontSize: 13, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'numtxt ' + head });
  }
  const hx = opts.num !== undefined ? x + 0.68 : x + 0.18;
  s.addText(head, { x: hx, y: y + 0.1, w: w - (hx - x) - 0.15, h: 0.45, fontSize: opts.headSize || 13, bold: true, color: opts.headColor || C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'head ' + head });
  s.addText(body, { x: x + 0.18, y: y + 0.58, w: w - 0.36, h: h - 0.68, fontSize: opts.bodySize || 11, color: opts.bodyColor || C.text2, valign: 'top', margin: 0, isTextBox: true, objectName: 'body ' + head });
}
function bullets(s, items, x, y, w, h, size = 13, color) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 6 } })), { x, y, w, h, fontSize: size, color: color || C.text1, valign: 'top', margin: 0, isTextBox: true, objectName: 'lista' });
}
const trunc = (t, m) => (t && t.length > m ? t.slice(0, m - 1).replace(/\s+\S*$/, '') + '…' : (t || ''));

// ================= SLIDES =================
pres.addSection({ title: 'Apertura' });
// 1 Portada
{
  const s = pres.addSlide({ masterName: 'DARK', sectionTitle: 'Apertura' });
  s.addText('Asignatura Tecnología y Derecho · Sesión de 120 minutos', { x: 0.6, y: 0.9, w: 8.8, h: 0.4, fontSize: 13, color: C.accent2, bold: true, margin: 0, isTextBox: true, objectName: 'kicker' });
  s.addText('Derecho Informático', { placeholder: 'title' });
  s.addText('Fundamentos, evolución, objeto, fuentes, campos y problemas contemporáneos (2025-2026)', { placeholder: 'body' });
  s.addText('Programa de Derecho · Universidad Francisco de Paula Santander\nDocente: Carlos Arturo Ramos Mejía', { x: 0.6, y: 4.3, w: 8.8, h: 0.8, fontSize: 12, color: C.accent6, margin: 0, isTextBox: true, objectName: 'pie' });
  s.addShape(pres.ShapeType.ellipse, { x: 8.1, y: 0.7, w: 1.3, h: 1.3, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: 'motivo' });
  s.addText('§', { x: 8.1, y: 0.7, w: 1.3, h: 1.3, fontSize: 44, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'motivo-txt' });
  s.addNotes('Bienvenida (minuto 0-8). Pregunta detonante en la siguiente diapositiva. Anunciar la regla del día: toda cita que hagamos se abre en la fuente oficial. Materiales: guía de trabajo (entregada una semana antes), lectura académica, sentencia hito, video.');
  n++;
}
// 2 Pregunta detonante + agenda
{
  const s = light('Dos preguntas para empezar', 'Apertura', { text: 'APERTURA 0-8' }, 'Recoger tres respuestas rápidas a mano alzada. Anotar en el tablero: las dos preguntas son, en realidad, las dos preguntas fundacionales del Derecho Informático: quién controla la información sobre las personas y quién responde por la decisión asistida por una máquina. Presentar la agenda.');
  const ag = [
    ['0-8', 'Apertura y objetivos'], ['8-25', 'Fundamentos: qué es y qué no es'], ['25-45', 'Evolución, objeto y fuentes'], ['45-60', 'Principios y mapa de campos'],
    ['60-70', 'Pausa'], ['70-82', 'Video y discusión'], ['82-105', 'Taller: sentencia hito'], ['105-120', 'Aplicación, cierre y evaluación'],
  ];
  ag.forEach(([m, t], i) => {
    const col = i < 4 ? 0 : 1; const row = i % 4;
    const x = 0.5 + col * 4.6, y = 2.2 + row * 0.72;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.3, h: 0.62, fill: { color: C.background2 }, line: { color: C.background2 }, rectRadius: 0.08, objectName: 'ag' + i });
    s.addText(m, { x: x + 0.15, y, w: 1.0, h: 0.62, fontSize: 13, bold: true, color: C.accent1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'agm' + i });
    s.addText(t, { x: x + 1.2, y, w: 3.0, h: 0.62, fontSize: 12, color: C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'agt' + i });
  });
  ['¿Un juez puede preguntarle a ChatGPT?', '¿Un banco puede guardar su deuda para siempre?'].forEach((q, i) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.5 + i * 4.6, y: 1.2, w: 4.3, h: 0.6, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'q' + i });
    s.addText(q, { x: 0.65 + i * 4.6, y: 1.2, w: 4.0, h: 0.6, fontSize: 14, bold: true, color: C.background1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'qt' + i });
  });
  s.addText('Agenda de la sesión (minutos)', { x: 0.5, y: 1.9, w: 6, h: 0.28, fontSize: 11, color: C.text2, italic: true, margin: 0, isTextBox: true, objectName: 'agl' });
}
// 3 Objetivos
{
  const s = light('Objetivos de aprendizaje', 'Apertura', { text: 'APERTURA 0-8' }, 'Leer los seis objetivos. Señalar que el 5 y el 6 se evalúan con la matriz de la sentencia y los minicasos de la guía de trabajo.');
  const obj = [
    ['Definir', 'el Derecho Informático y distinguirlo de la informática jurídica y del Derecho de las telecomunicaciones; explicar el debate sobre su autonomía.'],
    ['Reconstruir', 'su evolución en cuatro etapas y ubicar los hitos colombianos (art. 15 C.P., Ley 527/1999, Ley 1273/2009, Ley 1581/2012, T-323/2024).'],
    ['Identificar', 'objeto, fuentes y principios estructurales (equivalencia funcional, neutralidad tecnológica, autodeterminación informativa, responsabilidad demostrada).'],
    ['Mapear', 'los campos de la disciplina con su norma de cabecera en Colombia.'],
    ['Analizar', `la ${F.sentencia.id} con el método hechos, problema jurídico, decisión, ratio decidendi, regla y precedente.`],
    ['Aplicar', 'las reglas estudiadas a minicasos y formular una regla propia de uso responsable de herramientas digitales en la práctica jurídica.'],
  ];
  obj.forEach(([v, t], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    card(s, 0.5 + col * 4.6, 1.3 + row * 1.27, 4.4, 1.2, v, t, { num: i + 1, bodySize: 10.5 });
  });
}

// ---------- FUNDAMENTOS ----------
pres.addSection({ title: 'Fundamentos' });
section('1. Fundamentos', '¿Qué es el Derecho Informático y qué no es?', 'Fundamentos', 'Minuto 8-25. Tres diapositivas y un ejercicio relámpago.');
{
  const s = light('Qué es el Derecho Informático', 'Fundamentos', { text: 'FUNDAMENTOS 8-25' }, `Definición de trabajo y definición clásica de Julio Téllez Valdés (conjunto de leyes, normas y principios aplicables a los hechos y actos derivados de la informática). Lo esencial: la información digital y los sistemas que la procesan son OBJETO o MEDIO de la conducta regulada. Contrastar con la lectura asignada (${F.lectura.autores_cortos}, ${F.lectura.anio}).`);
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.3, w: 9.0, h: 1.15, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'def' });
  s.addText([
    { text: 'Conjunto de principios, normas e instituciones que regulan las relaciones jurídicas en las que ', options: { color: C.background1 } },
    { text: 'la información digital, los sistemas informáticos y las redes', options: { color: C.accent2, bold: true } },
    { text: ' son el objeto o el instrumento de la conducta.', options: { color: C.background1 } },
  ], { x: 0.75, y: 1.3, w: 8.5, h: 1.15, fontSize: 15, valign: 'middle', margin: 0, isTextBox: true, objectName: 'deftxt' });
  const rows = [
    ['Derecho Informático', 'La informática como objeto de regulación', 'Ley 1581 de 2012 (datos personales)'],
    ['Informática jurídica', 'La informática como herramienta del jurista', 'Gestor de expedientes; buscador de jurisprudencia'],
    ['Derecho de las telecomunicaciones', 'La infraestructura y los servicios de transmisión', 'Ley 1341 de 2009 y la CRC'],
  ];
  rows.forEach((r, i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 2.7, 2.9, 2.3, r[0], r[1] + '\n\nEjemplo: ' + r[2], { fill: C.background2, headSize: 13, bodySize: 11, headColor: i === 0 ? C.accent1 : C.text1 });
  });
}
{
  const s = light('¿Rama autónoma o método transversal?', 'Fundamentos', { text: 'FUNDAMENTOS 8-25' }, 'Los cuatro criterios clásicos de autonomía. En Colombia los cuatro existen. Posición defendible: disciplina con objeto, principios e instituciones propios, pero transversal al derecho civil, penal, constitucional, administrativo, laboral y procesal. La lectura asignada toma posición: pedir a los estudiantes que la identifiquen.');
  const crit = [
    ['Normativo', 'Legislación propia: Ley 527/1999, Ley 1266/2008, Ley 1273/2009, Ley 1581/2012, Ley 2213/2022.'],
    ['Docente', 'Cátedras y posgrados: Departamento de Derecho Informático del Externado; GECTI de Uniandes (2001); esta asignatura.'],
    ['Científico', 'Doctrina, revistas y grupos de investigación especializados en Colombia e Iberoamérica.'],
    ['Institucional', 'Autoridades propias: Delegatura de Protección de Datos de la SIC, CRC, MinTIC, Agencia Nacional Digital.'],
  ];
  crit.forEach(([h, b], i) => card(s, 0.5 + (i % 2) * 4.6, 1.3 + Math.floor(i / 2) * 1.55, 4.4, 1.4, h, b, { num: i + 1, accent: C.accent4 }));
  s.addText('Tesis de la clase: disciplina con objeto, principios e instituciones propios, de carácter transversal.', { x: 0.5, y: 4.5, w: 9, h: 0.5, fontSize: 13, italic: true, bold: true, color: C.accent1, margin: 0, isTextBox: true, objectName: 'tesis' });
}
{
  const s = light('Ejercicio relámpago (5 minutos)', 'Fundamentos', { text: 'EJERCICIO 5 min', color: C.accent2 }, 'Claves: 1 informática jurídica. 2 Derecho Informático (datos personales, Ley 1581/2012). 3 Derecho de las telecomunicaciones. 4 Derecho Informático (prueba electrónica, Ley 527/1999 y art. 247 CGP). 5 ambas: informática jurídica como herramienta y Derecho Informático como problema regulado (T-323/2024).');
  const items = [
    'Un juzgado implementa un software para gestionar sus expedientes.',
    'Una app pide acceso a los contactos y la ubicación del usuario para funcionar.',
    'La CRC fija condiciones de interconexión entre operadores móviles.',
    'Una empresa aporta como prueba la captura de pantalla de un chat de WhatsApp.',
    'Un juez usa una IA generativa para redactar parte de una sentencia.',
  ];
  items.forEach((t, i) => {
    s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: 1.35 + i * 0.72, w: 0.5, h: 0.5, fill: { color: C.accent2 }, line: { color: C.accent2 }, objectName: 'e' + i });
    s.addText(String(i + 1), { x: 0.5, y: 1.35 + i * 0.72, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'en' + i });
    s.addText(t, { x: 1.15, y: 1.35 + i * 0.72, w: 5.3, h: 0.5, fontSize: 13, color: C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'et' + i });
  });
  ['Derecho Informático', 'Informática jurídica', 'Derecho de las telecomunicaciones'].forEach((t, i) => {
    s.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.5 + i * 1.05, w: 2.7, h: 0.85, fill: { color: C.background2 }, line: { color: C.accent1, width: 1 }, rectRadius: 0.1, objectName: 'cat' + i });
    s.addText(t, { x: 6.8, y: 1.5 + i * 1.05, w: 2.7, h: 0.85, fontSize: 12, bold: true, color: C.text1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'catt' + i });
  });
}

// ---------- EVOLUCIÓN, OBJETO, FUENTES ----------
pres.addSection({ title: 'Evolución, objeto y fuentes' });
section('2. Evolución, objeto y fuentes', 'Cuatro etapas, tres grupos de relaciones y una pirámide normativa', 'Evolución, objeto y fuentes', 'Minuto 25-45.');
{
  const s = light('Evolución: cuatro etapas', 'Evolución, objeto y fuentes', { text: 'EVOLUCIÓN 25-45' }, 'Etapa 1: cibernética (Wiener 1948), iuscibernética (Losano, Frosini 1968), primeras leyes de datos (Hesse 1970, Suecia 1973, EE. UU. 1974, Francia 1978), Convenio 108 (1981). Etapa 2: Ley Modelo CNUDMI 1996, Directiva 95/46, Lessig 1999. Etapa 3: Convenio de Budapest 2001, RGPD 2016. Etapa 4: Reglamento europeo de IA 2024, Recomendación UNESCO 2021.');
  const et = [
    ['1948-1990', 'Cibernética y primeras leyes de datos', 'Wiener; Losano y Frosini; leyes de Hesse, Suecia, EE. UU. y Francia; Convenio 108 (1981).', C.accent4],
    ['1990-2008', 'Comercio electrónico y equivalencia funcional', 'Ley Modelo CNUDMI (1996); Directiva 95/46; Lessig: «el código es ley» (1999).', C.accent1],
    ['2001-2016', 'Ciberdelincuencia y datos como derecho', 'Convenio de Budapest (2001); gobierno digital; RGPD (2016).', C.accent2],
    ['2017-2026', 'Inteligencia artificial y justicia digital', 'Principios OCDE (2019); Recomendación UNESCO (2021); Reglamento europeo de IA (2024).', C.accent3],
  ];
  s.addShape(pres.ShapeType.line, { x: 0.7, y: 2.0, w: 8.6, h: 0, line: { color: C.accent6, width: 2 }, objectName: 'tl' });
  et.forEach(([a, h, b, col], i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.85, y: 1.8, w: 0.4, h: 0.4, fill: { color: col }, line: { color: col }, objectName: 'dot' + i });
    s.addText(a, { x, y: 1.3, w: 2.1, h: 0.4, fontSize: 13, bold: true, color: col, align: 'center', margin: 0, isTextBox: true, objectName: 'a' + i });
    s.addText(h, { x, y: 2.35, w: 2.1, h: 0.7, fontSize: 12, bold: true, color: C.text1, align: 'center', valign: 'top', margin: 0, isTextBox: true, objectName: 'h' + i });
    s.addText(b, { x, y: 3.1, w: 2.1, h: 1.6, fontSize: 10.5, color: C.text2, align: 'center', valign: 'top', margin: 0, isTextBox: true, objectName: 'b' + i });
  });
  s.addText('La pregunta cambia: de quién controla la información, a qué vale lo electrónico, a qué conductas son delito, a quién responde por la decisión de una máquina.', { x: 0.5, y: 4.7, w: 9, h: 0.45, fontSize: 11.5, italic: true, color: C.accent1, margin: 0, isTextBox: true, objectName: 'cierre' });
}
{
  const s = light('Hitos colombianos (1991-2026)', 'Evolución, objeto y fuentes', { text: 'EVOLUCIÓN 25-45' }, `Línea colombiana. Subrayar que la ${F.sentencia.id} es la sentencia hito que se analiza en el taller. T-323/2024: uso de IA generativa por un juez. STC17832-2025 de la Corte Suprema: providencia con citas inexistentes. CONPES 4144/2025: política nacional de IA.`);
  const h = [
    ['1991', 'Art. 15 C.P.: habeas data'], ['1992', 'T-414/92: libertad informática'], ['1999', 'Ley 527: mensajes de datos'], ['2008', 'Ley 1266: habeas data financiero'],
    ['2009', 'Ley 1273: delitos informáticos'], ['2012', 'Ley 1581 (C-748/11): datos'], ['2022', 'Ley 2213: justicia digital'], ['2024-26', 'T-323/24 · Circular SIC 002 · CONPES 4144'],
  ];
  s.addShape(pres.ShapeType.line, { x: 0.7, y: 2.75, w: 8.6, h: 0, line: { color: C.accent6, width: 2 }, objectName: 'tl2' });
  h.forEach(([a, t], i) => {
    const x = 0.45 + i * 1.14; const up = i % 2 === 0;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.37, y: 2.6, w: 0.3, h: 0.3, fill: { color: i === 1 ? C.accent3 : C.accent1 }, line: { color: i === 1 ? C.accent3 : C.accent1 }, objectName: 'hd' + i });
    s.addText(a, { x, y: up ? 1.35 : 3.05, w: 1.05, h: 0.35, fontSize: 12, bold: true, color: C.text1, align: 'center', margin: 0, isTextBox: true, objectName: 'ha' + i });
    s.addText(t, { x: x - 0.05, y: up ? 1.7 : 3.4, w: 1.15, h: 0.85, fontSize: 9.5, color: C.text2, align: 'center', valign: 'top', margin: 0, isTextBox: true, objectName: 'ht' + i });
  });
  s.addText('Sentencia hito de la sesión: ' + F.sentencia.id + ' (M.P. ' + F.sentencia.mp + ')', { x: 0.5, y: 4.55, w: 9, h: 0.4, fontSize: 12, bold: true, color: C.accent3, margin: 0, isTextBox: true, objectName: 'hito' });
}
{
  const s = light('Objeto: tres grupos de relaciones', 'Evolución, objeto y fuentes', { text: 'OBJETO 25-45' }, 'Los tres grupos del objeto. La IA atraviesa los tres: datos de entrenamiento, actos automatizados, nuevos riesgos. Pedir un ejemplo de la vida cotidiana por grupo.');
  const g = [
    ['La información sobre las personas', 'Datos personales, habeas data, identidad digital, derecho al olvido.', C.accent1],
    ['Los actos por medios electrónicos', 'Contratos, firmas, documentos y prueba electrónica, trámites ante el Estado.', C.accent4],
    ['Las conductas lesivas', 'Delitos informáticos, ciberseguridad, fraude digital.', C.accent3],
  ];
  g.forEach(([h, b, col], i) => card(s, 0.5 + i * 3.05, 1.35, 2.9, 2.2, h, b, { num: i + 1, accent: col, headSize: 13, bodySize: 11.5 }));
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 3.8, w: 9.0, h: 1.1, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'ia' });
  s.addText([{ text: 'La inteligencia artificial atraviesa los tres: ', options: { bold: true, color: C.accent2 } }, { text: 'se alimenta de datos, produce actos y decisiones por medios electrónicos y genera riesgos nuevos (sesgos, alucinaciones, suplantación).', options: { color: C.background1 } }], { x: 0.75, y: 3.8, w: 8.5, h: 1.1, fontSize: 13, valign: 'middle', margin: 0, isTextBox: true, objectName: 'iat' });
}
{
  const s = light('Fuentes en Colombia', 'Evolución, objeto y fuentes', { text: 'FUENTES 25-45' }, 'Pirámide de fuentes. Recordar que las leyes de datos (1266, 1581, 1712) son estatutarias y pasaron por control previo de la Corte (C-1011/08, C-748/11, C-274/13). Última capa: la lex informatica, el diseño técnico también regula (Lessig).');
  const lv = [
    ['Constitución', 'Arts. 15, 20, 61, 74', 1.0],
    ['Tratados y soft law', 'Convenio de Budapest (Ley 1928/2018); Convenio 108; UNESCO 2021; OCDE 2019', 1.7],
    ['Leyes estatutarias', 'Ley 1266/2008 · Ley 1581/2012 · Ley 1712/2014', 2.4],
    ['Leyes ordinarias', 'Ley 527/1999 · Ley 1273/2009 · Ley 1341/2009 · Ley 2213/2022', 3.1],
    ['Reglamentos y regulación', 'Decretos 1377/2013 y 1074/2015 · Circular SIC 002/2024 · CRC', 3.8],
    ['Jurisprudencia y autorregulación', 'T-414/92 · SU-082/95 · C-748/11 · T-323/24 · políticas de tratamiento · código', 4.5],
  ];
  const cols = [C.text1, C.text2, C.accent4, C.accent1, C.accent5, C.accent6];
  lv.forEach(([h, b, y], i) => {
    const w = 3.2 + i * 1.1; const x = 5.1 - w / 2;
    s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.62, fill: { color: cols[i] }, line: { color: C.background1, width: 1 }, objectName: 'lv' + i });
    const dark = i >= 4;
    s.addText([{ text: h + '  ', options: { bold: true } }, { text: b, options: { fontSize: 9.5 } }], { x: x + 0.1, y, w: w - 0.2, h: 0.62, fontSize: 11, color: dark ? C.text1 : C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'lvt' + i });
  });
  s.addText('«Lex informatica»: la arquitectura técnica también regula (Lessig, 1999).', { x: 0.5, y: 5.0, w: 6, h: 0.25, fontSize: 9.5, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: 'lex' });
}

// ---------- PRINCIPIOS Y CAMPOS ----------
pres.addSection({ title: 'Principios y campos' });
section('3. Principios y campos', 'Siete principios estructurales y siete campos con su norma de cabecera', 'Principios y campos', 'Minuto 45-60. Cada grupo recibe un campo y formula en una frase la pregunta que responde.');
{
  const s = light('Siete principios estructurales', 'Principios y campos', { text: 'PRINCIPIOS 45-60' }, 'Equivalencia funcional (Ley 527, arts. 6-8); neutralidad tecnológica; no discriminación del mensaje de datos (arts. 5 y 10); autodeterminación informativa (art. 15 C.P.; Ley 1581, art. 4); responsabilidad demostrada (Decreto 1377/2013, arts. 26-27, hoy Decreto 1074/2015); supervisión humana (T-323/2024); transparencia y explicabilidad (T-323/2024; Circular SIC 002/2024).');
  const p = [
    ['Equivalencia funcional', 'Ley 527/1999, arts. 6-8'], ['Neutralidad tecnológica', 'La norma no privilegia una tecnología'], ['No discriminación del mensaje', 'Ley 527/1999, arts. 5 y 10'],
    ['Autodeterminación informativa', 'Art. 15 C.P.; Ley 1581/2012, art. 4'], ['Responsabilidad demostrada', 'Decreto 1377/2013, arts. 26-27'], ['Supervisión humana', 'T-323/2024: la IA apoya, no decide'],
    ['Transparencia y explicabilidad', 'T-323/2024; Circular SIC 002/2024'],
  ];
  p.forEach(([h, b], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.5 + col * 2.3, y = 1.35 + row * 1.75;
    card(s, x, y, 2.15, 1.6, h, b, { num: i + 1, accent: [C.accent1, C.accent4, C.accent2, C.accent3][col], headSize: 11.5, bodySize: 10.5 });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 7.4, y: 3.1, w: 2.1, h: 1.6, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'preg' });
  s.addText('¿Cuál de estos principios protege al estudiante que firma un contrato por WhatsApp?', { x: 7.55, y: 3.1, w: 1.8, h: 1.6, fontSize: 11, bold: true, color: C.background1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'pregt' });
}
{
  const s = light('Mapa de campos y norma de cabecera', 'Principios y campos', { text: 'CAMPOS 45-60' }, 'Actividad de 8 minutos: cada grupo toma un campo y formula la pregunta que responde y un caso de la vida real. Puesta en común de una frase por grupo.');
  const rows = [
    ['Campo', 'Pregunta que responde', 'Norma de cabecera'],
    ['Datos personales y habeas data', '¿Quién controla la información sobre mí?', 'Art. 15 C.P.; Leyes 1266/2008 y 1581/2012'],
    ['Comercio electrónico y contratación', '¿Vale lo que pacto por medios electrónicos?', 'Ley 527/1999'],
    ['Prueba electrónica', '¿Cómo se aporta y valora un mensaje de datos?', 'Ley 527, arts. 10-11; CGP, art. 247'],
    ['Delitos informáticos', '¿Qué conductas digitales son delito?', 'Ley 1273/2009; Convenio de Budapest'],
    ['Propiedad intelectual digital', '¿A quién pertenece el software, la obra y el dato?', 'Ley 23/1982; Decisión Andina 351; Ley 1915/2018'],
    ['Gobierno y justicia digital', '¿Cómo me relaciono con el Estado en línea?', 'CPACA; Ley 2213/2022; Ley 1712/2014'],
    ['Inteligencia artificial', '¿Quién responde por la decisión asistida por una máquina?', 'CONPES 4144/2025; Circular SIC 002/2024; T-323/2024'],
  ];
  const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: i === 0 || j === 0, color: i === 0 ? HEX.lt1 : HEX.dk1, fill: { color: i === 0 ? HEX.dk1 : (i % 2 ? HEX.lt2 : HEX.lt1) }, fontSize: 10.5, fontFace: 'Calibri', valign: 'middle', margin: 0.05 } })));
  s.addTable(tbl, { x: 0.5, y: 1.3, w: 9.0, colW: [2.6, 3.3, 3.1], rowH: 0.44, border: { type: 'solid', color: HEX.lt1, pt: 1 }, objectName: 'tabla campos' });
}
{
  const s = light('Problemas contemporáneos (2024-2026)', 'Principios y campos', { text: 'ACTUALIDAD 45-60' }, 'Siete problemas abiertos. Conectar con el video y con los minicasos. Pedir a los estudiantes que ubiquen cada problema en uno de los tres grupos del objeto.');
  const pr = [
    ['IA generativa en la justicia', 'Alucinaciones, confidencialidad del expediente, trazabilidad de la decisión (T-323/2024; STC17832-2025).'],
    ['Biometría y datos sensibles', 'Reconocimiento facial, huella, prueba de necesidad y proporcionalidad.'],
    ['Deepfakes y clonación de voz', 'Identidad, honra, prueba y fraude.'],
    ['Fraude digital y ciberdelincuencia', 'Phishing, suplantación, acceso abusivo: la Ley 1273/2009 ante conductas de 2026.'],
    ['Decisiones automatizadas', 'Crédito, salud, empleo y Estado: perfilamiento, sesgos, derecho a una explicación.'],
    ['Jurisdicción y territorialidad', 'Proveedores en el exterior; transferencia y transmisión internacional de datos.'],
  ];
  pr.forEach(([h, b], i) => card(s, 0.5 + (i % 3) * 3.05, 1.3 + Math.floor(i / 3) * 1.85, 2.9, 1.7, h, b, { headSize: 12, bodySize: 10.5, fill: i % 2 ? C.background2 : C.background2 }));
}

// ---------- LECTURA ----------
pres.addSection({ title: 'Lectura académica' });
{
  const L = F.lectura;
  const s = light('Lectura asignada', 'Lectura académica', { text: 'LECTURA' }, `Ficha: ${L.referencia_apa}\nTesis y aportes: ${L.resumen_corto}\nPregunta de la ficha de lectura: ${L.pregunta_ficha}`);
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.3, w: 4.3, h: 3.7, fill: { color: C.background2 }, line: { color: C.background2 }, rectRadius: 0.08, objectName: 'ficha' });
  s.addText([
    { text: 'FICHA', options: { bold: true, color: C.accent1, fontSize: 10, breakLine: true } },
    { text: L.titulo, options: { bold: true, fontSize: 13, breakLine: true, paraSpaceAfter: 6 } },
    { text: L.autores, options: { fontSize: 11.5, breakLine: true } },
    { text: `${L.tipo}. ${L.revista}, ${L.anio}.`, options: { fontSize: 11, color: C.text2, breakLine: true, paraSpaceAfter: 6 } },
    { text: L.acceso, options: { fontSize: 10.5, color: C.text2, breakLine: true, paraSpaceAfter: 6 } },
    { text: 'Abrir el texto', options: { fontSize: 11, bold: true, color: C.accent1, hyperlink: { url: L.url } } },
  ], { x: 0.7, y: 1.4, w: 3.9, h: 3.5, valign: 'top', margin: 0, isTextBox: true, objectName: 'fichat' });
  s.addText('Qué aporta a la sesión', { x: 5.1, y: 1.3, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: 'qa' });
  bullets(s, L.aportes.slice(0, 4), 5.1, 1.7, 4.4, 2.0, 10.5, C.text2);
  s.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 3.75, w: 4.4, h: 1.25, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'pf' });
  s.addText([{ text: 'Pregunta de la ficha de lectura: ', options: { bold: true, color: C.accent2 } }, { text: L.pregunta_ficha, options: { color: C.background1 } }], { x: 5.3, y: 3.75, w: 4.05, h: 1.25, fontSize: 11.5, valign: 'middle', margin: 0, isTextBox: true, objectName: 'pft' });
}
{
  const L = F.lectura;
  const s = light('Lectura: ideas centrales', 'Lectura académica', { text: 'LECTURA' }, 'Contrastar con lo expuesto: ¿qué agrega o discute el texto? Citas tomadas literalmente del PDF (página indicada).');
  const citas = ((L.citas && L.citas.length) ? L.citas : (L.ideas_centrales || []).map(t => ({ cita: t, pagina: '' }))).slice(0, 3);
  citas.forEach((c, i) => {
    const y = 1.3 + i * 1.25;
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y, w: 9.0, h: 1.1, fill: { color: C.background2 }, line: { color: C.background2 }, rectRadius: 0.08, objectName: 'cita' + i });
    s.addText('“', { x: 0.6, y: y - 0.05, w: 0.5, h: 0.7, fontSize: 40, bold: true, color: C.accent2, margin: 0, isTextBox: true, objectName: 'q' + i });
    s.addText([{ text: trunc(c.cita, 330), options: { italic: true } }, { text: c.pagina ? `  (p. ${c.pagina})` : '', options: { color: C.accent1, bold: true } }], { x: 1.1, y, w: 8.2, h: 1.1, fontSize: 11, color: C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'cq' + i });
  });
}

// ---------- VIDEO ----------
pres.addSection({ title: 'Video' });
{
  const V = F.video;
  const s = light('Video: Carissa Véliz (TEDxPorto, 2025)', 'Video', { text: 'VIDEO 70-82', color: C.accent3 }, `Proyectar completo (${V.duracion}). Luego las tres preguntas. Enlace: ${V.url}. Verificado el 5 de octubre de 2026: canal ${V.canal}, publicado ${V.fecha}. ${V.resumen_corto}`);
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.3, w: 4.3, h: 3.7, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'vcard' });
  s.addShape(pres.ShapeType.ellipse, { x: 2.15, y: 1.55, w: 1.0, h: 1.0, fill: { color: C.accent3 }, line: { color: C.accent3 }, objectName: 'play' });
  s.addText('▶', { x: 2.15, y: 1.55, w: 1.0, h: 1.0, fontSize: 30, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'playt' });
  s.addText([
    { text: V.experto, options: { bold: true, fontSize: 13, color: C.background1, breakLine: true } },
    { text: trunc(V.credenciales, 150), options: { fontSize: 10.5, color: C.accent6, breakLine: true, paraSpaceAfter: 6 } },
    { text: `${V.canal} · ${V.fecha} · ${V.duracion}`, options: { fontSize: 10.5, color: C.accent2, breakLine: true, paraSpaceAfter: 8 } },
    { text: 'Abrir el video', options: { fontSize: 12, bold: true, color: C.background1, hyperlink: { url: V.url } } },
  ], { x: 0.7, y: 2.7, w: 3.9, h: 2.2, valign: 'top', margin: 0, isTextBox: true, objectName: 'vtxt' });
  s.addText('Consigna de visionado activo', { x: 5.1, y: 1.3, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: 'cons' });
  s.addText(V.consigna, { x: 5.1, y: 1.65, w: 4.4, h: 0.9, fontSize: 11.5, color: C.text2, valign: 'top', margin: 0, isTextBox: true, objectName: 'const' });
  s.addText('Preguntas para la discusión', { x: 5.1, y: 2.6, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: 'pd' });
  bullets(s, V.preguntas.slice(0, 3), 5.1, 2.95, 4.4, 2.1, 11, C.text2);
}

// ---------- SENTENCIA HITO ----------
pres.addSection({ title: 'Sentencia hito' });
{
  const S = F.sentencia;
  section(`4. Sentencia hito: ${S.id}`, `Corte Constitucional · M.P. ${S.mp} · ${S.fecha}`, 'Sentencia hito', `Minuto 82-105. Taller en grupos de cuatro con la matriz de la guía. Texto oficial: ${S.url}`);
}
{
  const S = F.sentencia;
  const s = light('Hechos y problema jurídico', 'Sentencia hito', { text: 'SENTENCIA 82-105', color: C.accent3 }, `Hechos: ${S.hechos}\n\nProblema jurídico: ${S.problema}`);
  s.addText('Hechos', { x: 0.5, y: 1.3, w: 4.3, h: 0.35, fontSize: 13, bold: true, color: C.accent3, margin: 0, isTextBox: true, objectName: 'hh' });
  s.addText(trunc(S.hechos_corto, 620), { x: 0.5, y: 1.65, w: 4.3, h: 3.4, fontSize: 11.5, color: C.text1, valign: 'top', margin: 0, isTextBox: true, objectName: 'ht' });
  s.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 1.3, w: 4.4, h: 3.7, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'pj' });
  s.addText([{ text: 'Problema jurídico', options: { bold: true, color: C.accent2, fontSize: 13, breakLine: true, paraSpaceAfter: 8 } }, { text: trunc(S.problema_corto, 520), options: { color: C.background1, fontSize: 12 } }], { x: 5.3, y: 1.45, w: 4.0, h: 3.4, valign: 'top', margin: 0, isTextBox: true, objectName: 'pjt' });
}
{
  const S = F.sentencia;
  const s = light('Decisión, ratio decidendi y regla', 'Sentencia hito', { text: 'SENTENCIA 82-105', color: C.accent3 }, `Decisión: ${S.decision}\n\nRatio: ${S.ratio}\n\nRegla: ${S.regla}\n\nPrecedente: ${S.precedente}`);
  card(s, 0.5, 1.3, 2.9, 3.7, 'Decisión', trunc(S.decision_corto, 430), { headColor: C.accent3, bodySize: 10 });
  card(s, 3.55, 1.3, 2.9, 3.7, 'Ratio decidendi', trunc(S.ratio_corto, 430), { headColor: C.accent3, bodySize: 10 });
  card(s, 6.6, 1.3, 2.9, 3.7, 'Regla o subregla', trunc(S.regla_corto, 430), { headColor: C.accent3, bodySize: 10, fill: C.background2 });
}
{
  const S = F.sentencia;
  const s = light('En palabras de la Corte', 'Sentencia hito', { text: 'SENTENCIA 82-105', color: C.accent3 }, 'Citas literales tomadas del texto oficial en la relatoría de la Corte Constitucional (verificadas el 5 de octubre de 2026).');
  (S.citas || []).slice(0, 3).forEach((c, i) => {
    const y = 1.3 + i * 1.25;
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y, w: 9.0, h: 1.1, fill: { color: C.background2 }, line: { color: C.background2 }, rectRadius: 0.08, objectName: 'sc' + i });
    s.addText('“', { x: 0.6, y: y - 0.05, w: 0.5, h: 0.7, fontSize: 40, bold: true, color: C.accent3, margin: 0, isTextBox: true, objectName: 'sq' + i });
    s.addText([{ text: trunc(c.cita, 330), options: { italic: true } }, { text: c.ubicacion ? `  (${c.ubicacion})` : '', options: { color: C.accent1, bold: true } }], { x: 1.1, y, w: 8.2, h: 1.1, fontSize: 11, color: C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'scq' + i });
  });
}
{
  const S = F.sentencia;
  const s = light('Precedente y línea jurisprudencial', 'Sentencia hito', { text: 'SENTENCIA 82-105', color: C.accent3 }, `Precedente: ${S.precedente}\nUtilidad pedagógica: ${S.utilidad}`);
  const ln = (S.linea || []).slice(0, 6);
  s.addShape(pres.ShapeType.line, { x: 0.7, y: 2.1, w: 8.6, h: 0, line: { color: C.accent6, width: 2 }, objectName: 'tl3' });
  ln.forEach((l, i) => {
    const w = 8.6 / Math.max(ln.length, 1); const x = 0.5 + i * w;
    s.addShape(pres.ShapeType.ellipse, { x: x + w / 2 - 0.15, y: 1.95, w: 0.3, h: 0.3, fill: { color: C.accent3 }, line: { color: C.accent3 }, objectName: 'ld' + i });
    s.addText(l.sentencia, { x, y: 1.45, w, h: 0.4, fontSize: 11, bold: true, color: C.text1, align: 'center', margin: 0, isTextBox: true, objectName: 'ls' + i });
    s.addText(trunc(l.aporte, 120), { x: x + 0.05, y: 2.4, w: w - 0.1, h: 1.3, fontSize: 9.5, color: C.text2, align: 'center', valign: 'top', margin: 0, isTextBox: true, objectName: 'la' + i });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 3.85, w: 9.0, h: 1.2, fill: { color: C.text1 }, line: { color: C.text1 }, rectRadius: 0.08, objectName: 'prec' });
  s.addText([{ text: 'Precedente: ', options: { bold: true, color: C.accent2 } }, { text: trunc(S.precedente_corto, 330), options: { color: C.background1 } }], { x: 0.7, y: 3.85, w: 8.6, h: 1.2, fontSize: 11.5, valign: 'middle', margin: 0, isTextBox: true, objectName: 'prect' });
}
{
  const s = light('Taller: matriz de análisis (23 min)', 'Sentencia hito', { text: 'TALLER 82-105', color: C.accent2 }, 'Grupos de cuatro. Completan la matriz de la guía de trabajo (sección 6.2) y responden la pregunta de contraste. Un relator expone en dos minutos. Insistir en distinguir ratio de obiter.');
  const m = ['Hechos relevantes', 'Problema jurídico (en forma de pregunta)', 'Decisión', 'Ratio decidendi', 'Regla o subregla', 'Precedente: a quién vincula y para qué casos', 'Obiter dicta relevantes', 'Utilidad para el ejercicio profesional', 'Crítica del grupo'];
  m.forEach((t, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05, y = 1.3 + row * 1.0;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.9, h: 0.85, fill: { color: C.background2 }, line: { color: C.accent2, width: 1 }, rectRadius: 0.08, objectName: 'm' + i });
    s.addText([{ text: `${i + 1}  `, options: { bold: true, color: C.accent2 } }, { text: t, options: { color: C.text1 } }], { x: x + 0.15, y, w: 2.65, h: 0.85, fontSize: 11.5, valign: 'middle', margin: 0, isTextBox: true, objectName: 'mt' + i });
  });
  s.addText('Pregunta de contraste: ' + F.sentencia.pregunta_contraste, { x: 0.5, y: 4.35, w: 9.0, h: 0.7, fontSize: 11.5, italic: true, bold: true, color: C.accent3, valign: 'top', margin: 0, isTextBox: true, objectName: 'pc' });
}

// ---------- APLICACIÓN Y CIERRE ----------
pres.addSection({ title: 'Aplicación y cierre' });
{
  const s = light('Ejercicios de aplicación (10 min)', 'Aplicación y cierre', { text: 'APLICACIÓN 105-115', color: C.accent2 }, F.casos.map((c, i) => `Caso ${i + 1} (${c.titulo}). Clave: ${c.clave}`).join('\n\n'));
  F.casos.slice(0, 3).forEach((c, i) => card(s, 0.5 + i * 3.05, 1.3, 2.9, 3.7, c.titulo, c.texto, { num: i + 1, accent: C.accent2, headSize: 12, bodySize: 10.5 }));
}
{
  const s = light('Conclusiones', 'Aplicación y cierre', { text: 'CIERRE 115-120' }, 'Cerrar con las cinco conclusiones y volver a la pregunta detonante.');
  const con = [
    'El Derecho Informático regula relaciones en las que la información digital es objeto o medio de la conducta; no es «el derecho de los computadores».',
    'Es una disciplina con objeto, principios e instituciones propios, pero transversal a todas las ramas.',
    'Su evolución responde a cuatro preguntas: quién controla la información, qué vale lo electrónico, qué conductas son delito y quién responde por la decisión de una máquina.',
    `La ${F.sentencia.id} es el precedente que ${F.sentencia.conclusion_corta}`,
    'El abogado de 2026 necesita verificar en la fuente oficial, demostrar con mensajes de datos, consentir con responsabilidad demostrada y exigir explicaciones.',
  ];
  con.forEach((t, i) => {
    const y = 1.3 + i * 0.75;
    s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: y + 0.08, w: 0.45, h: 0.45, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: 'c' + i });
    s.addText(String(i + 1), { x: 0.5, y: y + 0.08, w: 0.45, h: 0.45, fontSize: 13, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: 'cn' + i });
    s.addText(t, { x: 1.1, y, w: 8.4, h: 0.62, fontSize: 12, color: C.text1, valign: 'middle', margin: 0, isTextBox: true, objectName: 'ct' + i });
  });
}
{
  const s = light('Evaluación y cierre', 'Aplicación y cierre', { text: 'CIERRE 115-120' }, 'Quiz de cinco preguntas (guía, sección 8.1) y ticket de salida. Pesos: ficha de lectura 30 %, matriz de la sentencia 40 %, aplicación y quiz 30 %.');
  card(s, 0.5, 1.3, 4.4, 3.7, 'Quiz de cinco preguntas (5 min)', F.quiz.map((q, i) => `${i + 1}. ${q}`).join('\n'), { headColor: C.accent1, bodySize: 10.5 });
  card(s, 5.1, 1.3, 4.4, 1.75, 'Ticket de salida', 'Una regla que me llevo.\nUna duda que me queda.', { headColor: C.accent2, bodySize: 12 });
  card(s, 5.1, 3.25, 4.4, 1.75, 'Evaluación de la sesión', 'Ficha de lectura: 30 %\nMatriz de la sentencia: 40 %\nAplicación y quiz: 30 %', { headColor: C.accent3, bodySize: 12 });
}
{
  const s = light('Referencias y enlaces', 'Aplicación y cierre', { text: 'REFERENCIAS' }, 'Todas las fuentes, con su estado de verificación, están en FUENTES.md / FUENTES.docx de la carpeta de la clase en Google Drive.');
  const refs = F.referencias.slice(0, 9);
  s.addText(refs.map((r, i) => ({ text: r.texto, options: { bullet: true, breakLine: i < refs.length - 1, paraSpaceAfter: 4, hyperlink: r.url ? { url: r.url } : undefined } })), { x: 0.5, y: 1.3, w: 9.0, h: 3.8, fontSize: 9.5, color: C.text1, valign: 'top', margin: 0, isTextBox: true, objectName: 'refs' });
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('OK', OUT, 'slides:', n + 4);
})();
