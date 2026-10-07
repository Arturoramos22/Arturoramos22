// Conversor mínimo Markdown -> DOCX (encabezados, párrafos con **negrita**, listas, tablas, enlaces)
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, LevelFormat, ExternalHyperlink, PageBreak } = require("docx");

function inline(text, base = {}) {
  const runs = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https?:\/\/[^\s)\]]+)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith("**")) runs.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else if (t.startsWith("*")) runs.push(new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    else if (t.startsWith("`")) runs.push(new TextRun({ text: t.slice(1, -1), font: "Consolas", ...base }));
    else runs.push(new ExternalHyperlink({ link: t, children: [new TextRun({ text: t, style: "Hyperlink", ...base })] }));
    last = m.index + t.length;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last), ...base }));
  return runs;
}

function mdToChildren(md, opts = {}) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  const totalW = 9360; // 6.5in en DXA (carta con márgenes de 1in)
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("---")) { i++; continue; }
    let h;
    if ((h = line.match(/^(#{1,4})\s+(.*)$/))) {
      const lvl = h[1].length;
      const txt = h[2].replace(/\*\*/g, "");
      const level = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][lvl - 1];
      out.push(new Paragraph({ heading: level, children: [new TextRun({ text: txt })], spacing: { before: lvl === 1 ? 360 : 240, after: 120 } }));
      i++; continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i]); i++; }
      const cells = rows.filter(r => !/^\|\s*-+/.test(r)).map(r => r.replace(/^\||\|$/g, "").split("|").map(c => c.trim()));
      const ncol = Math.max(...cells.map(r => r.length));
      const cw = Array(ncol).fill(Math.floor(totalW / ncol));
      cw[ncol - 1] = totalW - cw.slice(0, -1).reduce((a, b) => a + b, 0);
      const trows = cells.map((r, ri) => new TableRow({
        tableHeader: ri === 0,
        children: r.map((c, ci) => new TableCell({
          width: { size: cw[ci], type: WidthType.DXA },
          shading: ri === 0 ? { type: ShadingType.CLEAR, fill: "1F3A5F", color: "auto" } : (ri % 2 === 0 ? { type: ShadingType.CLEAR, fill: "EEF3F8", color: "auto" } : undefined),
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [new Paragraph({ children: inline(c, ri === 0 ? { bold: true, color: "FFFFFF", size: 18 } : { size: 18 }), spacing: { after: 0 } })]
        }))
      }));
      out.push(new Table({ rows: trows, width: { size: totalW, type: WidthType.DXA }, columnWidths: cw }));
      out.push(new Paragraph({ text: "", spacing: { after: 60 } }));
      continue;
    }
    let b;
    if ((b = line.match(/^\s*[-*]\s+(.*)$/))) {
      out.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: inline(b[1]), spacing: { after: 60 } }));
      i++; continue;
    }
    if ((b = line.match(/^\s*(\d+)\.\s+(.*)$/))) {
      // lista numerada: nueva instancia por bloque
      const key = opts._numKey = (opts._numKey || 0);
      if (!opts._inNum) { opts._numInst = (opts._numInst || 0) + 1; opts._inNum = true; }
      out.push(new Paragraph({ numbering: { reference: "numbers", level: 0, instance: opts._numInst }, children: inline(b[2]), spacing: { after: 60 } }));
      i++;
      if (!(i < lines.length && /^\s*\d+\.\s+/.test(lines[i]))) opts._inNum = false;
      continue;
    }
    if (line.startsWith("[[") || line.startsWith("<<PAGEBREAK>>")) {
      if (line.startsWith("<<PAGEBREAK>>")) out.push(new Paragraph({ children: [new PageBreak()] }));
      else out.push(new Paragraph({ children: [new TextRun({ text: line, italics: true, color: "B5413F" })] }));
      i++; continue;
    }
    // párrafo (une líneas consecutivas)
    let para = line;
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#|\||\s*[-*]\s|\s*\d+\.\s|\[\[|<<)/.test(lines[i])) { para += " " + lines[i]; i++; }
    out.push(new Paragraph({ children: inline(para), spacing: { after: 120 }, alignment: AlignmentType.JUSTIFIED }));
  }
  return out;
}

function buildDoc(children, meta = {}) {
  return new Document({
    creator: "Carlos Arturo Ramos Mejía",
    title: meta.title || "",
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", run: { font: "Cambria", size: 40, bold: true, color: "1F3A5F" }, paragraph: { spacing: { after: 200 } } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Cambria", size: 30, bold: true, color: "1F3A5F" }, paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Cambria", size: 26, bold: true, color: "0E7C86" }, paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Cambria", size: 23, bold: true, color: "1B1F2E" }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } }
      ]
    },
    numbering: {
      config: [
        { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
        { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] }
      ]
    },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      headers: meta.header ? { default: new (require("docx").Header)({ children: [new Paragraph({ children: [new TextRun({ text: meta.header, size: 16, color: "4A6670" })], alignment: AlignmentType.RIGHT })] }) } : undefined,
      children
    }]
  });
}

module.exports = { mdToChildren, buildDoc, inline };

if (require.main === module) {
  const [, , inFile, outFile, header] = process.argv;
  const md = fs.readFileSync(inFile, "utf8");
  const doc = buildDoc(mdToChildren(md), { title: outFile, header });
  Packer.toBuffer(doc).then(buf => { fs.writeFileSync(outFile, buf); console.log("written", outFile); });
}
