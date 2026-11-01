const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, PageBreak,
  Header, Footer, PageNumber, BorderStyle, ShadingType, LevelFormat, ExternalHyperlink,
} = require('docx');

const [, , dataPath, outPath] = process.argv;
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const MAXW = 600, MAXH = 520; // px a 96 dpi; ancho útil 6,5" = 624 px

const limpiarPagina = p => {
  let s = p.split(' (')[0];
  if (/^Página web/i.test(s)) s = 'página web';
  if (/^HTML/.test(s)) s = 'HTML';
  return s.replace(/,.*$/, '');
};
const sinMd = s => s.replace(/\*\*/g, '').replace(/`/g, '');
const gris = '595959';

const p = (text, opts = {}) => new Paragraph({ spacing: { after: 80 }, ...opts.para, children: [new TextRun({ text, ...opts.run })] });

const children = [];
// Portada
children.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 120 }, children: [new TextRun('Hilo sobre CENS: tarifas, ganancias y regulación en Cúcuta')] }));
children.push(p('7 trinos con 4 capturas cada uno · versión final para publicar · 1 de noviembre de 2026', { run: { color: gris, size: 24 } }));
children.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '1F4E79', space: 4 } }, spacing: { after: 200 }, children: [] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Cómo usar este documento')] }));
[
  'Copia el texto de cada trino tal como está (los trinos tienen entre 486 y 652 caracteres; la cuenta permite publicaciones largas y lo esencial va en los primeros 280).',
  'Adjunta las 4 imágenes en el orden indicado. Son capturas reales de documentos oficiales o de prensa, sin edición: solo recortadas.',
  'Pega en X el texto alternativo (ALT) de cada imagen: dice la entidad, el documento, la fecha y la página, de modo que cada captura se pueda verificar aunque el recorte no muestre todo.',
  'Reglas de redacción que se respetaron: no se afirma que CENS "viola la ley"; los incumplimientos se atribuyen a la Superservicios con su año; los contrapesos van en el mismo trino que el dato; la única opinión va rotulada ("Mi opinión"). En las respuestas rigen las mismas reglas.',
].forEach(t => children.push(new Paragraph({ numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 80 }, children: [new TextRun(t)] })));
children.push(p('Las imágenes originales, el índice de fuentes con huellas SHA-256 y el expediente completo están en la carpeta cens-tarifas-cucuta del repositorio.', { run: { color: gris, size: 20 }, para: { spacing: { before: 160, after: 80 } } }));

for (const t of data.tweets) {
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`Trino ${t.n}/7`)] }));
  children.push(new Paragraph({
    spacing: { before: 60, after: 60, line: 300 },
    shading: { type: ShadingType.CLEAR, fill: 'EEF3F8', color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: '1F4E79', space: 8 } },
    indent: { left: 200, right: 120 },
    children: [new TextRun({ text: t.text, size: 24 })],
  }));
  children.push(p(`${[...t.text].length} caracteres`, { run: { color: gris, size: 18, italics: true }, para: { spacing: { after: 160 } } }));
  for (const im of t.imgs) {
    let w = im.w, h = im.h;
    const maxh = im.i === 1 ? 400 : MAXH;
    const s = Math.min(MAXW / w, maxh / h, 1);
    w = Math.round(w * s); h = Math.round(h * s);
    children.push(new Paragraph({ keepNext: true, spacing: { before: 200, after: 60 }, children: [
      new TextRun({ text: `Imagen ${im.i} de 4 · `, bold: true, color: '1F4E79' }),
      new TextRun({ text: `${im.fuente} · p. ${limpiarPagina(im.pagina)}`, bold: true }),
    ] }));
    children.push(new Paragraph({ keepNext: true, alignment: AlignmentType.CENTER, spacing: { after: 80 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 2 }, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 2 }, left: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 2 }, right: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 2 } },
      children: [new ImageRun({ type: 'png', data: fs.readFileSync(im.path), transformation: { width: w, height: h },
        altText: { title: `Trino ${t.n}, imagen ${im.i}`, description: im.alt, name: `trino${t.n}_${im.i}` } })] }));
    children.push(new Paragraph({ keepNext: true, keepLines: true, spacing: { after: 40 }, children: [new TextRun({ text: 'Qué prueba: ', bold: true, size: 20 }), new TextRun({ text: im.prueba, size: 20 })] }));
    children.push(new Paragraph({ keepNext: true, keepLines: true, spacing: { after: 40 }, children: [new TextRun({ text: 'ALT para X: ', bold: true, size: 20 }), new TextRun({ text: im.alt, size: 20 })] }));
    children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'Fuente: ', bold: true, size: 18, color: gris }),
      new ExternalHyperlink({ link: im.url, children: [new TextRun({ text: im.url, style: 'Hyperlink', size: 18 })] })] }));
  }
}

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Respuesta fijada (opcional, fuera de los 7 trinos)')] }));
const pinLines = data.pin.split('\n').map(s => s.trim()).filter(Boolean);
children.push(new Paragraph({ spacing: { before: 60, after: 120, line: 300 }, shading: { type: ShadingType.CLEAR, fill: 'EEF3F8', color: 'auto' },
  border: { left: { style: BorderStyle.SINGLE, size: 24, color: '1F4E79', space: 8 } }, indent: { left: 200, right: 120 },
  children: [new TextRun({ text: pinLines[0], size: 24 })] }));
pinLines.slice(1).forEach(l => children.push(p(sinMd(l), { run: { size: 18, color: gris } })));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360 }, children: [new TextRun('Antes de publicar')] }));
data.antes.split('\n').map(s => s.trim()).filter(s => /^\d+\./.test(s)).forEach(l => {
  const txt = sinMd(l.replace(/^\d+\.\s*/, ''));
  const [head, ...rest] = txt.split(/(?<=\.)\s/);
  children.push(new Paragraph({ numbering: { reference: 'numeros', level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text: head + ' ', bold: true }), new TextRun(rest.join(' '))] }));
});

const doc = new Document({
  creator: 'Hilo CENS Cúcuta', title: 'Hilo sobre CENS: trinos y capturas', description: '7 trinos con 28 capturas sin edición',
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { size: 40, bold: true, color: '1F4E79', font: 'Arial' }, paragraph: { spacing: { after: 120 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: '1F4E79', font: 'Arial' }, paragraph: { spacing: { before: 120, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, color: '1F4E79', font: 'Arial' }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: 'vinetas', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    { reference: 'numeros', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1300, bottom: 1300, left: 1300 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Hilo CENS · Cúcuta · noviembre de 2026', size: 16, color: gris })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], size: 16, color: gris })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(outPath, b); console.log('escrito', outPath, b.length); });
