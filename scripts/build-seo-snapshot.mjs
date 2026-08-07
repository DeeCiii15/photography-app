import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const j = JSON.parse(
  fs.readFileSync(path.join(root, 'reports/seo-audit.json'), 'utf8'),
);

function issues(p) {
  const out = [];
  const title = String(p.title || '');
  const desc = String(p.description || '');
  const h1 = (p.h1 || []).join(' | ');
  const pathName = String(p.path);

  if (!desc.trim()) out.push('Missing meta description');
  if (desc.length > 160) out.push(`Meta desc >160 (${desc.length})`);
  if (desc.length > 0 && desc.length < 70) out.push(`Meta desc short (${desc.length})`);
  if (!h1.trim()) out.push('Missing H1');
  if (title.includes('${')) out.push('Unexpanded template in title');
  if (
    title.toLowerCase().includes('hatsville') ||
    h1.toLowerCase().includes('hatsville')
  ) {
    out.push('Typo: Hatsville→Hartsville');
  }
  if (
    pathName === '/services/wedding-photography' &&
    !/florence|pee dee|, sc/i.test(title)
  ) {
    out.push('Title missing location');
  }
  if (
    pathName === '/services/motherhood-photography' &&
    !/taylor rose/i.test(title)
  ) {
    out.push('Title missing brand suffix');
  }
  if (
    pathName === '/contact' &&
    !/florence|photographer|sc/i.test(title)
  ) {
    out.push('Title weak for local SEO');
  }
  if (pathName.startsWith('/blog/tag/')) {
    out.push('Thin tag page (only 2 posts sitewide)');
  }
  if (pathName.startsWith('/portfolio/') && pathName.split('/').length === 3) {
    if (/Gallery/i.test(title) && /Portfolios/i.test(h1)) {
      out.push('Title=Gallery vs H1=Portfolios');
    }
    if (
      /Gallery/i.test(title) &&
      !/florence|SC|portfolio photography/i.test(title)
    ) {
      out.push('Weak location in title');
    }
  }
  if (['/portfolio', '/blog', '/contact'].includes(pathName) && !(p.h2 || []).length) {
    out.push('No H2s');
  }
  return out.length ? out.join('; ') : '—';
}

const pages = j.pages.map((p) => ({
  group: p.group,
  path: p.path,
  title: p.title,
  desc: p.description || '',
  h1: (p.h1 || []).join(' | '),
  h2: (p.h2 || []).join(' · '),
  issue: issues(p),
}));

const out = {
  generatedAt: j.generatedAt,
  branch: 'user-acceptance-testing (local working tree)',
  note:
    'Audited from current UAT checkout including uncommitted local changes (new /services/* pages + renamed wedding galleries). Not live production.',
  pageCount: pages.length,
  pages,
};

fs.writeFileSync(
  path.join(root, 'reports/seo-snapshot.json'),
  JSON.stringify(out, null, 2),
);

console.log(
  'motherhood title:',
  pages.find((p) => p.path.includes('motherhood-photography'))?.title,
);
console.log('pages', pages.length);
console.log(
  'with issues',
  pages.filter((p) => p.issue !== '—').length,
);
pages
  .filter((p) => p.issue !== '—')
  .forEach((p) => console.log(p.path, '=>', p.issue));
