const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, FootnoteReferenceRun, AlignmentType, HeadingLevel,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, Footer, PageNumber, LevelFormat, PageBreak,
} = require('docx');

const OUT = process.argv[2];
const R = '/home/user/Arturoramos22/contratacion-cucuta-acevedo-2026/caso-world-go';
const C = R + '/capturas-cronologia';
const G = R + '/capturas-cotizaciones-gospel';
const S = '/tmp/claude-0/-home-user-Arturoramos22/5d41b7db-fe77-5f1b-af28-c88e697c6188/scratchpad';
const A = S + '/anexos';
const SECOP = 'https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=';
const FONT = 'Arial';

// ---------- notas al pie
const footnotes = {};
let fnId = 0;
function fn(text) {
  fnId += 1;
  footnotes[fnId] = { children: [new Paragraph({ children: [new TextRun({ text, size: 16, font: FONT })] })] };
  return new FootnoteReferenceRun(fnId);
}

// ---------- párrafos
function runs(parts) {
  return parts.map((x) => {
    if (typeof x === 'string') return new TextRun({ text: x, font: FONT, size: 22 });
    if (x instanceof FootnoteReferenceRun) return x;
    if (x.b) return new TextRun({ text: x.b, bold: true, font: FONT, size: 22 });
    if (x.i) return new TextRun({ text: x.i, italics: true, font: FONT, size: 22 });
    return x;
  });
}
const P = (...parts) => new Paragraph({ children: runs(parts), alignment: AlignmentType.JUSTIFIED, spacing: { after: 140, line: 300 } });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const C0 = (t, o = {}) => new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 0 }, children: [new TextRun({ text: t, font: FONT, size: 22, ...o })] });
const BL = (...parts) => new Paragraph({ numbering: { reference: 'vinetas', level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 80, line: 280 }, children: runs(parts) });

let hecho = 0;
const HE = (...parts) => { hecho += 1; return new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 140, line: 300 }, children: [new TextRun({ text: `${hecho}. `, bold: true, font: FONT, size: 22 }), ...runs(parts)] }); };

// ---------- imágenes (PNG en crudo, solo escaladas al ancho de la página)
function pngSize(f) { const b = fs.readFileSync(f); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; }
function img(f, maxW = 610, maxH = 780) {
  if (!fs.existsSync(f)) throw new Error('Falta la imagen: ' + f);
  const { w, h } = pngSize(f);
  let W = maxW, H = Math.round(h * maxW / w);
  if (H > maxH) { H = maxH; W = Math.round(w * maxH / h); }
  return new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 60 },
    border: {}, children: [new ImageRun({ type: 'png', data: fs.readFileSync(f), transformation: { width: W, height: H } })] });
}
let prueba = 0;
const pruebas = [];
function PR(titulo, fuente, files) {
  prueba += 1;
  pruebas.push({ n: prueba, titulo, fuente });
  const out = files.map((f) => img(f));
  out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 220 }, children: [
    new TextRun({ text: `Prueba N.º ${prueba}. `, bold: true, font: FONT, size: 18 }),
    new TextRun({ text: titulo, italics: true, font: FONT, size: 18 }), fn(fuente)] }));
  return out;
}
const ref = (n) => ({ b: `(Prueba N.º ${n})` });

// ---------- tabla
function table(head, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (t, hd) => new TableCell({ width: { size: widths[0], type: WidthType.DXA }, shading: hd ? { type: ShadingType.CLEAR, fill: 'D9D9D9', color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: 18, bold: !!hd })] })] });
  const mk = (r, hd) => new TableRow({ tableHeader: hd, children: r.map((t, i) => { const c = cell(t, hd); c.options = c.options || {}; return new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: hd ? { type: ShadingType.CLEAR, fill: 'D9D9D9', color: 'auto' } : undefined, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: 18, bold: !!hd })] })] }); }) });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: [mk(head, true), ...rows.map((r) => mk(r, false))] });
}

// =====================================================================
const body = [];
const push = (...x) => body.push(...x.flat());

push(
  C0('Señores'), C0('FISCALÍA GENERAL DE LA NACIÓN', { bold: true }),
  C0('Dirección Especializada contra los Delitos contra la Administración Pública'),
  C0('Dirección Seccional de Fiscalías de Norte de Santander (reparto)'), C0('E. S. D.'),
  new Paragraph({ spacing: { after: 200 } }),
  P({ b: 'Referencia: ' }, 'Denuncia penal por los presuntos delitos de contrato sin cumplimiento de requisitos legales (art. 410 del Código Penal), interés indebido en la celebración de contratos (art. 409), falsedad ideológica en documento público (art. 286), peculado por apropiación en favor de terceros (art. 397) y concierto para delinquir (art. 340), en la contratación del Municipio de San José de Cúcuta con la Empresa de Exposición de Cúcuta Ciudad Destino S.A.S. – World Go Colombia S.A.S. (NIT 901.990.330-0).'),
  P({ b: 'Denunciante: ' }, '[NOMBRE COMPLETO DEL DENUNCIANTE], C.C. [NÚMERO].'),
  P({ b: 'Denunciados: ' }, 'Las personas relacionadas en el capítulo IV y las demás que resulten responsables.'),
  P({ b: 'Entidad afectada: ' }, 'Municipio de San José de Cúcuta (NIT 890.501.434-2).'),
  P('[NOMBRE COMPLETO DEL DENUNCIANTE], mayor de edad, identificado con la cédula de ciudadanía N.º [NÚMERO], con domicilio en [CIUDAD], en cumplimiento del deber de denunciar previsto en el artículo 67 de la Ley 906 de 2004 y en los términos de sus artículos 66 y 69, presento ', { b: 'DENUNCIA PENAL' }, ' por los hechos que se narran a continuación. Cada hecho se soporta en documentos públicos publicados por la propia Alcaldía de Cúcuta en el SECOP II, en el Portal Nacional de Datos Abiertos (datos.gov.co) o en el certificado de la Cámara de Comercio de Cúcuta, y se reproduce en el cuerpo de este escrito sin ninguna alteración.', fn('Las capturas del portal datos.gov.co se tomaron directamente del navegador el 5 de noviembre de 2026. Los documentos de SECOP II se descargaron de los enlaces públicos de cada proceso y se convirtieron de PDF a imagen sin edición. Las fechas en datos.gov.co aparecen en formato mes/día/año. Los archivos originales se aportan en el medio magnético anexo.')),
);

// ------------------------------------------------ HECHOS
push(H1('I. HECHOS'));

push(H2('A. La creación de la sociedad desde la propia administración'));
push(HE('Mediante el ', { b: 'Acuerdo 012 del 24 de abril de 2025' }, ', expedido por iniciativa del alcalde Jorge Enrique Acevedo Peñaloza, el Concejo de Cúcuta autorizó al alcalde para crear una sociedad de economía mixta por acciones simplificadas denominada "Empresa de Exposición de Cúcuta Ciudad Destino S.A.S., por sus siglas EXPOCUCUTA S.A.S.". El acuerdo fija una participación inicial del municipio del 52%, autoriza un aporte de $600.000.000 y le da al alcalde cinco meses para constituirla ', ref(1), '.'));
push(PR('Acuerdo 012 de 2025 del Concejo de San José de Cúcuta, páginas 1 a 3.', 'Acuerdo 012 de 2025, publicado por la Alcaldía en SECOP II como documento "5. ACUERDO No. 012 DE 2025.pdf" del proceso DA-CDCO-002-2026 (comodato), ' + SECOP + 'CO1.NTC.11139941', [A + '/acuerdo012_p1-1.png', A + '/acuerdo012_p2-2.png', A + '/acuerdo012_p3-3.png']));

push(HE('La sociedad se constituyó por acta del ', { b: '15 de septiembre de 2025' }, ' y quedó inscrita en la Cámara de Comercio de Cúcuta el 18 de septiembre de 2025. Su domicilio principal es la ', { b: 'Calle 11 N.º 5-49, dirección del Palacio Municipal de Cúcuta' }, ' ', ref(2), '.'));
push(PR('Certificado de existencia y representación legal: razón social, NIT, domicilio y constitución.', 'Certificado de existencia y representación legal expedido por la Cámara de Comercio de Cúcuta el 15 de enero de 2026 (código de verificación 9ZV7mpzCcp), incluido en la oferta de la sociedad, documento "OFERTA WORLD GO COLOMBIA.pdf", proceso OPT-CI-001-2026, ' + SECOP + 'CO1.NTC.9764355, pág. 18 del archivo.', [C + '/P07_camara_comercio_constitucion_15sep2025.png']));

push(HE('En la misma acta de constitución se designó la junta directiva. Son miembros principales el Municipio y la ', { b: 'Oficina de Promoción Turística del Municipio' }, ', y son suplentes el ', { b: 'Secretario General de la Alcaldía' }, ' y el ', { b: 'Secretario de Cultura y Patrimonio' }, ' ', ref(3), '. Esas mismas dependencias son las que, después, estructuraron, ordenaron y supervisaron los contratos celebrados con la sociedad.'));
push(PR('Certificado de la Cámara de Comercio: designación del Director General y junta directiva (principales y suplentes).', 'Certificado de existencia y representación legal citado, págs. 22 y 23 del archivo de la oferta.', [C + '/P08_camara_comercio_designacion_director_general_y_junta.png', C + '/P09_camara_comercio_junta_suplentes_secretario_general.png']));

push(HE('Por el Acta N.º 002 del 15 de octubre de 2025, la asamblea de accionistas le agregó a la sociedad la sigla ', { b: '"WORLD GO COLOMBIA S.A.S."' }, ', distinta de la que autorizó el Concejo ', ref(4), '.'));
push(PR('Certificado de la Cámara de Comercio: reforma de estatutos por el Acta N.º 002 del 15 de octubre de 2025.', 'Certificado de existencia y representación legal citado, pág. 19 del archivo de la oferta.', [C + '/P10_camara_comercio_sigla_world_go_acta002.png']));

push(HE('Al momento de su primer contrato con el municipio, la sociedad no tenía operación propia. El certificado de la Cámara de Comercio registra ', { b: 'ingresos por actividad ordinaria de $0,00' }, ', y el Registro Único de Proponentes, con corte al 31 de diciembre de 2025, registra un activo total de $826.951.300, que equivale a su capital pagado, un ', { b: 'pasivo de $0,00' }, ' y la clasificación de microempresa ', ref(5), '.'));
push(PR('Certificado de existencia (capital e ingresos) y certificado del Registro Único de Proponentes (información financiera).', 'Certificado de existencia y representación legal citado, pág. 20; y certificado de inscripción y clasificación en el Registro de Proponentes expedido por la Cámara de Comercio de Cúcuta el 19 de enero de 2026 (código egQ44NKH3u), pág. 120 del archivo de la oferta.', [A + '/cert_capital_ingresos-020.png', A + '/rup_financiero-120.png']));

push(H2('B. El Director General: de contratista de la Secretaría General a representante legal en 48 horas'));
push(HE('El señor ', { b: 'Ronald Eduardo Pancha Vivas' }, ' fue contratista del Concejo de Cúcuta en diciembre de 2024, para asesorar al presidente de la corporación "en los proyectos de acuerdo". En 2025 fue contratista de la ', { b: 'Secretaría General de la Alcaldía' }, ' (contrato 00000848 de 2025, de $47.200.000, con plazo hasta el 18 de octubre de 2025) y del IMRD (contrato CPS-207-2025) ', ref(6), '.'));
push(PR('SECOP II – Contratos Electrónicos: contratos de Ronald Eduardo Pancha Vivas.', 'Portal Nacional de Datos Abiertos, conjunto "SECOP II – Contratos Electrónicos" (jbjy-vk9h), consulta por documento del proveedor. Contratos: CM-CD-125-2024 (Concejo), 00000848 de 2025 (' + SECOP + 'CO1.NTC.7660302) y CPS-207-2025 (' + SECOP + 'CO1.NTC.7892788).', [C + '/P01_pancha_contratos_concejo_alcaldia_imrd.png']));

push(HE('El ', { b: 'sábado 13 de septiembre de 2025' }, ', el señor Pancha Vivas solicitó por escrito la terminación de su contrato con la Secretaría General "a partir del día de hoy" ', ref(7), '. Ese mismo sábado, el supervisor emitió la viabilidad de la terminación anticipada, dirigida al Secretario General ', ref(8), ', y el ', { b: 'Secretario General, Bierman Suárez Martínez' }, ', firmó el acta de terminación por mutuo acuerdo, "dado en Cúcuta a los 13 de septiembre de 2025". El acta la revisó Clara Paola Aguilar Barreto, asesora de la Secretaría General ', ref(9), '. La terminación quedó registrada en SECOP el 16 de septiembre, y la del contrato con el IMRD, el 15 ', ref(10), '.'));
push(PR('Solicitud de terminación del contrato 00000848 de 2025, fechada el 13 de septiembre de 2025.', 'Documento "SOLICITUD TERMINACION.pdf" del contrato CO1.PCCNTR.7513794, ' + SECOP + 'CO1.NTC.7660302', [C + '/P02_pancha_solicitud_terminacion_sabado_13sep2025.png']));
push(PR('Viabilidad de la terminación anticipada emitida por el supervisor el 13 de septiembre de 2025.', 'Documento "viabilidad terminacion anticipada.pdf" del contrato CO1.PCCNTR.7513794, ' + SECOP + 'CO1.NTC.7660302', [C + '/P03_pancha_viabilidad_supervisor_13sep2025.png']));
push(PR('Acta de terminación anticipada por mutuo acuerdo, firmada por el Secretario General el 13 de septiembre de 2025.', 'Documento "acta de terminacion ronald.pdf" del contrato CO1.PCCNTR.7513794, ' + SECOP + 'CO1.NTC.7660302', [C + '/P04_pancha_acta_terminacion_13sep2025_p1.png', C + '/P04_pancha_acta_terminacion_13sep2025_p2_firmas.png']));
push(PR('SECOP II – Modificaciones a contratos: terminaciones de los contratos CO1.PCCNTR.7513794 (Alcaldía) y CO1.PCCNTR.7698413 (IMRD).', 'Portal Nacional de Datos Abiertos, conjunto "SECOP II – Modificaciones a contratos" (cb9c-h8sn).', [C + '/P06_pancha_terminaciones_registradas_datosgovco.png']));

push(HE('Dos días después, el ', { b: 'lunes 15 de septiembre de 2025' }, ', el acta de constitución de la sociedad designó como ', { b: 'Director General y representante legal a Ronald Eduardo Pancha Vivas' }, ' (Prueba N.º 3). El municipio, como titular del 52%, tenía la mayoría en la asamblea que lo eligió.'));

push(H2('C. La cuenta de la sociedad en SECOP, abierta por un contratista vigente de la Secretaría General'));
push(HE('El señor ', { b: 'Brayan Víctor Alfonso Blanco Vivas' }, ' tenía con el Municipio el contrato 00000379 de 2025, para la Oficina Asesora Jurídica, vigente del 5 de febrero al 25 de diciembre de 2025. En 2026 es contratista del Concejo de Cúcuta ', ref(11), '.'));
push(PR('SECOP II – Contratos Electrónicos: contratos de Brayan Víctor Alfonso Blanco Vivas.', 'Portal Nacional de Datos Abiertos, conjunto jbjy-vk9h, consulta por nombre del proveedor. Contrato 00000379-2025 (CO1.PCCNTR.7404054): ' + SECOP + 'CO1.NTC.7530100', [C + '/B01_brayan_contratos_alcaldia_concejo.png']));

push(HE('El 23 de septiembre de 2025, su supervisor, ', { b: 'Misael Alexander Zambrano Galvis' }, ', jefe de la Oficina de Gestión Jurídica, solicitó prorrogar el contrato. En esa solicitud dejó constancia de que el contratista "actualmente presta sus servicios a la dependencia ', { b: 'SECRETARIA GENERAL' }, '", y de que el plazo inicial vencía el 4 de octubre de 2025 ', ref(12), '. La prórroga y adición se firmó el ', { b: 'viernes 3 de octubre de 2025' }, '. Por la Alcaldía la firmó ', { b: 'Clara Paola Aguilar Barreto' }, ', como Secretaria de Despacho (E) de la Secretaría General ', ref(13), '. Quedó registrada en SECOP ese mismo día ', ref(14), '.'));
push(PR('Solicitud de adición y prórroga del contrato 00000379 de 2025, del 23 de septiembre de 2025.', 'Documento "SolicitudModificacionContrato – BRAYAN VICTOR ALFONSO BLANCO VIVAS.pdf" del contrato CO1.PCCNTR.7404054, ' + SECOP + 'CO1.NTC.7530100', [C + '/B02_brayan_solicitud_prorroga_presta_servicios_secretaria_general.png']));
push(PR('Modificación por adición y prórroga N.º 00000001, firmada el 3 de octubre de 2025 (primera página y página de firmas).', 'Documento "ModificatorioContrato – BRAYAN VICTOR ALFONSO BLANCO VIVAS.pdf" del contrato CO1.PCCNTR.7404054, ' + SECOP + 'CO1.NTC.7530100', [C + '/B03_brayan_prorroga_03oct2025_p1.png', C + '/B03_brayan_prorroga_03oct2025_p3_firmas.png']));
push(PR('SECOP II – Modificaciones a contratos: modificación del contrato CO1.PCCNTR.7404054, registrada el 3 de octubre de 2025.', 'Portal Nacional de Datos Abiertos, conjunto cb9c-h8sn.', [C + '/B04_brayan_prorroga_registrada_03oct2025.png']));

push(HE('Al día siguiente, el ', { b: 'sábado 4 de octubre de 2025 a las 5:46 p. m.' }, ', con su contrato con la Alcaldía vigente, se creó en el SECOP II la cuenta de proveedor del NIT 901990330, que corresponde a la sociedad. Se creó ', { b: 'a nombre de "BRAYAN VICTOR ALFONSO BLANCO VIVAS"' }, ', con el correo GOCUCUTASAS@GMAIL.COM, la dirección CALLE 11 No. 5-49 (Palacio Municipal) y Ronald Eduardo Pancha Vivas como representante legal ', ref(15), '. Es la cuenta con la que la sociedad presentó ofertas y contrató con el Municipio.'));
push(PR('SECOP II – Proveedores Registrados: registro completo del NIT 901990330 y comparación con la cuenta personal del señor Blanco Vivas.', 'Portal Nacional de Datos Abiertos, conjunto "SECOP II – Proveedores Registrados" (qmzu-gj57), https://www.datos.gov.co/resource/qmzu-gj57.json?nit=901990330 y consulta por NIT 901990330 y 1090497846.', [C + '/B06_cuenta_secop_nit_901990330_registro_completo_api.png', C + '/B05_cuenta_secop_empresa_creada_04oct2025_a_nombre_de_brayan.png']));

push(HE('El ', { b: '20 de enero de 2026' }, ', el mismo ', { b: 'Misael Alexander Zambrano Galvis' }, ', firmando como alcalde del municipio, expidió el Decreto 0013 de 2026. Con él delegó en ', { b: 'Soraya Tatiana Cáceres Santos' }, ', jefe de la Oficina de Promoción Turística, que es miembro principal de la junta directiva de la sociedad, la ordenación del gasto del proyecto BPIN 2024540010101. El decreto lo proyectó Clara Paola Aguilar Barreto y lo revisó el Secretario General, Bierman Suárez Martínez ', ref(16), '. Con esa delegación se firmaron, cuatro y siete días después, los contratos de ANATO y de la Feria de Cúcuta con la sociedad.'));
push(PR('Decreto 0013 del 20 de enero de 2026, página de firmas.', 'Documento "5. DTO – 0013 – 2026 – DEL. SORAYA TATIANA – PROCESOS CULTURA 2.pdf", proceso OPT-CI-002-2026 (Feria de Cúcuta), ' + SECOP + 'CO1.NTC.9830121', [S + '/caps5/04_Decreto_0013_2026-2.png']));

push(H2('D. Los contratos'));
push(HE('Entre el 24 de enero y el 29 de octubre de 2026, el Municipio celebró con la sociedad ', { b: 'ocho contratos, todos por contratación directa' }, '. Siete invocan la causal de "contratos o convenios interadministrativos" y suman ', { b: '$10.587.587.687' }, '. El octavo es un comodato gratuito firmado por el ', { b: 'alcalde Jorge Enrique Acevedo Peñaloza' }, ' ', ref(17), '. Tres de esos contratos (ANATO, Feria y actividades artísticas) se firmaron el 24, 27 y 30 de enero de 2026, en los siete días anteriores al inicio de la restricción a la contratación directa por las elecciones presidenciales, que empezó el 31 de enero de 2026 (Ley 996 de 2005, art. 33).'));
push(PR('SECOP II – Contratos Electrónicos: los ocho contratos con el NIT 901990330 (modalidad, causal, valor, ordenador y supervisor).', 'Portal Nacional de Datos Abiertos, conjunto jbjy-vk9h, consulta por documento del proveedor 901990330. Procesos: ANATO ' + SECOP + 'CO1.NTC.9764355; Feria CO1.NTC.9830121; actividades artísticas CO1.NTC.9923488; PT-41 CO1.NTC.10488698; Gospel CO1.NTC.10596057; Navidad CO1.NTC.11004894; Gospel logística CO1.NTC.11073444; comodato CO1.NTC.11139941.', [A + '/contratos_world_go_datosgovco.png']));

push(HE('Los estudios previos de la propia Alcaldía reconocen dos cosas: que en la contratación interadministrativa "queda proscrita toda forma de intermediación", y que los contratos de obra y suministro con sociedades de economía mixta deben hacerse por licitación o selección abreviada ', ref(18), '. Aun así, la forma de pago de los contratos está atada a que la sociedad contrate a terceros: el segundo pago se hace "con el soporte de la contratación de la circulación de los artistas" ', ref(19), '. Es decir, la sociedad no ejecuta con capacidad propia, sino que subcontrata lo que el municipio debía contratar mediante selección objetiva.'));
push(PR('Estudio previo del contrato ANATO: prohibición de intermediación y excepción para obra y suministro.', 'Documento "8. ESTUDIO PREVIOS ANATO 2026.pdf", proceso OPT-CI-001-2026, ' + SECOP + 'CO1.NTC.9764355, pág. 10.', [A + '/estudio_anato_intermediacion-10.png']));
push(PR('Minuta del contrato de la Feria de Cúcuta: forma de pago condicionada a la contratación de artistas.', 'Documento "13. MINUTA CONTRATO INTERADMINISTRATIVO (1).pdf", proceso OPT-CI-002-2026, ' + SECOP + 'CO1.NTC.9830121, pág. 9.', [A + '/minuta_feria_formapago-09.png']));

push(HE('El valor del contrato de artistas de Cúcuta Gospel ($712.545.834) se sustentó en tres "cotizaciones" de julio de 2025, atribuidas a CORSANT, al Centro Cultural del Oriente Colombiano y a CENFER ', ref(20), '. Esas cotizaciones guardan entre sí ', { b: 'proporciones aritméticas idénticas en los tres ítems' }, ': en cada uno, la cotización 2 es exactamente la cotización 1 multiplicada por 1,012584, y la cotización 3 es exactamente la cotización 1 multiplicada por 0,984621. El precio de 2026 es, en los tres ítems, el promedio multiplicado por 1,00744 (Prueba N.º 20 y tabla siguiente). Tres oferentes independientes no pueden producir esas proporciones: las cotizaciones 2 y 3 se calcularon a partir de la 1.'));
push(PR('Análisis del sector de Cúcuta Gospel 2026: empresas cotizantes y tabla de cotizaciones.', 'Documento "6. ANALISIS DEL SECTOR CUCUTA GOSPEL 2026.pdf", proceso SCP-CI-002-2026, ' + SECOP + 'CO1.NTC.10596057, págs. 40 a 43.', [G + '/analisis_sector_gospel_p40-40.png', G + '/analisis_sector_gospel_p41-41.png', G + '/analisis_sector_gospel_p43-43.png']));
push(table(['Ítem', 'Cotización 1', 'Cotización 2', 'Cotización 3', 'Cot. 2 ÷ cot. 1', 'Cot. 3 ÷ cot. 1'], [
  ['1', '$283.176.109', '$286.739.695', '$278.821.206', '1,012584', '0,984621'],
  ['2', '$191.143.873', '$193.549.294', '$188.204.314', '1,012584', '0,984621'],
  ['3', '$233.620.290', '$236.560.248', '$230.027.495', '1,012584', '0,984621'],
], [700, 1600, 1600, 1600, 1600, 1600]));
push(P(''));

push(HE('El contrato de la Feria de Cúcuta (00004711 de 2026) se firmó por $2.128.229.265 y se adicionó en $1.064.000.000, ', { b: 'un 49,99% de su valor inicial' }, '. El concepto jurídico de la adición reconoce que el margen frente al tope legal del 50% era de "apenas $114.632,50" ', ref(21), '. La adición se destinó a siete artistas nacionales por $1.280.000.000: Luis Alfonso, $345 M; Jessi Uribe, $250 M; Jean Carlos Centeno, $180 M; Rafa Pérez, $175 M; Ciro Quiñónez, $135 M; Martín Elías Jr., $110 M; y Amín Martínez, $85 M. El objeto del contrato era la visibilización de los artistas "del municipio" y su presupuesto original para treinta artistas era de $358.400.000 ', ref(22), '. La propuesta de adición está en papelería de la sociedad cuyo membrete dice "Calle 11 # 5-49 Palacio Municipal".'));
push(PR('Concepto jurídico de la adición del contrato de la Feria: margen frente al tope del 50%.', 'Documento "CONCEPTO JURIDICO.pdf" (adición), proceso OPT-CI-002-2026, ' + SECOP + 'CO1.NTC.9830121, pág. 5.', [A + '/concepto_adicion_feria_margen-5.png']));
push(PR('Propuesta de adición de la Feria de Cúcuta presentada por la sociedad: artistas y valores.', 'Documento "PROPUESTA ADICIONAL FERIAS CUCUTA F.pdf", proceso OPT-CI-002-2026, ' + SECOP + 'CO1.NTC.9830121, págs. 3 y 4.', [A + '/adicion_feria_p3-3.png', A + '/adicion_feria_p4-4.png']));

push(HE('El contrato 00004943 de 2026 (PT-41), de dos meses de plazo, se firmó por $1.845.000.000 y se adicionó en $900.000.000 (48,8%) a los quince días de iniciado. La justificación fue un "incremento significativo e imprevisto en los costos" de materias primas y combustibles, y su objeto vuelve a incluir actividades de la Feria de Cúcuta 2026, que ya estaban contratadas en el contrato 00004711 ', ref(23), '.'));
push(PR('Propuesta de adición del contrato PT-41.', 'Documento "PROPUESTA ADICIONAL.pdf", proceso OPT-CI-003-2026, ' + SECOP + 'CO1.NTC.10488698, pág. 1.', [A + '/adicion_pt41_imprevistos-1.png']));

push(HE('En el contrato 00004784 de 2026 (actividades artísticas, $903.441.928) se autorizó el ', { b: 'pago N.º 1 por el 70% del valor, $632.409.350' }, ', con la sola "presentación del plan de trabajo y cronograma de actividades" ', ref(24), '. El informe de cumplimiento que sirvió de soporte, firmado por el representante legal de la sociedad y por el supervisor Walter Alexander Rodríguez Ortega, ', { b: 'trae el objeto de otro contrato' }, ': el de la Feria de Cúcuta (2026PT-40). Como única actividad registra la elaboración y socialización del plan de trabajo ', ref(25), '.'));
push(PR('Acta de pago N.º 1 del contrato 00004784 de 2026.', 'Documento "Acta de pago wo (1).pdf", proceso SCP-CI-001-2026, ' + SECOP + 'CO1.NTC.9923488, pág. 1.', [A + '/acta_pago_cp63-1.png']));
push(PR('Informe de cumplimiento del pago N.º 1 del contrato 00004784 de 2026, con el objeto del contrato 2026PT-40.', 'Documento "Informe de cumplimiento wo.pdf", proceso SCP-CI-001-2026, ' + SECOP + 'CO1.NTC.9923488, pág. 1.', [A + '/informe_cumplimiento_cp63-1.png']));

push(HE('El 29 de octubre de 2026, el alcalde ', { b: 'Jorge Enrique Acevedo Peñaloza' }, ' firmó como ordenador del gasto un comodato gratuito por cinco años de los locales 108D y 109E del Conjunto Las Almeidas, de propiedad del Municipio, en favor de la sociedad (Prueba N.º 17). El estudio previo del comodato reconoce que la Agencia Nacional de Contratación Pública, en su concepto C-861 de 2026, sostuvo que una sociedad comercial con ánimo de lucro no está comprendida en el artículo 38 de la Ley 9 de 1989, que solo permite comodatos con entidades públicas y entidades sin ánimo de lucro ', ref(26), '. El informe técnico de esos locales se hizo "a solicitud de la Oficina de Turismo" el 10 de mayo de 2025, ', { b: 'cuatro meses antes de que existiera la sociedad' }, ' ', ref(27), '.'));
push(PR('Estudio previo del comodato: referencia al concepto C-861 de 2026.', 'Documento "4. ESTUDIOS PREVIO COMODATO GO.pdf", proceso DA-CDCO-002-2026, ' + SECOP + 'CO1.NTC.11139941, pág. 15.', [A + '/comodato_c861-15.png']));
push(PR('Informe técnico de los locales municipales, del 10 de mayo de 2025.', 'Documento "9. INFORME TECNICO.pdf", proceso DA-CDCO-002-2026, ' + SECOP + 'CO1.NTC.11139941, págs. 2 y 6.', [A + '/informe_tecnico_locales_p2-2.png', A + '/informe_tecnico_locales_p6-6.png']));

// ------------------------------------------------ ADECUACIÓN
push(H1('II. ADECUACIÓN TÍPICA'));
push(H2('1. Contrato sin cumplimiento de requisitos legales (art. 410 del Código Penal)'));
push(P('Comete este delito el servidor público que, por razón de sus funciones, tramite un contrato sin observar los requisitos legales esenciales, o lo celebre o liquide sin verificar que se cumplan. La Sala de Casación Penal ha precisado que el requisito incumplido debe identificarse de forma concreta en el régimen aplicable', fn('Corte Suprema de Justicia, Sala de Casación Penal, sentencia SP7322-2017, rad. 49819, 24 de mayo de 2017; y SP3963-2017, rad. 40216.'), '. En este caso los requisitos esenciales desconocidos son:'));
push(BL({ b: 'La modalidad de selección. ' }, 'Se usó la causal de contratación directa del literal c) del numeral 4 del artículo 2 de la Ley 1150 de 2007 para objetos que materialmente son suministro y alquiler de bienes (sonido, luces, tarimas, pantallas LED, souvenirs), excluidos expresamente de esa vía cuando la ejecutora es una sociedad de economía mixta. Además, se usó una sociedad sin capacidad propia como intermediaria, algo que los propios estudios previos reconocen como prohibido (hechos 13 y 14).'));
push(BL({ b: 'El análisis del sector y el estudio de mercado ' }, '(Decreto 1082 de 2015, art. 2.2.1.1.1.6.1). El valor de los contratos se fijó con "invitaciones" respondidas solo por la sociedad contratista y, en el caso de Cúcuta Gospel, con cotizaciones derivadas aritméticamente entre sí (hecho 15).'));
push(BL({ b: 'La procedencia legal del comodato ' }, '(Ley 9 de 1989, art. 38). Los bienes municipales se entregaron en comodato gratuito a una sociedad comercial, pese a la advertencia contenida en el propio estudio previo (hecho 19).'));
push(P('La conducta se atribuye a los servidores que tramitaron y celebraron los contratos como ordenadores del gasto, y al alcalde por el comodato.'));

push(H2('2. Interés indebido en la celebración de contratos (art. 409 del Código Penal)'));
push(P('Comete este delito el servidor público que se interese, en provecho propio o de un tercero, en cualquier clase de contrato u operación en que deba intervenir por razón de su cargo. Aquí, servidores que forman parte de la junta directiva de la contratista (la Oficina de Promoción Turística como principal; el Secretario General y el Secretario de Cultura y Patrimonio como suplentes) intervinieron en la estructuración, la ordenación del gasto o la supervisión de sus contratos (hechos 3, 12 y 13). La administración, además, preparó la llegada del director de la sociedad terminando su contrato con la Secretaría General un sábado para designarlo el lunes (hechos 7 y 8), y la cuenta de proveedor de la sociedad la abrió un contratista vigente de la misma Secretaría (hechos 9 a 11). El interés en favor de un tercero, que es la sociedad y sus socios privados, no requiere un beneficio económico personal.'));

push(H2('3. Falsedad ideológica en documento público (art. 286 del Código Penal)'));
push(P('El análisis del sector de Cúcuta Gospel es un documento público que consigna como "cotizaciones recibidas" de tres empresas unas cifras que guardan proporciones idénticas en los tres ítems. Eso es incompatible con la existencia de tres ofertas independientes (hecho 15). Se solicita establecer si CORSANT, el Centro Cultural del Oriente Colombiano y CENFER emitieron esas cotizaciones, y quiénes elaboraron y suscribieron el documento.'));

push(H2('4. Peculado por apropiación en favor de terceros (art. 397 del Código Penal)'));
push(P('Hay indicios de apropiación de recursos públicos en favor de terceros. Se pagó el 70% de un contrato contra un plan de trabajo, con un informe de cumplimiento que corresponde a otro contrato (hecho 18). La Feria de Cúcuta 2026 quedó contratada en dos contratos simultáneos (hechos 16 y 17) y Cúcuta Gospel se dividió en dos contratos. Se pagaron cachés de artistas sin comparación de mercado (hecho 16) y la sociedad intermedió con un margen que no se revela (hecho 14). La cuantía debe establecerse con los soportes de ejecución y los subcontratos de la sociedad.'));

push(H2('5. Participación de particulares (arts. 29 y 30 del Código Penal)'));
push(P('Los particulares que, sin tener la calidad de servidores públicos, contribuyen dolosamente a la realización de los delitos anteriores responden como intervinientes. Es el caso del representante legal de la sociedad, que recibió y ejecutó los contratos y firmó la propuesta de adición y el informe de cumplimiento (hechos 7, 8, 16 y 18); del contratista que abrió la cuenta de proveedor de la sociedad (hechos 10 y 11); y de quienes, como contratistas, estructuraron los estudios previos y los análisis del sector.'));

push(H2('6. Concierto para delinquir (art. 340 del Código Penal)'));
push(P('La secuencia coordinada de los hechos 1 a 19 entre servidores y contratistas puede corresponder a un acuerdo de voluntades para cometer delitos contra la administración pública de forma indeterminada y permanente: la creación de la sociedad, la provisión de su director y de su cuenta de proveedor desde la Secretaría General, la delegación del gasto en un miembro de su junta y la adjudicación sucesiva de contratos. Corresponde a la Fiscalía establecerlo.'));

// ------------------------------------------------ RESPONSABLES
push(H1('III. CIRCUNSTANCIAS DE TIEMPO, MODO Y LUGAR'));
push(P('Los hechos ocurrieron en San José de Cúcuta entre el 24 de abril de 2025 (Acuerdo 012) y el 29 de octubre de 2026 (comodato), en la Alcaldía de San José de Cúcuta, cuya sede es la Calle 11 N.º 5-49 (Palacio Municipal), que es también el domicilio de la sociedad contratista. El modo se describe en el capítulo I.'));

push(H1('IV. PRESUNTOS RESPONSABLES'));
push(P('Se denuncia a las siguientes personas, sin perjuicio de la presunción de inocencia y de las demás que la investigación identifique:'));
push(table(['Nombre', 'Calidad', 'Intervención', 'Conductas'], [
  ['Jorge Enrique Acevedo Peñaloza', 'Alcalde de Cúcuta', 'Iniciativa del Acuerdo 012; mayoría en la asamblea de la sociedad; ordenador del comodato', 'Arts. 410, 409 y 340'],
  ['Soraya Tatiana Cáceres Santos', 'Jefe de la Oficina de Promoción Turística (miembro principal de la junta)', 'Ordenadora y supervisora de ANATO y de la Feria (adición del 49,99%)', 'Arts. 410, 409 y 397'],
  ['Maribel García Quiroga', 'Ordenadora del gasto', 'Ordenadora de actividades artísticas (pago del 70%) y de Gospel artistas; supervisora de Gospel', 'Arts. 410, 409, 286 y 397'],
  ['Liliana Yarley Suárez Carrillo', 'Ordenadora del gasto', 'Ordenadora de PT-41 (adición del 48,8%) y de la estrategia navideña', 'Arts. 410 y 397'],
  ['Yurgen Antonio Parada Santiago', 'Ordenador del gasto', 'Ordenador de Gospel logística', 'Art. 410'],
  ['Bierman Suárez Martínez', 'Secretario General (suplente de la junta)', 'Firmó la terminación del contrato de Pancha Vivas el 13-sep-2025; revisó el Decreto 0013', 'Arts. 409 y 340'],
  ['Misael Alexander Zambrano Galvis', 'Jefe de la Oficina de Gestión Jurídica; alcalde (e)', 'Supervisor del contratista que abrió la cuenta de la sociedad; firmó el Decreto 0013', 'Arts. 409 y 340'],
  ['Clara Paola Aguilar Barreto', 'Asesora / Secretaria General (E)', 'Firmó la prórroga del contratista; proyectó el Decreto 0013; revisó la terminación de Pancha', 'Arts. 409 y 340'],
  ['Jesús Alberto Hernández Callejas', 'Supervisor del contrato de la Feria', 'Concepto técnico de la adición del 49,99%', 'Arts. 410 y 397'],
  ['Walter Alexander Rodríguez Ortega', 'Supervisor del contrato 00004784', 'Certificó el cumplimiento para el pago del 70% con un informe de otro objeto', 'Art. 397'],
  ['Ronald Eduardo Pancha Vivas', 'Particular; Director General de la sociedad', 'Recibió y ejecutó los contratos', 'Intervinientes (art. 30), arts. 410, 409, 397 y 340'],
  ['Brayan Víctor Alfonso Blanco Vivas', 'Particular; contratista de la Alcaldía', 'Abrió la cuenta de proveedor de la sociedad siendo contratista vigente', 'Interviniente (art. 30), arts. 409 y 340'],
  ['Marilin Teresa Ascanio Pacheco', 'Contratista estructuradora de la Secretaría General', 'Proyectó estudios previos, resoluciones y conceptos de los contratos', 'Interviniente (art. 30), arts. 410 y 286'],
], [2100, 2000, 3060, 2200]));
push(P(''));

// ------------------------------------------------ PRUEBAS
push(H1('V. PRUEBAS'));
push(H2('A. Documentales que se aportan'));
push(P('Se aportan las pruebas reproducidas en el capítulo I, cuyos originales en formato digital se entregan en el medio magnético anexo:'));
pruebas.forEach((x) => push(BL({ b: `Prueba N.º ${x.n}. ` }, x.titulo)));
push(H2('B. Pruebas que se solicita recaudar'));
[
  'Inspección o requerimiento al Municipio de San José de Cúcuta del expediente contractual completo de los ocho contratos con el NIT 901990330: informes de supervisión, soportes de pago, actas de recibo, CDP y RP.',
  'Requerimiento a la sociedad de los subcontratos, órdenes de compra y pagos a terceros hechos con recursos de esos contratos; de sus estados financieros y planta de personal; de la composición accionaria certificada por el revisor fiscal; y del comprobante de pago del aporte municipal.',
  'Entrevista o requerimiento a CORSANT, al Centro Cultural del Oriente Colombiano y a CENFER sobre las cotizaciones de julio de 2025 atribuidas a ellos.',
  'Requerimiento de los contratos y cachés pagados a los artistas de la Feria de Cúcuta 2026 y de Cúcuta Gospel 2026.',
  'Requerimiento de los informes de actividades de Ronald Eduardo Pancha Vivas (contratos 00000848 de 2025 y CPS-207-2025) y de Brayan Víctor Alfonso Blanco Vivas (contrato 00000379 de 2025).',
  'Requerimiento a la Agencia Nacional de Contratación Pública – Colombia Compra Eficiente de la trazabilidad de la creación y administración de la cuenta de proveedor del NIT 901990330 en el SECOP II: usuario creador, dirección IP y usuarios autorizados.',
  'Requerimiento al Consejo Nacional Electoral de los informes de ingresos de la campaña de Jorge Enrique Acevedo Peñaloza a la Alcaldía de Cúcuta (2023), para verificar aportes de la sociedad, de sus socios o de su representante legal (Ley 1474 de 2011, art. 2).',
].forEach((t) => push(BL(t)));

// ------------------------------------------------ SOLICITUDES
push(H1('VI. SOLICITUDES'));
[
  'Iniciar la indagación por los hechos denunciados y asignarla a la Dirección Especializada contra los Delitos contra la Administración Pública, dada la cuantía y la participación del alcalde municipal.',
  'Compulsar copias a la Procuraduría General de la Nación, por las faltas gravísimas de los artículos 54 y 70 de la Ley 1952 de 2019 y del artículo 84 de la Ley 1474 de 2011, y a la Contraloría General de la República, por la gestión de recursos del Sistema General de Participaciones ($5.482 millones) y la presunción de culpa grave del artículo 118 de la Ley 1474 de 2011.',
  'Tener como víctima al Municipio de San José de Cúcuta y comunicarle la apertura de la indagación.',
  'Informar al denunciante el número de noticia criminal asignado y la fiscalía de conocimiento.',
].forEach((t) => push(BL(t)));

push(H1('VII. JURAMENTO'));
push(P('Bajo la gravedad del juramento, que se entiende prestado con la firma de este escrito (Ley 906 de 2004, art. 69), manifiesto que no he presentado denuncia por estos mismos hechos ante otra autoridad y que lo narrado corresponde a la información contenida en los documentos públicos que se aportan.'));

push(H1('VIII. ANEXOS'));
push(BL('Medio magnético con las capturas y los documentos originales descargados de SECOP II y de datos.gov.co, con la relación de enlaces de verificación.'));
push(BL('Copia de la cédula de ciudadanía del denunciante.'));

push(H1('IX. NOTIFICACIONES'));
push(P('Recibiré notificaciones en [DIRECCIÓN], en el correo electrónico [CORREO] y en el teléfono [TELÉFONO].'));
push(new Paragraph({ spacing: { before: 600 } }));
push(C0('Atentamente,'), new Paragraph({ spacing: { before: 700 } }), C0('_______________________________'), C0('[NOMBRE COMPLETO DEL DENUNCIANTE]', { bold: true }), C0('C.C. [NÚMERO]'));

// =====================================================================
const doc = new Document({
  creator: 'Denuncia World Go', title: 'Denuncia penal – contratos Municipio de Cúcuta y World Go Colombia S.A.S.',
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 26, bold: true }, paragraph: { spacing: { before: 320, after: 160 }, keepNext: true } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true }, paragraph: { spacing: { before: 240, after: 120 }, keepNext: true } },
    ],
  },
  numbering: { config: [{ reference: 'vinetas', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }] },
  footnotes,
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, bottom: 1300, left: 1300, right: 1300 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], font: FONT, size: 16 })] })] }) },
    children: body,
  }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(OUT, b); console.log('ok', OUT, 'hechos', hecho, 'pruebas', prueba, 'notas', fnId); });
