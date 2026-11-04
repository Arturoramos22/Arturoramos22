// Genera el documento Word del hilo: texto de cada trino listo para copiar,
// conteo de caracteres, capturas en el orden en que se adjuntan (con su fuente),
// guía de réplicas, pendientes e índice de fuentes.
// Uso: node generar_word.js hilo.json img/meta.json salida.docx
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, ImageRun, ExternalHyperlink, PageBreak,   LevelFormat, Footer, PageNumber, VerticalAlign,
} = require('docx');

const [hiloPath, metaPath, salida] = process.argv.slice(2);
const BASE = __dirname;
const hilo = JSON.parse(fs.readFileSync(hiloPath, 'utf8'));
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const consultas = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(BASE, 'consultas_oficiales.json'), 'utf8')).map(c => [c.id, c]));
const fuentes = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(BASE, 'fuentes.json'), 'utf8')).map(f => [f.id, f]));

const AZUL = '1F3A5F';
const GRIS = '5B6470';
const FONDO_TRINO = 'EEF2F7';
const FONDO_MANUAL = 'FFF4D6';
const ANCHO = 9648; // carta con márgenes de 0,9"
const COL = ANCHO / 2;

// texto con **negrita** y *cursiva* sencillas de markdown
function runs(texto, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let i = 0, m;
  while ((m = re.exec(texto))) {
    if (m.index > i) out.push(new TextRun({ text: texto.slice(i, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else if (t.startsWith('`')) out.push(new TextRun({ text: t.slice(1, -1), ...base }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    i = m.index + t.length;
  }
  if (i < texto.length) out.push(new TextRun({ text: texto.slice(i), ...base }));
  return out;
}

function enlace(url, texto, size = 16) {
  return new ExternalHyperlink({ link: url, children: [new TextRun({ text: texto, style: 'Hyperlink', size })] });
}

function sinBordes() {
  const n = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: n, bottom: n, left: n, right: n, insideHorizontal: n, insideVertical: n };
}

function cajaTrino(texto) {
  const parrafos = texto.split('\n').map(l => new Paragraph({
    spacing: { after: l.trim() ? 60 : 0 },
    children: [new TextRun({ text: l, size: 22 })],
  }));
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: ANCHO, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: FONDO_TRINO },
      margins: { top: 140, bottom: 120, left: 200, right: 200 },
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.SINGLE, size: 24, color: AZUL },
      },
      children: parrafos,
    })] })],
  });
}

function celdaCaptura(cap, orden) {
  const c = consultas[cap.id];
  const f = fuentes[cap.id];
  const hijos = [];
  if (c.manual) {
    hijos.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${orden}. ${cap.id} · CAPTURA MANUAL`, bold: true, size: 18, color: '7A5A00' })] }));
    hijos.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: c.que_muestra, size: 17 })] }));
    if (c.nota) hijos.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: c.nota, size: 16, color: GRIS, italics: true })] }));
    const extra = [];
    if (c.pagina) extra.push(` (p. ${c.pagina})`);
    if (c.buscar) extra.push(` · buscar: «${c.buscar}»`);
    hijos.push(new Paragraph({ children: [enlace(f.url, 'Abrir y capturar'), new TextRun({ text: extra.join(''), size: 16, color: GRIS })] }));
  } else {
    const m = meta[cap.id];
    const maxW = 300, maxH = 420; // px a 96 ppp: unas 3,1" x 4,4"
    const k = Math.min(maxW / m.w, maxH / m.h);
    hijos.push(new Paragraph({ spacing: { after: 60 }, children: [new ImageRun({
      type: 'jpg', data: fs.readFileSync(m.path),
      transformation: { width: Math.round(m.w * k), height: Math.round(m.h * k) },
      altText: { title: cap.id, description: c.que_muestra, name: cap.id },
    })] }));
    hijos.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: `${orden}. ${cap.id}`, bold: true, size: 17 }), new TextRun({ text: `  ${c.archivo}`, size: 14, color: GRIS })] }));
    hijos.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: c.que_muestra, size: 17 })] }));
    hijos.push(new Paragraph({ children: [enlace(f.url, 'Fuente'), new TextRun({ text: c.pagina ? ` (página ${c.pagina} del documento)` : '', size: 16, color: GRIS })] }));
  }
  return new TableCell({
    width: { size: COL, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    shading: c.manual ? { type: ShadingType.CLEAR, color: 'auto', fill: FONDO_MANUAL } : undefined,
    margins: { top: 100, bottom: 140, left: 120, right: 120 },
    children: hijos,
  });
}

function tablaCapturas(capturas) {
  const filas = [];
  for (let i = 0; i < capturas.length; i += 2) {
    const celdas = [celdaCaptura(capturas[i], i + 1)];
    celdas.push(capturas[i + 1] ? celdaCaptura(capturas[i + 1], i + 2)
      : new TableCell({ width: { size: COL, type: WidthType.DXA }, children: [new Paragraph('')] }));
    filas.push(new TableRow({ cantSplit: true, children: celdas }));
  }
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [COL, COL], borders: sinBordes(), rows: filas });
}

// listas anidadas en markdown ("- " y "  - ")
function listaMarkdown(md) {
  const out = [];
  for (const linea of md.replace(/🖼️ ?/g, 'captura ').split('\n')) {
    if (!linea.trim()) continue;
    const m = linea.match(/^(\s*)- (.*)$/);
    if (m) {
      const nivel = m[1].length >= 2 ? 1 : 0;
      out.push(new Paragraph({ numbering: { reference: 'vinetas', level: nivel }, spacing: { after: 60 }, children: runs(m[2], { size: 20 }) }));
    } else {
      out.push(new Paragraph({ spacing: { after: 80 }, children: runs(linea, { size: 20 }) }));
    }
  }
  return out;
}

const hijos = [];

// Portada
hijos.push(new Paragraph({ spacing: { before: 2400, after: 200 }, children: [new TextRun({ text: hilo.titulo || 'Criminalidad en Cúcuta', bold: true, size: 56, color: AZUL })] }));
hijos.push(new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: hilo.subtitulo || '', size: 30, color: GRIS })] }));
const nReal = hilo.tweets.reduce((a, t) => a + t.capturas.filter(c => !consultas[c.id].manual).length, 0);
const nMan = hilo.tweets.reduce((a, t) => a + t.capturas.filter(c => consultas[c.id].manual).length, 0);
hijos.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: `${hilo.resumen_portada || 'Hilo para X'} · ${nReal} capturas reales para adjuntar y ${nMan} para tomar a mano`, size: 22 })] }));
hijos.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: hilo.fecha || '', size: 22, color: GRIS })] }));
hijos.push(new Paragraph({ children: [new PageBreak()] }));

// Cómo usar
hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Cómo usar este documento')] }));
for (const t of hilo.como_usar || [
  'Cada trino trae su texto listo para copiar y pegar en X (recuadro azul), con su número de caracteres.',
  'Debajo van las capturas que se adjuntan, en el orden en que deben subirse. Son reales y sin edición. Los archivos originales en tamaño completo están en el .zip, en la carpeta del trino (Trino-01, Trino-02...) y con el mismo número de orden.',
  'Las celdas amarillas son capturas manuales: el sitio bloquea navegadores automáticos o pide registro. Hay que abrir el enlace y tomar la captura desde el navegador.',
  'Varios trinos pasan de 280 caracteres, como en el hilo anterior. Funcionan con cuenta Premium; si no, hay que partirlos.',
  'Al final están los datos para responder réplicas, lo que hay que revisar antes de publicar y el índice completo de fuentes con sus enlaces.',
]) hijos.push(new Paragraph({ numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: t, size: 21 })] }));

hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Enfoque')] }));
for (const t of hilo.enfoque || [
  'El gancho es la orden del 29 de octubre de 2026 de militarizar Cúcuta. El hilo no la critica de entrada. Primero reconstruye con cifras oficiales cómo se llegó aquí y al final muestra que la militarización ya se probó varias veces en la ciudad y en el mundo, sin resultados sostenidos.',
  'Primero la fuente oficial (Policía y MinDefensa, Defensoría, sentencias, DANE), después estudios revisados por pares y organismos internacionales. La prensa solo se usa para hechos sin documento oficial. Lo que no es oficial se dice, como el ranking de la ONG mexicana.',
  'Las malas noticias para la tesis van dentro del hilo (la baja de 2026, Esparta 2018, El Salvador), antes de que las saquen en las respuestas. El fracaso de la militarización se sostiene sobre las anteriores, sobre todo la de 2025, y sobre la evidencia científica. De la del 29 de octubre todavía no hay datos.',
]) hijos.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: t, size: 21 })] }));

hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Contenido')] }));
{
  let b = null;
  for (const t of hilo.tweets) {
    if (t.bloque !== b) { b = t.bloque; hijos.push(new Paragraph({ spacing: { before: 120, after: 40 }, children: [new TextRun({ text: b, bold: true, size: 20, color: AZUL })] })); }
    hijos.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 360 }, children: [new TextRun({ text: (t.etiqueta || `${t.n}/ ${t.titulo || 'Apertura'}`).replace(/\.$/, ''), size: 19 })] }));
  }
  for (const s of [...(hilo.secciones ? hilo.secciones.map(x => x.titulo) : ['Datos a la mano para las réplicas', 'Antes de publicar']), 'Índice de fuentes'])
    hijos.push(new Paragraph({ spacing: { before: 120, after: 20 }, children: [new TextRun({ text: s, bold: true, size: 20, color: AZUL })] }));
}
hijos.push(new Paragraph({ children: [new PageBreak()] }));

// Trinos
let bloque = null;
for (const t of hilo.tweets) {
  if (t.bloque !== bloque) {
    bloque = t.bloque;
    hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: t.n !== 1, children: [new TextRun(bloque)] }));
  }
  hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, children: [new TextRun(t.etiqueta || (`${t.n}/` + (t.titulo ? ` ${t.titulo.replace(/\.$/, '')}` : '')))] }));
  hijos.push(cajaTrino(t.texto));
  const largo = t.caracteres > 280 ? ` · pasa de 280: requiere Premium o partirlo` : ' · cabe en un trino normal';
  hijos.push(new Paragraph({ spacing: { before: 60, after: 160 }, children: [new TextRun({ text: `${t.caracteres} caracteres${largo}`, size: 16, color: GRIS })] }));
  if (t.capturas.length) {
    hijos.push(new Paragraph({ keepNext: true, spacing: { after: 80 }, children: [new TextRun({ text: `Capturas para adjuntar, en este orden (carpeta ${t.carpeta || 'Trino-' + String(t.n).padStart(2, '0')}):`, bold: true, size: 19, color: AZUL })] }));
    hijos.push(tablaCapturas(t.capturas));
  } else {
    hijos.push(new Paragraph({ children: [new TextRun({ text: 'Trino de cierre: va sin captura.', italics: true, size: 18, color: GRIS })] }));
  }
  for (const r of t.respaldo) hijos.push(new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: `Respaldo adicional: ${r}`, size: 17, color: GRIS })] }));
  hijos.push(new Paragraph({ spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD', space: 6 } }, children: [] }));
}

// Réplicas y pendientes
for (const sec of hilo.secciones || [{ titulo: 'Datos a la mano para las réplicas', md: hilo.replicas }, { titulo: 'Antes de publicar', md: hilo.pendientes }]) {
  hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun(sec.titulo)] }));
  hijos.push(...listaMarkdown(sec.md));
}

// Índice de fuentes
const CAT = hilo.categorias || { D: 'Datos oficiales y DANE', O: 'Documentos oficiales y judiciales', W: 'Páginas web oficiales', R: 'Ranking de la ONG mexicana (no oficial)', E: 'Estudios científicos y centros de pensamiento', I: 'Organismos internacionales', P: 'Prensa' };
hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun('Índice de fuentes')] }));
hijos.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'Todas las fuentes del hilo y de las réplicas. «Capturada» quiere decir que la captura real está en el .zip; «manual» quiere decir que hay que tomarla desde el navegador.', size: 19 })] }));
const W = [900, 5148, 1200, 2400];
const celda = (txt, w, opts = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, margins: { top: 50, bottom: 50, left: 80, right: 80 }, shading: opts.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill } : undefined, children: [new Paragraph({ children: Array.isArray(txt) ? txt : [new TextRun({ text: txt, size: 16, bold: !!opts.bold, color: opts.color })] })] });
for (const letra of (hilo.orden_categorias || 'DOWRIEP')) {
  const grupo = Object.values(fuentes).filter(f => f.id[0] === letra);
  if (!grupo.length) continue;
  hijos.push(new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, children: [new TextRun(CAT[letra])] }));
  const filas = [new TableRow({ tableHeader: true, children: [celda('ID', W[0], { bold: true, fill: 'DDE3EA' }), celda('Qué prueba', W[1], { bold: true, fill: 'DDE3EA' }), celda('Estado', W[2], { bold: true, fill: 'DDE3EA' }), celda('Enlace', W[3], { bold: true, fill: 'DDE3EA' })] })];
  for (const f of grupo) {
    const extra = f.pagina_pdf ? ` (p. ${f.pagina_pdf})` : '';
    filas.push(new TableRow({ cantSplit: true, children: [
      celda(f.id, W[0], { bold: true }),
      celda(f.que_muestra, W[1]),
      celda(f.estado, W[2], { color: f.estado === 'manual' ? '7A5A00' : '1E6B3A', fill: f.estado === 'manual' ? FONDO_MANUAL : undefined }),
      celda([enlace(f.url, 'abrir'), new TextRun({ text: extra, size: 16, color: GRIS })], W[3]),
    ] }));
  }
  hijos.push(new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: W, rows: filas }));
}

const doc = new Document({
  creator: 'Hilo Cúcuta',
  title: 'Criminalidad en Cúcuta: hilo con capturas',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: 'Arial', size: 21 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: AZUL }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 25, bold: true, color: '222222' }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: 'vinetas', levels: [
    { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } },
    { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 760, hanging: 260 } } } },
  ] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1296, bottom: 1296, left: 1296, right: 1296 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: (hilo.pie || 'Criminalidad en Cúcuta') + ' · página ', size: 16, color: GRIS }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRIS })] })] }) },
    children: hijos,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(salida, buf); console.log('ok', salida, (buf.length / 1e6).toFixed(1) + ' MB'); });
