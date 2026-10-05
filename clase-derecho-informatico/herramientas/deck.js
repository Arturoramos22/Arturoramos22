const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const FA = require("react-icons/fa");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const CT = require("./content.js");

const OUT = process.argv[2] || "DIAPOSITIVAS.pptx";

const THEME = {
  name: "Derecho Informatico UFPS",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1F2E", lt1: "FFFFFF", dk2: "1F3A5F", lt2: "EEF3F8",
    accent1: "0E7C86", accent2: "D9931D", accent3: "5B7DB1", accent4: "B5413F", accent5: "4A6670", accent6: "9BA7B4",
    hlink: "0E7C86", folHlink: "5B7DB1"
  }
};
const H = THEME.colors;

async function iconData(Icon, hex) {
  const svg = renderToStaticMarkup(React.createElement(Icon, { size: 256, color: "#" + hex }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Carlos Arturo Ramos Mejía";
  pres.title = "Derecho Informático: clase integral (Tecnología y Derecho, UFPS)";
  const C = pres.SchemeColor;
  const W = 13.33, M = 0.6;

  const FOOT = "Tecnología y Derecho · Derecho Informático · UFPS";
  const footerObjs = (dark) => ([
    { text: { text: FOOT, options: { x: M, y: 7.0, w: 8, h: 0.3, fontSize: 10, color: dark ? C.accent6 : C.accent5, isTextBox: true, margin: 0 } } }
  ]);

  pres.defineSlideMaster({
    title: "DARK",
    background: { color: H.dk1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.5, w: W - 2 * M, h: 1.0, fontSize: 34, bold: true, color: C.background1, margin: 0, valign: "top" }, text: "" } },
      ...footerObjs(true)
    ],
    slideNumber: { x: W - 1.2, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: H.accent6 }
  });
  pres.defineSlideMaster({
    title: "LIGHT",
    background: { color: H.lt1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.45, w: W - 2 * M, h: 0.9, fontSize: 32, bold: true, color: C.text2, margin: 0, valign: "top" }, text: "" } },
      ...footerObjs(false)
    ],
    slideNumber: { x: W - 1.2, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: H.accent5 }
  });
  pres.defineSlideMaster({
    title: "COVER",
    background: { color: H.dk1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 2.3, w: W - 2 * M, h: 1.5, fontSize: 46, bold: true, color: C.background1, margin: 0, valign: "bottom" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: M, y: 3.9, w: W - 2 * M, h: 1.6, fontSize: 20, color: C.accent6, margin: 0, valign: "top" }, text: "" } }
    ]
  });

  // icon cache
  const icons = {};
  async function ic(name, hex) {
    const k = name + hex;
    if (!icons[k]) icons[k] = await iconData(FA[name], hex);
    return icons[k];
  }
  async function iconCircle(slide, x, y, d, name, fill, iconHex) {
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
    slide.addImage({ data: await ic(name, iconHex), x: x + d * 0.25, y: y + d * 0.25, w: d * 0.5, h: d * 0.5 });
  }
  function badge(slide, x, y, n, fill) {
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: 0.42, h: 0.42, fill: { color: fill }, line: { color: fill, width: 0 } });
    slide.addText(String(n), { x, y, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
  }
  function card(slide, x, y, w, h, fill, line) {
    slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: line || fill, width: line ? 0.75 : 0 } });
  }
  function notes(slide, t) { slide.addNotes(t); }
  const bul = (arr, opts = {}) => arr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1, paraSpaceAfter: opts.gap || 6 } }));

  // ---------- 1. Portada
  pres.addSection({ title: "Apertura" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Apertura" });
  s.addText("Derecho Informático", { placeholder: "title" });
  s.addText([
    { text: "Fundamentos, evolución, objeto, fuentes y campos", options: { breakLine: true } },
    { text: "Asignatura Tecnología y Derecho · Programa de Derecho · Universidad Francisco de Paula Santander", options: { fontSize: 15, breakLine: true } },
    { text: "Docente: Carlos Arturo Ramos Mejía · 2026", options: { fontSize: 15 } }
  ], { placeholder: "body" });
  await iconCircle(s, M, 0.9, 1.1, "FaBalanceScale", H.accent1, H.lt1);
  s.addText("Sesión integral · 120 minutos · lectura, sentencia hito y video", { x: M, y: 6.4, w: 10, h: 0.4, fontSize: 13, color: C.accent6, isTextBox: true, margin: 0 });
  notes(s, "Bienvenida (1 min). Anunciar la estructura: 50 minutos de fundamentos, pausa, video, taller de sentencia, aplicación y cierre. Recordar que la guía de trabajo se entregó una semana antes.");

  // ---------- 2. Pregunta detonante
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Apertura" });
  s.addText("¿Un juez puede preguntarle a ChatGPT?", { placeholder: "title" });
  await iconCircle(s, M, 1.9, 1.3, "FaRobot", H.accent2, H.dk1);
  s.addText("En enero de 2023 un juez de Cartagena resolvió una tutela de salud de un niño con autismo y transcribió en la sentencia las preguntas que le hizo a ChatGPT y las respuestas que recibió. La Corte Constitucional revisó el caso en 2024.", { x: 2.3, y: 1.8, w: 10.3, h: 1.6, fontSize: 18, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
  const opts = [["A", "Sí, es una herramienta más, como un buscador."], ["B", "Sí, pero debe decirlo y verificar lo que la máquina responde."], ["C", "No, porque la decisión judicial no admite intermediarios automáticos."]];
  for (let i = 0; i < 3; i++) {
    const y = 3.8 + i * 0.95;
    card(s, 2.3, y, 10.3, 0.78, H.dk2);
    s.addText(opts[i][0], { x: 2.5, y: y + 0.14, w: 0.5, h: 0.5, fontSize: 20, bold: true, color: C.accent2, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(opts[i][1], { x: 3.1, y: y + 0.1, w: 9.3, h: 0.58, fontSize: 16, color: C.background1, isTextBox: true, margin: 0, valign: "middle" });
  }
  s.addText("Vote a mano alzada. Volveremos a esta pregunta al final de la clase.", { x: 2.3, y: 6.55, w: 10, h: 0.35, fontSize: 13, italic: true, color: C.accent6, isTextBox: true, margin: 0 });
  notes(s, "Pregunta detonante (5 min). Recoger tres respuestas rápidas, una por opción si es posible. No resolver todavía: la respuesta la da la Sentencia T-323 de 2024 en el taller. Anotar en el tablero el conteo para compararlo al cierre.");

  // ---------- 3. Objetivos
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Apertura" });
  s.addText("Al terminar la sesión, usted podrá", { placeholder: "title" });
  const objs = [
    ["FaBook", "Definir", "el Derecho Informático y distinguirlo de la informática jurídica y del Derecho de las telecomunicaciones; explicar la discusión sobre su autonomía."],
    ["FaHistory", "Reconstruir", "su evolución en cuatro etapas y ubicar los hitos colombianos de 1991 a 2026."],
    ["FaLayerGroup", "Identificar", "su objeto, sus fuentes y sus principios estructurales."],
    ["FaSitemap", "Mapear", "sus siete campos con la norma de cabecera en Colombia."],
    ["FaGavel", "Analizar", "la Sentencia T-323 de 2024: hechos, problema, decisión, ratio, regla y precedente."],
    ["FaClipboardCheck", "Aplicar", "las reglas a casos cortos y formular su propia regla de uso responsable de herramientas digitales."]
  ];
  for (let i = 0; i < 6; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * 6.2, y = 1.6 + row * 1.7;
    await iconCircle(s, x, y, 0.8, objs[i][0], H.accent1, H.lt1);
    s.addText([{ text: objs[i][1] + " ", options: { bold: true, color: C.text2 } }, { text: objs[i][2], options: { color: C.text1 } }], { x: x + 1.0, y: y - 0.05, w: 4.9, h: 1.4, fontSize: 14, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Leer los seis verbos (2 min). Señalar que los objetivos 5 y 6 se evalúan en el taller y en el quiz.");

  // ---------- 4. Qué es
  pres.addSection({ title: "Fundamentos" });
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Fundamentos" });
  s.addText("Qué es el Derecho Informático", { placeholder: "title" });
  card(s, M, 1.55, 7.3, 2.3, H.lt2);
  s.addText([
    { text: "Definición de trabajo. ", options: { bold: true, color: C.text2 } },
    { text: "Conjunto de principios, normas e instituciones que regulan las relaciones jurídicas en las que la información digital, los sistemas informáticos y las redes son objeto o instrumento de la conducta.", options: { color: C.text1 } }
  ], { x: M + 0.3, y: 1.7, w: 6.7, h: 2.0, fontSize: 16, isTextBox: true, margin: 0, valign: "top" });
  card(s, M, 4.1, 7.3, 2.5, H.lt1, H.accent6);
  s.addText([
    { text: "Definición clásica (Julio Téllez Valdés). ", options: { bold: true, color: C.text2 } },
    { text: "Conjunto de leyes, normas y principios aplicables a los hechos y actos derivados de la informática.", options: { color: C.text1, breakLine: true } },
    { text: "Otros nombres según la época y el país: Derecho de la informática, Derecho de las nuevas tecnologías, Derecho de las TIC, Derecho digital, Ciberderecho. Cambia el nombre; permanece el objeto.", options: { color: C.accent5, fontSize: 13 } }
  ], { x: M + 0.3, y: 4.25, w: 6.7, h: 2.25, fontSize: 15, isTextBox: true, margin: 0, valign: "top" });
  // right: three circles
  const trio = [["FaDatabase", "Información", "datos, identidad, habeas data"], ["FaFileContract", "Actos electrónicos", "contratos, firmas, prueba, trámites"], ["FaUserSecret", "Conductas lesivas", "delitos informáticos, ciberseguridad"]];
  for (let i = 0; i < 3; i++) {
    const y = 1.55 + i * 1.75;
    await iconCircle(s, 8.5, y, 1.0, trio[i][0], H.accent2, H.dk1);
    s.addText([{ text: trio[i][1], options: { bold: true, color: C.text2, breakLine: true } }, { text: trio[i][2], options: { color: C.accent5, fontSize: 13 } }], { x: 9.7, y: y + 0.05, w: 3.0, h: 0.95, fontSize: 15, isTextBox: true, margin: 0, valign: "middle" });
  }
  s.addText("La inteligencia artificial atraviesa los tres grupos.", { x: 8.5, y: 6.15, w: 4.2, h: 0.55, fontSize: 13, italic: true, color: C.accent1, isTextBox: true, margin: 0 });
  notes(s, "Definición (5 min). Subrayar la diferencia entre 'objeto' (lo regulado) e 'instrumento' (el medio). Preguntar: ¿un contrato firmado por correo electrónico es Derecho Informático? Sí, en cuanto a validez y prueba del mensaje de datos; el fondo sigue siendo derecho civil o comercial.");

  // ---------- 5. Qué no es (3 columnas)
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Fundamentos" });
  s.addText("Tres nociones que se confunden", { placeholder: "title" });
  const cols = [
    ["FaBalanceScale", "Derecho Informático", "La informática como OBJETO de regulación", "Ley 1581 de 2012 sobre datos personales; Ley 1273 de 2009 sobre delitos informáticos", H.accent1],
    ["FaSearch", "Informática jurídica", "La informática como HERRAMIENTA del jurista: gestión, documentación, apoyo a la decisión", "Un sistema de gestión de expedientes; un buscador de jurisprudencia; una IA que resume un proceso", H.accent3],
    ["FaNetworkWired", "Derecho de las telecomunicaciones", "La INFRAESTRUCTURA y los servicios de transmisión", "Ley 1341 de 2009; Comisión de Regulación de Comunicaciones; espectro y redes", H.accent5]
  ];
  for (let i = 0; i < 3; i++) {
    const x = M + i * 4.1;
    card(s, x, 1.6, 3.85, 4.9, H.lt2);
    await iconCircle(s, x + 0.3, 1.9, 0.9, cols[i][0], cols[i][4], H.lt1);
    s.addText(cols[i][1], { x: x + 0.3, y: 2.95, w: 3.3, h: 0.8, fontSize: 18, bold: true, color: C.text2, isTextBox: true, margin: 0, valign: "top" });
    s.addText(cols[i][2], { x: x + 0.3, y: 3.8, w: 3.3, h: 0.9, fontSize: 14, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
    s.addText([{ text: "Ejemplo: ", options: { bold: true } }, { text: cols[i][3] }], { x: x + 0.3, y: 4.75, w: 3.3, h: 1.6, fontSize: 13, color: C.accent5, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Distinciones (4 min). La IA generativa cae en las tres casillas según el ángulo: como herramienta del juez es informática jurídica; como objeto regulado por la T-323 de 2024 es Derecho Informático.");

  // ---------- 6. Autonomía 2x2
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Fundamentos" });
  s.addText("¿Es una rama autónoma? Cuatro criterios", { placeholder: "title" });
  const crit = [
    ["FaBook", "Campo normativo", "Legislación propia", "Leyes 527 de 1999, 1266 de 2008, 1273 de 2009, 1581 de 2012, 2213 de 2022"],
    ["FaChalkboardTeacher", "Campo docente", "Cátedra y posgrados propios", "Departamento de Derecho Informático del Externado (30 años en 2026); GECTI de Uniandes (creado el 5 de octubre de 2001); esta asignatura"],
    ["FaLightbulb", "Campo científico", "Doctrina e investigación", "Revistas y observatorios; doctrina colombiana e iberoamericana; relatorías sobre IA y justicia 2024-2026"],
    ["FaUniversity", "Campo institucional", "Autoridades propias", "Delegatura de Protección de Datos de la SIC; CRC; MinTIC; Consejo Superior de la Judicatura (justicia digital)"]
  ];
  for (let i = 0; i < 4; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * 6.15, y = 1.55 + row * 2.45;
    card(s, x, y, 5.95, 2.25, H.lt2);
    await iconCircle(s, x + 0.25, y + 0.25, 0.75, crit[i][0], H.accent1, H.lt1);
    s.addText([{ text: crit[i][1], options: { bold: true, color: C.text2, breakLine: true } }, { text: crit[i][2], options: { color: C.accent5, fontSize: 13 } }], { x: x + 1.15, y: y + 0.2, w: 4.6, h: 0.85, fontSize: 17, isTextBox: true, margin: 0, valign: "top" });
    s.addText(crit[i][3], { x: x + 0.25, y: y + 1.15, w: 5.5, h: 1.0, fontSize: 13, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  }
  s.addText("Posición de la clase: disciplina con objeto, principios e instituciones propios, pero transversal: atraviesa el derecho civil, penal, constitucional, administrativo, laboral y procesal.", { x: M, y: 6.5, w: W - 2 * M, h: 0.45, fontSize: 13, italic: true, color: C.accent1, isTextBox: true, margin: 0 });
  notes(s, "Autonomía (5 min). Pedir que un estudiante argumente a favor y otro en contra. Cerrar con la posición intermedia.");

  // ---------- 7. Ejercicio relámpago
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Fundamentos" });
  s.addText("Ejercicio relámpago", { placeholder: "title" });
  s.addText("Derecho Informático (DI), informática jurídica (IJ) o Derecho de las telecomunicaciones (DT). Una puede caer en dos casillas.", { x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 14, color: C.accent6, isTextBox: true, margin: 0, valign: "top" });
  const sits = [
    "Un juzgado adopta un software para programar audiencias.",
    "La SIC sanciona a una empresa por enviar publicidad sin autorización del titular del dato.",
    "La CRC fija condiciones de calidad para el servicio de internet móvil.",
    "Un abogado aporta como prueba una conversación de WhatsApp.",
    "Un estudiante usa una IA para redactar una tutela y cita una sentencia que no existe."
  ];
  for (let i = 0; i < 5; i++) {
    const y = 2.15 + i * 0.88;
    card(s, M, y, W - 2 * M, 0.75, H.dk2);
    badge(s, M + 0.2, y + 0.165, i + 1, H.accent2);
    s.addText(sits[i], { x: M + 0.85, y: y + 0.08, w: 9.6, h: 0.6, fontSize: 16, color: C.background1, isTextBox: true, margin: 0, valign: "middle" });
    s.addText("DI · IJ · DT", { x: 10.6, y: y + 0.08, w: 2.0, h: 0.6, fontSize: 14, color: C.accent6, align: "right", isTextBox: true, margin: 0, valign: "middle" });
  }
  notes(s, "Ejercicio (4 min). Respuestas: 1 IJ. 2 DI (datos personales, Ley 1581). 3 DT. 4 DI (prueba electrónica, Ley 527 y art. 247 CGP). 5 IJ como herramienta y DI como problema regulado (T-323 de 2024, deberes del abogado).");

  // ---------- 8. Evolución: cuatro etapas
  pres.addSection({ title: "Evolución, objeto y fuentes" });
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Evolución, objeto y fuentes" });
  s.addText("Evolución: cuatro etapas", { placeholder: "title" });
  const etapas = [
    ["1948-1990", "Cibernética y primeras leyes de datos", "Wiener (1948); Losano y Frosini (1968); ley de Hesse (1970), Suecia (1973), EE. UU. (1974), Francia (1978); Convenio 108 (1981). Colombia: art. 15 C.P. (1991)", H.accent5],
    ["1990-2008", "Comercio electrónico y equivalencia funcional", "Ley Modelo CNUDMI (1996); Directiva 95/46; Lessig, el código como regulación (1999). Colombia: Ley 527 de 1999", H.accent3],
    ["2001-2016", "Ciberdelincuencia, datos como derecho fundamental y gobierno digital", "Convenio de Budapest (2001); RGPD (2016). Colombia: Leyes 1266 de 2008, 1273 de 2009, 1341 de 2009, 1581 de 2012, 1712 de 2014", H.accent1],
    ["2017-2026", "Inteligencia artificial y justicia digital", "Reglamento europeo de IA (2024). Colombia: CONPES 3975 de 2019 y 4144 de 2025; Ley 2213 de 2022; Circular 002 de 2024 SIC; T-323 de 2024; STC17832-2025; AC739-2026", H.accent2]
  ];
  s.addShape(pres.ShapeType.line, { x: M + 0.5, y: 2.35, w: W - 2 * M - 1.0, h: 0, line: { color: H.accent6, width: 2 } });
  for (let i = 0; i < 4; i++) {
    const x = M + i * 3.05;
    s.addShape(pres.ShapeType.ellipse, { x: x + 1.2, y: 2.15, w: 0.4, h: 0.4, fill: { color: etapas[i][3] }, line: { color: H.lt1, width: 2 } });
    s.addText(etapas[i][0], { x, y: 1.55, w: 2.85, h: 0.5, fontSize: 18, bold: true, color: C.text2, align: "center", isTextBox: true, margin: 0 });
    card(s, x, 2.8, 2.85, 3.9, H.lt2);
    s.addText(etapas[i][1], { x: x + 0.2, y: 2.95, w: 2.45, h: 1.0, fontSize: 15, bold: true, color: C.text2, isTextBox: true, margin: 0, valign: "top" });
    s.addText(etapas[i][2], { x: x + 0.2, y: 4.0, w: 2.45, h: 2.6, fontSize: 12.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Evolución (6 min). Hilo: cada etapa responde a una pregunta nueva. 1: quién controla la información. 2: qué vale lo electrónico. 3: qué conductas son delito y cómo se relaciona el ciudadano con el Estado. 4: quién responde por la decisión asistida por una máquina.");

  // ---------- 9. Hitos colombianos
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Evolución, objeto y fuentes" });
  s.addText("Hitos colombianos, 1991-2026", { placeholder: "title" });
  const hitos = [
    ["1991", "Constitución Política, art. 15: intimidad y habeas data; art. 20: información; art. 74: documentos públicos"],
    ["1992", "T-414 de 1992: primera sentencia de habeas data (dato financiero caduco)"],
    ["1999", "Ley 527: mensajes de datos, comercio electrónico y firmas digitales"],
    ["2008-2009", "Ley 1266 (habeas data financiero); Ley 1273 (delitos informáticos); Ley 1341 (sector TIC)"],
    ["2011-2013", "C-748 de 2011 y Ley 1581 de 2012 (datos personales); Decreto 1377 de 2013"],
    ["2014-2019", "Ley 1712 (transparencia); Ley 1928 de 2018 y C-224 de 2019 (Convenio de Budapest); CONPES 3975 (IA)"],
    ["2022-2024", "Ley 2213 (justicia digital permanente); Circular 002 de 2024 SIC (IA y datos); T-323 de 2024 (IA y juez)"],
    ["2025-2026", "CONPES 4144 (política nacional de IA); STC17832-2025 (citas inexistentes); AC739-2026 (Corte Suprema)"]
  ];
  const rows = hitos.map(r => ([
    { text: r[0], options: { bold: true, color: H.lt1, fill: { color: H.dk2 }, align: "center", valign: "middle" } },
    { text: r[1], options: { color: H.dk1, fill: { color: H.lt2 }, valign: "middle" } }
  ]));
  s.addTable(rows, { x: M, y: 1.55, w: W - 2 * M, colW: [1.8, W - 2 * M - 1.8], rowH: 0.62, fontSize: 13, fontFace: THEME.bodyFontFace, border: { type: "solid", color: H.lt1, pt: 2 }, margin: 0.08 });
  notes(s, "Hitos (4 min). No leer todo: señalar que la línea va de la información (1991-2012) a la decisión (2024-2026). Las normas se consultan en el texto oficial; la guía de trabajo trae los enlaces.");

  // ---------- 10. Objeto
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Evolución, objeto y fuentes" });
  s.addText("Objeto: tres grupos de relaciones", { placeholder: "title" });
  const obj = [
    ["FaDatabase", "La información sobre las personas", "Datos personales, habeas data, identidad digital, imagen y voz.", "Art. 15 C.P.; Leyes 1266 de 2008 y 1581 de 2012"],
    ["FaFileContract", "Los actos y hechos por medios electrónicos", "Contratos, firmas, documentos, prueba, trámites y notificaciones.", "Ley 527 de 1999; CGP art. 247; Ley 2213 de 2022"],
    ["FaShieldAlt", "Las conductas lesivas contra sistemas e información", "Acceso abusivo, interceptación, daño, hurto por medios informáticos, suplantación.", "Ley 1273 de 2009; Convenio de Budapest"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = M + i * 4.1;
    card(s, x, 1.65, 3.85, 4.1, H.dk2);
    await iconCircle(s, x + 1.4, 1.9, 1.05, obj[i][0], H.accent2, H.dk1);
    s.addText(obj[i][1], { x: x + 0.25, y: 3.1, w: 3.35, h: 0.8, fontSize: 16, bold: true, color: C.background1, align: "center", isTextBox: true, margin: 0, valign: "top" });
    s.addText(obj[i][2], { x: x + 0.25, y: 3.95, w: 3.35, h: 1.0, fontSize: 13.5, color: C.accent6, align: "center", isTextBox: true, margin: 0, valign: "top" });
    s.addText(obj[i][3], { x: x + 0.25, y: 5.0, w: 3.35, h: 0.65, fontSize: 12.5, color: C.accent2, align: "center", isTextBox: true, margin: 0, valign: "top" });
  }
  card(s, M, 6.0, W - 2 * M, 0.75, H.accent1);
  s.addText("La inteligencia artificial atraviesa los tres: trata datos, produce documentos y decisiones, y abre nuevas formas de daño.", { x: M + 0.3, y: 6.0, w: W - 2 * M - 0.6, h: 0.75, fontSize: 15, bold: true, color: C.background1, isTextBox: true, margin: 0, valign: "middle" });
  notes(s, "Objeto (3 min). Conectar con la diapositiva 4: aquí se desarrolla cada grupo con su norma de cabecera.");

  // ---------- 11. Fuentes (pirámide)
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Evolución, objeto y fuentes" });
  s.addText("Fuentes del Derecho Informático en Colombia", { placeholder: "title" });
  const niveles = [
    ["Constitución", "Arts. 15, 20, 61, 74", H.dk2],
    ["Tratados y soft law", "Convenio de Budapest (Ley 1928 de 2018); Convenio 108; Recomendación UNESCO sobre IA (2021); principios OCDE (2019)", H.accent5],
    ["Leyes estatutarias", "Ley 1266 de 2008; Ley 1581 de 2012; Ley 1712 de 2014", H.accent1],
    ["Leyes ordinarias", "Ley 527 de 1999; Ley 1273 de 2009; Ley 1341 de 2009; Ley 2213 de 2022", H.accent3],
    ["Reglamentos y regulación", "Decretos 1377 de 2013 y 1074 de 2015; circulares de la SIC (002 de 2024); resoluciones CRC", H.accent2],
    ["Jurisprudencia", "T-414 de 1992; SU-082 de 1995; C-748 de 2011; T-323 de 2024; STC17832-2025; AC739-2026", H.accent4],
    ["Autorregulación y código", "Políticas de tratamiento, términos de servicio, estándares técnicos: la arquitectura también regula (Lessig)", H.accent6]
  ];
  const baseW = 12.1, topW = 5.2, hgt = 0.7, startY = 1.55;
  for (let i = 0; i < niveles.length; i++) {
    const w = topW + (baseW - topW) * (i / (niveles.length - 1));
    const x = M + (W - 2 * M - w) / 2, y = startY + i * (hgt + 0.06);
    s.addShape(pres.ShapeType.rect, { x, y, w, h: hgt, fill: { color: niveles[i][2] }, line: { color: H.lt1, width: 1 } });
    s.addText([{ text: niveles[i][0] + "  ", options: { bold: true } }, { text: niveles[i][1], options: { fontSize: 11.5 } }], { x: x + 0.15, y, w: w - 0.3, h: hgt, fontSize: 14, color: C.background1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
  }
  notes(s, "Fuentes (5 min). Insistir en dos ideas: las leyes de datos son estatutarias porque regulan un derecho fundamental (por eso la C-748 de 2011 fue control previo); y el último nivel, el código, no es fuente formal pero condiciona de hecho lo que se puede hacer.");

  // ---------- 12. Lectura asignada
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Evolución, objeto y fuentes" });
  s.addText("Lectura asignada: qué agrega el autor", { placeholder: "title" });
  card(s, M, 1.55, 5.4, 5.1, H.lt2);
  await iconCircle(s, M + 0.25, 1.8, 0.8, "FaBook", H.accent1, H.lt1);
  s.addText([
    { text: CT.lectura.titulo, options: { bold: true, color: C.text2, breakLine: true } },
    { text: CT.lectura.autor, options: { color: C.text1, breakLine: true } },
    { text: CT.lectura.fuente, options: { color: C.accent5, fontSize: 12.5, breakLine: true } },
    { text: CT.lectura.url, options: { color: C.accent1, fontSize: 10.5, hyperlink: { url: CT.lectura.url }, breakLine: true } },
    { text: CT.lectura.urlComplemento, options: { color: C.accent1, fontSize: 10.5, hyperlink: { url: CT.lectura.urlComplemento } } }
  ], { x: M + 0.25, y: 2.75, w: 4.9, h: 3.8, fontSize: 12.5, isTextBox: true, margin: 0, valign: "top" });
  s.addText("Tres ideas para contrastar con la clase", { x: 6.4, y: 1.55, w: 6.3, h: 0.5, fontSize: 18, bold: true, color: C.text2, isTextBox: true, margin: 0 });
  for (let i = 0; i < 3; i++) {
    const y = 2.2 + i * 1.15;
    badge(s, 6.4, y + 0.05, i + 1, H.accent2);
    s.addText(CT.lectura.ideas[i], { x: 7.0, y, w: 5.7, h: 1.05, fontSize: 14, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  }
  card(s, 6.4, 5.7, 6.3, 0.95, H.dk2);
  s.addText([{ text: "Pregunta de la ficha: ", options: { bold: true } }, { text: CT.lectura.pregunta }], { x: 6.6, y: 5.75, w: 5.9, h: 0.85, fontSize: 13.5, color: C.background1, isTextBox: true, margin: 0, valign: "middle" });
  notes(s, "Lectura (5 min). Pedir a dos estudiantes que lean la tesis que anotaron en su ficha. Contrastar: ¿coincide con la definición y la posición sobre autonomía vistas en clase?");

  // ---------- 13. Principios
  pres.addSection({ title: "Principios y campos" });
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Principios y campos" });
  s.addText("Siete principios estructurales", { placeholder: "title" });
  const prin = [
    ["FaFileContract", "Equivalencia funcional", "El mensaje de datos cumple la función del escrito, la firma y el original (Ley 527 de 1999, arts. 6 a 8)."],
    ["FaMicrochip", "Neutralidad tecnológica", "La norma no privilegia una tecnología concreta para no quedar obsoleta."],
    ["FaCheckCircle", "No discriminación del mensaje de datos", "No se le niega efecto jurídico ni fuerza probatoria por ser electrónico (Ley 527, arts. 5 y 10)."],
    ["FaFingerprint", "Autodeterminación informativa", "La persona decide sobre sus datos; principios del art. 4 de la Ley 1581 de 2012."],
    ["FaClipboardCheck", "Responsabilidad demostrada", "Quien trata datos prueba que cumple (Decreto 1377 de 2013, arts. 26 y 27; Decreto 1074 de 2015)."],
    ["FaUsers", "Supervisión humana y no sustitución", "La herramienta apoya, no decide; el funcionario responde (T-323 de 2024)."],
    ["FaEye", "Transparencia y explicabilidad", "Se informa que se usó la herramienta, cómo y para qué (T-323 de 2024; Circular 002 de 2024 SIC)."]
  ];
  for (let i = 0; i < 7; i++) {
    const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4;
    const x = M + col * 6.2, y = 1.55 + row * 1.3;
    await iconCircle(s, x, y, 0.7, prin[i][0], H.accent1, H.lt1);
    s.addText([{ text: prin[i][1], options: { bold: true, color: C.text2, breakLine: true } }, { text: prin[i][2], options: { color: C.text1, fontSize: 12.5 } }], { x: x + 0.9, y: y - 0.05, w: 5.1, h: 1.2, fontSize: 14.5, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Principios (7 min). Los tres primeros vienen de la Ley 527; el cuarto y el quinto del régimen de datos; los dos últimos los formuló la Corte en 2024 para la IA y ya aparecen en la regulación de la SIC.");

  // ---------- 14. Problemas contemporáneos
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Principios y campos" });
  s.addText("Problemas contemporáneos, 2024-2026", { placeholder: "title" });
  const prob = [
    ["FaRobot", "IA generativa en la justicia y en la práctica", "Citas inexistentes, confidencialidad del expediente, trazabilidad de la decisión."],
    ["FaFingerprint", "Biometría y datos sensibles", "Reconocimiento facial y huella: prueba de necesidad y proporcionalidad."],
    ["FaMask", "Deepfakes y clonación de voz", "Identidad, honra, prueba y fraude."],
    ["FaUserSecret", "Fraude digital y ciberdelincuencia", "Phishing, suplantación y acceso abusivo frente a tipos penales de 2009."],
    ["FaSitemap", "Decisiones automatizadas", "Crédito, salud, empleo y Estado: perfilamiento, sesgos y derecho a una explicación."],
    ["FaGlobe", "Jurisdicción, territorio y brecha digital", "Proveedores en el exterior, transferencia internacional de datos, acceso efectivo a la justicia digital."]
  ];
  for (let i = 0; i < 6; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * 4.1, y = 1.6 + row * 2.6;
    card(s, x, y, 3.85, 2.4, H.dk2);
    await iconCircle(s, x + 0.25, y + 0.25, 0.7, prob[i][0], H.accent2, H.dk1);
    s.addText(prob[i][1], { x: x + 1.1, y: y + 0.2, w: 2.6, h: 0.85, fontSize: 14.5, bold: true, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
    s.addText(prob[i][2], { x: x + 0.25, y: y + 1.15, w: 3.35, h: 1.15, fontSize: 13, color: C.accent6, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Problemas (4 min). Preguntar cuál de los seis han visto en la práctica o en noticias de este año. El video y el taller profundizan el primero.");

  // ---------- 15. Mapa de campos
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Principios y campos" });
  s.addText("Mapa de campos y norma de cabecera", { placeholder: "title" });
  const campos = [
    ["Datos personales y habeas data", "¿Quién controla la información sobre mí?", "Art. 15 C.P.; Leyes 1266 de 2008 y 1581 de 2012", "T-414 de 1992; C-748 de 2011"],
    ["Comercio electrónico y contratación", "¿Vale lo que pacto por medios electrónicos?", "Ley 527 de 1999", "Contratos por WhatsApp y correo; firma electrónica"],
    ["Prueba electrónica", "¿Cómo se aporta y valora un mensaje de datos?", "Ley 527, arts. 10 y 11; CGP, art. 247", "Capturas de pantalla y cadena de custodia"],
    ["Delitos informáticos", "¿Qué conductas digitales son delito?", "Ley 1273 de 2009; Convenio de Budapest", "Acceso abusivo; hurto por medios informáticos; suplantación"],
    ["Propiedad intelectual digital", "¿A quién pertenece el software, la obra y el dato?", "Ley 23 de 1982; Decisión Andina 351; Ley 1915 de 2018", "Software, bases de datos, obras generadas con IA"],
    ["Gobierno y justicia digital", "¿Cómo se relaciona el ciudadano con el Estado en línea?", "CPACA (Ley 1437 de 2011); Ley 2213 de 2022; Ley 1712 de 2014", "Expediente digital; notificaciones electrónicas"],
    ["Inteligencia artificial", "¿Quién responde por la decisión asistida por una máquina?", "CONPES 4144 de 2025; Circular 002 de 2024 SIC; T-323 de 2024", "Juez y ChatGPT; STC17832-2025"]
  ];
  const head = ["Campo", "Pregunta que responde", "Norma de cabecera", "Caso o referencia"].map(t => ({ text: t, options: { bold: true, color: H.lt1, fill: { color: H.dk2 }, valign: "middle" } }));
  const body = campos.map((r, i) => r.map((c, j) => ({ text: c, options: { color: H.dk1, fill: { color: i % 2 ? H.lt1 : H.lt2 }, bold: j === 0, valign: "middle" } })));
  s.addTable([head, ...body], { x: M, y: 1.5, w: W - 2 * M, colW: [2.7, 3.3, 3.4, 2.73], rowH: [0.45, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62, 0.62], fontSize: 11.5, fontFace: THEME.bodyFontFace, border: { type: "solid", color: H.accent6, pt: 0.5 }, margin: 0.06 });
  notes(s, "Mapa (5 min). Actividad: cada grupo recibe un campo y escribe en una frase la pregunta que responde, sin mirar la tabla. Luego se compara.");

  // ---------- 16. Video
  pres.addSection({ title: "Video y sentencia hito" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Video y sentencia hito" });
  s.addText("Video de apoyo", { placeholder: "title" });
  card(s, M, 1.55, 6.0, 4.6, H.dk2);
  await iconCircle(s, M + 0.3, 1.85, 0.9, "FaVideo", H.accent2, H.dk1);
  s.addText([
    { text: CT.video.titulo, options: { bold: true, color: C.background1, fontSize: 17, breakLine: true } },
    { text: CT.video.experto, options: { color: C.accent6, breakLine: true } },
    { text: CT.video.canal + " · " + CT.video.fecha + " · " + CT.video.duracion, options: { color: C.accent6, fontSize: 12.5, breakLine: true } },
    { text: CT.video.url, options: { color: C.accent2, fontSize: 11.5, hyperlink: { url: CT.video.url } } }
  ], { x: M + 0.3, y: 2.95, w: 5.4, h: 3.1, fontSize: 14, isTextBox: true, margin: 0, valign: "top" });
  s.addText("Preguntas para la discusión", { x: 7.0, y: 1.55, w: 5.7, h: 0.5, fontSize: 18, bold: true, color: C.background1, isTextBox: true, margin: 0 });
  for (let i = 0; i < 3; i++) {
    const y = 2.25 + i * 1.3;
    badge(s, 7.0, y + 0.05, i + 1, H.accent2);
    s.addText(CT.video.preguntas[i], { x: 7.6, y, w: 5.1, h: 1.2, fontSize: 14, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
  }
  s.addText("Descargue el video antes de la clase; no navegue en vivo. Plan B en la guía de trabajo.", { x: M, y: 6.35, w: W - 2 * M, h: 0.4, fontSize: 12.5, italic: true, color: C.accent6, isTextBox: true, margin: 0 });
  notes(s, "Video (12 min: proyección y discusión). Abrir el enlace con el botón. Después de verlo, dos minutos por pregunta.");

  // ---------- 17. Sentencia: ficha y hechos
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Video y sentencia hito" });
  s.addText("Sentencia hito: " + CT.sentencia.id, { placeholder: "title" });
  card(s, M, 1.55, 4.3, 5.1, H.dk2);
  await iconCircle(s, M + 0.3, 1.85, 0.9, "FaGavel", H.accent2, H.dk1);
  s.addText([
    { text: CT.sentencia.corte, options: { bold: true, breakLine: true } },
    { text: CT.sentencia.mp, options: { breakLine: true } },
    { text: CT.sentencia.fecha, options: { breakLine: true } },
    { text: CT.sentencia.expediente, options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "Tema: uso de inteligencia artificial generativa (ChatGPT) por un juez al resolver una tutela.", options: { color: C.accent6, fontSize: 13 } }
  ], { x: M + 0.3, y: 2.95, w: 3.7, h: 3.6, fontSize: 14.5, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
  s.addText("Hechos relevantes", { x: 5.3, y: 1.55, w: 7.4, h: 0.5, fontSize: 18, bold: true, color: C.text2, isTextBox: true, margin: 0 });
  for (let i = 0; i < CT.sentencia.hechos.length; i++) {
    const y = 2.2 + i * 1.1;
    badge(s, 5.3, y + 0.05, i + 1, H.accent1);
    s.addText(CT.sentencia.hechos[i], { x: 5.9, y, w: 6.8, h: 1.05, fontSize: 13.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Sentencia, parte 1 (3 min). Verificar la providencia directamente en la relatoría de la Corte Constitucional antes de clase; la guía trae el enlace.");

  // ---------- 18. Problemas jurídicos y decisión
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Video y sentencia hito" });
  s.addText("Problemas jurídicos y decisión", { placeholder: "title" });
  s.addText("Problemas jurídicos", { x: M, y: 1.5, w: 6.0, h: 0.5, fontSize: 18, bold: true, color: C.text2, isTextBox: true, margin: 0 });
  for (let i = 0; i < CT.sentencia.problemas.length; i++) {
    const y = 2.1 + i * 1.75;
    card(s, M, y, 6.0, 1.55, H.lt2);
    badge(s, M + 0.2, y + 0.2, i + 1, H.accent4);
    s.addText(CT.sentencia.problemas[i], { x: M + 0.8, y: y + 0.15, w: 5.0, h: 1.3, fontSize: 13.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  }
  s.addText("Decisión", { x: 7.0, y: 1.5, w: 5.7, h: 0.5, fontSize: 18, bold: true, color: C.text2, isTextBox: true, margin: 0 });
  card(s, 7.0, 2.1, 5.7, 4.5, H.dk2);
  s.addText(bul(CT.sentencia.decisionCorta, { gap: 8 }), { x: 7.25, y: 2.25, w: 5.25, h: 4.2, fontSize: 14, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
  notes(s, "Sentencia, parte 2 (3 min). Subrayar la paradoja: no hubo violación del debido proceso, pero la Corte fijó reglas y dio órdenes. Preguntar qué tipo de precedente es ese (regla prospectiva para la Rama).");

  // ---------- 19. Ratio, regla, precedente
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Video y sentencia hito" });
  s.addText("Ratio decidendi, regla y precedente", { placeholder: "title" });
  card(s, M, 1.5, 6.0, 1.75, H.dk2);
  s.addText([{ text: "Ratio decidendi. ", options: { bold: true, color: C.accent2 } }, { text: CT.sentencia.ratioCorta, options: { color: C.background1 } }], { x: M + 0.25, y: 1.6, w: 5.5, h: 1.55, fontSize: 13, isTextBox: true, margin: 0, valign: "top" });
  card(s, M, 3.4, 6.0, 2.05, H.dk2);
  s.addText([{ text: "Regla. ", options: { bold: true, color: C.accent2 } }, { text: CT.sentencia.reglaCorta, options: { color: C.background1 } }], { x: M + 0.25, y: 3.5, w: 5.5, h: 1.85, fontSize: 13, isTextBox: true, margin: 0, valign: "top" });
  card(s, M, 5.6, 6.0, 1.3, H.dk2);
  s.addText([{ text: "Precedente. ", options: { bold: true, color: C.accent2 } }, { text: CT.sentencia.precedenteCorto, options: { color: C.background1 } }], { x: M + 0.25, y: 5.67, w: 5.5, h: 1.18, fontSize: 12.5, isTextBox: true, margin: 0, valign: "top" });
  s.addText("Criterios fijados por la Corte para el uso de IA en la Rama Judicial", { x: 7.0, y: 1.5, w: 5.7, h: 0.6, fontSize: 16, bold: true, color: C.background1, isTextBox: true, margin: 0, valign: "top" });
  const cr = CT.sentencia.criterios;
  for (let i = 0; i < cr.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 7.0 + col * 2.9, y = 2.2 + row * 0.75;
    card(s, x, y, 2.75, 0.62, H.accent1);
    s.addText(cr[i], { x: x + 0.1, y, w: 2.55, h: 0.62, fontSize: 11.5, bold: true, color: C.background1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
  }
  notes(s, "Sentencia, parte 3 (3 min). Distinguir ratio (lo necesario para decidir el caso) de las reglas prospectivas. Los criterios se leen tal como los enumera la Corte; la guía trae la lista completa con la fuente.");

  // ---------- 20. Taller: contraste con STC17832-2025
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Video y sentencia hito" });
  s.addText("Taller: la regla puesta a prueba", { placeholder: "title" });
  card(s, M, 1.5, 6.0, 2.9, H.lt2);
  s.addText([{ text: "T-323 de 2024 (Corte Constitucional)", options: { bold: true, color: C.text2, breakLine: true } }, { text: "El juez usó ChatGPT después de decidir, lo dijo en la sentencia y transcribió las respuestas. La Corte no anuló: fijó criterios y dio órdenes a la Rama Judicial.", options: { color: C.text1 } }], { x: M + 0.25, y: 1.65, w: 5.5, h: 2.6, fontSize: 14, isTextBox: true, margin: 0, valign: "top" });
  card(s, 7.0, 1.5, 5.7, 2.9, H.lt2);
  s.addText([{ text: "STC17832-2025 (Corte Suprema, Sala de Casación Civil)", options: { bold: true, color: C.text2, breakLine: true } }, { text: "Un tribunal terminó un proceso ejecutivo por desistimiento tácito citando dos providencias de la Corte Suprema con pasajes que no existían. La Corte dejó sin efectos la decisión y advirtió sobre el uso no verificado de IA.", options: { color: C.text1 } }], { x: 7.25, y: 1.65, w: 5.2, h: 2.6, fontSize: 14, isTextBox: true, margin: 0, valign: "top" });
  card(s, M, 4.7, W - 2 * M, 1.5, H.dk2);
  s.addText([
    { text: "Consigna (grupos de 4, 23 minutos). ", options: { bold: true, color: C.accent2 } },
    { text: "Completen la matriz de la guía (hechos, problema, decisión, ratio, regla, precedente, utilidad) y respondan: ¿la regla de la T-323 habría evitado lo ocurrido en la STC17832-2025? ¿Qué le falta a la regla para el abogado litigante?", options: { color: C.background1 } }
  ], { x: M + 0.3, y: 4.8, w: W - 2 * M - 0.6, h: 1.3, fontSize: 14, isTextBox: true, margin: 0, valign: "middle" });
  s.addText("Después del taller, volvemos a la pregunta inicial: ¿cambió su respuesta?", { x: M, y: 6.4, w: W - 2 * M, h: 0.4, fontSize: 13, italic: true, color: C.accent1, isTextBox: true, margin: 0 });
  notes(s, "Taller (23 min): 13 de trabajo en grupo y 10 de puesta en común. Un grupo expone la matriz; los demás completan o corrigen. Cerrar con la pregunta de la diapositiva 2 y comparar el conteo.");

  // ---------- 21. Aplicación
  pres.addSection({ title: "Aplicación y cierre" });
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Aplicación y cierre" });
  s.addText("Aplicación: tres minicasos", { placeholder: "title" });
  const casos = [
    ["FaGavel", "El auto redactado por la máquina", "Un juez municipal pide a una IA generativa que redacte el auto que decreta pruebas y lo firma sin cambios ni mención de la herramienta.", "¿Qué criterios de la T-323 se afectan? ¿Qué debió hacer?"],
    ["FaPen", "La tutela con la cita inexistente", "Un estudiante de consultorio jurídico redacta una tutela con una IA que cita una sentencia que no existe; el juez lo advierte.", "Consecuencias éticas, disciplinarias y procesales. ¿Qué protocolo de verificación aplicaría?"],
    ["FaSitemap", "La EPS que decide sola", "Una EPS usa un sistema automatizado que niega autorizaciones de servicios sin revisión humana.", "¿Qué derechos están en juego? ¿Qué exigiría usted como apoderado?"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = M + i * 4.1;
    card(s, x, 1.55, 3.85, 5.1, H.lt2);
    await iconCircle(s, x + 0.25, 1.8, 0.8, casos[i][0], H.accent2, H.dk1);
    s.addText(casos[i][1], { x: x + 1.2, y: 1.8, w: 2.5, h: 0.8, fontSize: 15, bold: true, color: C.text2, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(casos[i][2], { x: x + 0.25, y: 2.85, w: 3.35, h: 1.9, fontSize: 13.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
    s.addText(casos[i][3], { x: x + 0.25, y: 4.85, w: 3.35, h: 1.6, fontSize: 13, bold: true, color: C.accent1, isTextBox: true, margin: 0, valign: "top" });
  }
  notes(s, "Aplicación (10 min). Cada grupo resuelve un caso en 6 minutos y lo expone en 1. Claves en la guía del docente.");

  // ---------- 22. Conclusiones
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Aplicación y cierre" });
  s.addText("Cinco ideas para llevarse", { placeholder: "title" });
  const conc = [
    "El Derecho Informático regula la información digital y sus sistemas como objeto; la informática jurídica los usa como herramienta.",
    "Es una disciplina con normas, cátedra, doctrina e instituciones propias, pero transversal a todas las ramas.",
    "Sus principios vienen de tres fuentes: la equivalencia funcional (Ley 527), la autodeterminación informativa (Ley 1581) y la supervisión humana (T-323 de 2024).",
    "La T-323 de 2024 no prohíbe la IA: exige transparencia, verificación, protección de datos y que el juez responda por la decisión.",
    "La STC17832-2025 muestra el costo de no verificar: una decisión sin efectos y una advertencia a toda la judicatura."
  ];
  for (let i = 0; i < 5; i++) {
    const y = 1.6 + i * 1.0;
    badge(s, M, y + 0.15, i + 1, H.accent2);
    s.addText(conc[i], { x: M + 0.7, y, w: W - 2 * M - 0.7, h: 0.9, fontSize: 16, color: C.background1, isTextBox: true, margin: 0, valign: "middle" });
  }
  notes(s, "Conclusiones (2 min). Volver a la pregunta de la diapositiva 2: ¿cambió su respuesta?");

  // ---------- 23. Evaluación y cierre
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Aplicación y cierre" });
  s.addText("Evaluación y cierre", { placeholder: "title" });
  card(s, M, 1.55, 6.0, 5.1, H.lt2);
  await iconCircle(s, M + 0.3, 1.85, 0.8, "FaClipboardCheck", H.accent1, H.lt1);
  s.addText("Quiz de cinco preguntas (5 min)", { x: M + 1.3, y: 1.9, w: 4.5, h: 0.7, fontSize: 17, bold: true, color: C.text2, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(bul([
    "Diferencia entre Derecho Informático e informática jurídica.",
    "Qué principio permite que un correo electrónico valga como escrito.",
    "Por qué la Ley 1581 de 2012 es estatutaria.",
    "Dos criterios de la T-323 de 2024 para usar IA en la justicia.",
    "Qué decidió la Corte Suprema en la STC17832-2025."
  ], { gap: 6 }), { x: M + 0.3, y: 2.8, w: 5.4, h: 3.7, fontSize: 13.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });
  card(s, 7.0, 1.55, 5.7, 2.4, H.dk2);
  s.addText([{ text: "Ticket de salida", options: { bold: true, color: C.accent2, fontSize: 17, breakLine: true } }, { text: "Una regla que me llevo. Una duda que me queda.", options: { color: C.background1 } }], { x: 7.25, y: 1.7, w: 5.2, h: 2.1, fontSize: 15, isTextBox: true, margin: 0, valign: "top" });
  card(s, 7.0, 4.1, 5.7, 2.55, H.lt1, H.accent6);
  s.addText([{ text: "Ponderación sugerida", options: { bold: true, color: C.text2, breakLine: true } }, { text: "Ficha de lectura 30 % · Matriz de la sentencia 40 % · Aplicación y quiz 30 %", options: { color: C.text1, breakLine: true } }, { text: "Próxima sesión: protección de datos personales y habeas data.", options: { color: C.accent5, fontSize: 13 } }], { x: 7.25, y: 4.25, w: 5.2, h: 2.3, fontSize: 14, isTextBox: true, margin: 0, valign: "top" });
  notes(s, "Cierre (5 min). Quiz escrito o en voz alta. Recoger los tickets de salida; sirven para abrir la siguiente clase.");

  // ---------- 24. Referencias
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Aplicación y cierre" });
  s.addText("Referencias", { placeholder: "title" });
  const refs = [
    "Lectura asignada: " + CT.lectura.autor + ". " + CT.lectura.titulo + ". " + CT.lectura.fuente + ". " + CT.lectura.url,
    "Corte Constitucional, Sentencia T-323 de 2024 (M.P. Juan Carlos Cortés González). Relatoría: https://www.corteconstitucional.gov.co/relatoria/2024/T-323-24.htm",
    "Corte Suprema de Justicia, Sala de Casación Civil, STC17832-2025; Auto AC739-2026. Relatoría: https://cortesuprema.gov.co",
    "Video de apoyo: " + CT.video.titulo + " (" + CT.video.canal + ", " + CT.video.fecha + "). " + CT.video.url,
    "Normas: Ley 527 de 1999; Ley 1266 de 2008; Ley 1273 de 2009; Ley 1341 de 2009; Ley 1581 de 2012; Decreto 1377 de 2013; Ley 1712 de 2014; Ley 1928 de 2018; Ley 2213 de 2022; Circular Externa 002 de 2024 de la SIC; CONPES 4144 de 2025. Textos oficiales en www.suin-juriscol.gov.co y www.secretariasenado.gov.co",
    "Doctrina de referencia: Téllez Valdés, J., Derecho informático (McGraw-Hill/UNAM); Lessig, L., Code and other laws of cyberspace (1999); Frosini, V., Cibernética, derecho y sociedad (1968); Losano, M., Giuscibernetica (1969).",
    "Catálogo completo con estado de verificación de cada fuente: FUENTES.md en la carpeta de la clase."
  ];
  s.addText(bul(refs, { gap: 7 }), { x: M, y: 1.5, w: W - 2 * M, h: 5.3, fontSize: 12.5, color: C.text1, isTextBox: true, margin: 0, valign: "top" });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})().catch(e => { console.error(e); process.exit(1); });
