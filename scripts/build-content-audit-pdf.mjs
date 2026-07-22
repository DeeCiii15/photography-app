/**
 * Build a PDF of the site content audit from page-content-audit.json
 * Run: node scripts/build-content-audit-pdf.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const audit = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/page-content-audit.json'), 'utf8'),
);

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
const pdfPath = path.join(outDir, 'site-content-audit.pdf');

const doc = new PDFDocument({
  margin: 50,
  size: 'LETTER',
  info: {
    Title: 'Taylor Rose Reels — Site Content Audit',
    Author: 'Taylor Rose Reels',
    Subject: 'Page titles, headings, and first ~25 words',
  },
});

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function ensureSpace(needed = 80) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

function headingList(label, items) {
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#8b5a3c').text(label);
  doc.moveDown(0.15);
  if (!items?.length) {
    doc.font('Helvetica-Oblique').fontSize(10).fillColor('#6b5f52').text('—');
  } else {
    doc.font('Helvetica').fontSize(10).fillColor('#2c241c');
    for (const item of items) {
      doc.text(`• ${item}`, { width: pageWidth });
    }
  }
  doc.moveDown(0.35);
}

// Cover / intro
doc.font('Helvetica-Bold').fontSize(20).fillColor('#2c241c').text('Site content audit');
doc.moveDown(0.4);
doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor('#6b5f52')
  .text(
    'Document title, H1–H3 headings, and the first ~25 words of visible copy for every live route on Taylor Rose Reels.',
    { width: pageWidth },
  );
doc.moveDown(0.5);
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor('#6b5f52')
  .text(
    `Generated ${audit.generatedAt.slice(0, 10)}  ·  ${audit.pageCount} pages  ·  Source: page components, services/portfolio data, and blog MDX`,
  );
doc.moveDown(1);

const groups = [...new Set(audit.pages.map((p) => p.group))];

doc.font('Helvetica-Bold').fontSize(12).fillColor('#2c241c').text('Contents');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(10).fillColor('#2c241c');
for (const g of groups) {
  const n = audit.pages.filter((p) => p.group === g).length;
  doc.text(`${g} (${n})`);
}
doc.moveDown(1);

for (const g of groups) {
  const pages = audit.pages.filter((p) => p.group === g);
  ensureSpace(60);
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#2c241c').text(g);
  doc
    .moveTo(doc.page.margins.left, doc.y + 2)
    .lineTo(doc.page.margins.left + pageWidth, doc.y + 2)
    .strokeColor('#2c241c')
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.8);

  for (const p of pages) {
    ensureSpace(120);
    doc.font('Courier-Bold').fontSize(11).fillColor('#8b5a3c').text(p.path);
    doc.moveDown(0.2);
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#2c241c')
      .text(`Title: ${p.title}`, { width: pageWidth });
    doc.moveDown(0.4);

    headingList('H1', p.h1);
    headingList('H2', p.h2);
    headingList('H3', p.h3);

    doc.font('Helvetica-Bold').fontSize(9).fillColor('#8b5a3c').text('First ~25 words');
    doc.moveDown(0.15);
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#2c241c')
      .text(p.first25, { width: pageWidth });
    doc.moveDown(0.3);

    if (p.notes) {
      doc
        .font('Helvetica-Oblique')
        .fontSize(9)
        .fillColor('#6b5f52')
        .text(`Note: ${p.notes}`, { width: pageWidth });
      doc.moveDown(0.3);
    }

    doc.moveDown(0.5);
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.margins.left + pageWidth, doc.y)
      .strokeColor('#ddd4c8')
      .lineWidth(0.5)
      .stroke();
    doc.moveDown(0.7);
  }
}

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Wrote ${pdfPath} (${fs.statSync(pdfPath).size} bytes)`);
