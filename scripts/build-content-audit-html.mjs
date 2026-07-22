/**
 * Build a printable HTML (+ optional PDF) of the site content audit.
 * Run: node scripts/build-content-audit-html.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const audit = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/page-content-audit.json'), 'utf8'),
);

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function listCell(items) {
  if (!items?.length) return '<span class="empty">—</span>';
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

const groups = [...new Set(audit.pages.map((p) => p.group))];
const counts = Object.fromEntries(
  groups.map((g) => [g, audit.pages.filter((p) => p.group === g).length]),
);

const toc = groups
  .map(
    (g) =>
      `<li><a href="#group-${esc(g).replace(/\s+/g, '-')}">${esc(g)}</a> <span class="muted">(${counts[g]})</span></li>`,
  )
  .join('');

const sections = groups
  .map((g) => {
    const pages = audit.pages.filter((p) => p.group === g);
    const rows = pages
      .map(
        (p) => `
      <article class="page" id="${esc(p.path)}">
        <header>
          <h3><code>${esc(p.path)}</code></h3>
          <p class="title"><strong>Title:</strong> ${esc(p.title)}</p>
        </header>
        <div class="grid">
          <div>
            <h4>H1</h4>
            ${listCell(p.h1)}
          </div>
          <div>
            <h4>H2</h4>
            ${listCell(p.h2)}
          </div>
          <div>
            <h4>H3</h4>
            ${listCell(p.h3)}
          </div>
        </div>
        <p class="first25"><strong>First ~25 words:</strong> ${esc(p.first25)}</p>
        ${p.notes ? `<p class="notes"><strong>Note:</strong> ${esc(p.notes)}</p>` : ''}
      </article>`,
      )
      .join('');

    return `
    <section class="group" id="group-${esc(g).replace(/\s+/g, '-')}">
      <h2>${esc(g)} <span class="muted">(${pages.length})</span></h2>
      ${rows}
    </section>`;
  })
  .join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Taylor Rose Reels — Site Content Audit</title>
  <style>
    :root {
      --ink: #2c241c;
      --muted: #6b5f52;
      --line: #ddd4c8;
      --bg: #faf8f4;
      --card: #fff;
      --accent: #8b5a3c;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      color: var(--ink);
      background: var(--bg);
      line-height: 1.5;
      font-size: 14px;
    }
    .wrap { max-width: 920px; margin: 0 auto; padding: 40px 28px 80px; }
    h1 { font-size: 1.85rem; margin: 0 0 8px; font-weight: 600; }
    h2 {
      font-size: 1.35rem;
      margin: 40px 0 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--ink);
      page-break-after: avoid;
    }
    h3 { font-size: 1.05rem; margin: 0 0 8px; }
    h4 {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      margin: 0 0 6px;
      font-family: system-ui, sans-serif;
    }
    .lede { color: var(--muted); margin: 0 0 20px; max-width: 42em; }
    .meta {
      font-family: system-ui, sans-serif;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 24px;
    }
    .toc {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }
    .toc h2 { margin-top: 0; font-size: 1rem; border: none; padding: 0; }
    .toc ul { margin: 0; padding-left: 1.2em; columns: 2; gap: 24px; }
    .toc a { color: var(--accent); text-decoration: none; }
    .toc a:hover { text-decoration: underline; }
    .muted { color: var(--muted); font-weight: 400; }
    .page {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px 18px;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .page code {
      font-family: ui-monospace, Consolas, monospace;
      font-size: 0.95em;
      color: var(--accent);
    }
    .title { margin: 0 0 12px; }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    ul { margin: 0; padding-left: 1.1em; }
    li { margin-bottom: 2px; }
    .empty { color: var(--muted); }
    .first25, .notes { margin: 8px 0 0; }
    .notes { color: var(--muted); font-size: 0.92em; font-style: italic; }
    @media (max-width: 700px) {
      .grid { grid-template-columns: 1fr; }
      .toc ul { columns: 1; }
    }
    @media print {
      body { background: white; font-size: 11pt; }
      .wrap { padding: 0; max-width: none; }
      .toc { break-after: page; }
      .page { border-color: #ccc; box-shadow: none; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Site content audit</h1>
    <p class="lede">
      Document title, H1–H3 headings, and the first ~25 words of visible copy
      for every live route on Taylor Rose Reels.
    </p>
    <p class="meta">
      Generated ${esc(audit.generatedAt.slice(0, 10))} · ${audit.pageCount} pages ·
      Source: page components, services/portfolio data, and blog MDX
    </p>

    <nav class="toc">
      <h2>Contents</h2>
      <ul>${toc}</ul>
    </nav>

    ${sections}
  </div>
</body>
</html>
`;

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
const htmlPath = path.join(outDir, 'site-content-audit.html');
const pdfPath = path.join(outDir, 'site-content-audit.pdf');
fs.writeFileSync(htmlPath, html);
console.log(`Wrote ${htmlPath}`);

const edge =
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chrome =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = fs.existsSync(edge) ? edge : fs.existsSync(chrome) ? chrome : null;

if (browser) {
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const result = spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      `--print-to-pdf=${pdfPath}`,
      '--no-pdf-header-footer',
      fileUrl,
    ],
    { encoding: 'utf8', timeout: 60000 },
  );
  if (fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 1000) {
    console.log(`Wrote ${pdfPath} (${fs.statSync(pdfPath).size} bytes)`);
  } else {
    console.warn('PDF generation failed or produced an empty file.');
    if (result.stderr) console.warn(result.stderr);
    if (result.stdout) console.warn(result.stdout);
  }
} else {
  console.warn('No Edge/Chrome found — open the HTML and Print → Save as PDF.');
}
