import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const audit = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/page-content-audit.json'), 'utf8'),
);
const pages = audit.pages;
const groups = [...new Set(pages.map((p) => p.group))];
const counts = Object.fromEntries(
  groups.map((g) => [g, pages.filter((p) => p.group === g).length]),
);

const dataLit = JSON.stringify(pages, null, 2);
const pills = groups
  .map(
    (g) =>
      `        <Pill key="${g}" tone="neutral">${g}: ${counts[g]}</Pill>`,
  )
  .join('\n');

const canvas = `import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Select,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from 'cursor/canvas';

type PageAudit = {
  group: string;
  path: string;
  title: string;
  h1: string[];
  h2: string[];
  h3: string[];
  first25: string;
  notes?: string;
};

const PAGES: PageAudit[] = ${dataLit};

const GROUPS = ['All', ...[...new Set(PAGES.map((p) => p.group))]];

function joinList(items: string[], empty = '—') {
  if (!items.length) return empty;
  return items.join(' · ');
}

function h3Cell(items: string[]) {
  if (!items.length) return '—';
  if (items.length <= 3) return items.join(' · ');
  return \`\${items.slice(0, 3).join(' · ')} (+\${items.length - 3} more)\`;
}

export default function SiteContentAudit() {
  const [group, setGroup] = useCanvasState('group', 'All');
  const filtered =
    group === 'All' ? PAGES : PAGES.filter((p) => p.group === group);

  return (
    <Stack gap={20} style={{ padding: 20, maxWidth: 1200 }}>
      <Stack gap={6}>
        <H1>Site content audit</H1>
        <Text tone="secondary">
          Title, H1–H3, and first ~25 words for every live route on Taylor Rose
          Reels. Source: page components, services/portfolio data, and blog MDX
          (generated ${audit.generatedAt.slice(0, 10)}).
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value={String(PAGES.length)} label="Live pages" />
        <Stat value="6" label="Service pages" />
        <Stat value="24" label="Portfolio shoots" />
        <Stat value="2" label="Blog posts" />
      </Grid>

      <Card>
        <CardHeader>How to read this</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text>
              Titles include the layout template (“| Taylor Rose Reels”) unless
              absolute metadata is set (home, contact, portfolio index, Florence
              location).
            </Text>
            <Text tone="secondary">
              FAQ questions use summary elements, not heading tags. Gallery shoot
              titles are H3s. Motherhood service has no tagged testimonials, so
              that H2 is omitted.
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Row gap={8} wrap>
${pills}
      </Row>

      <Divider />

      <Stack gap={10}>
        <Row gap={12} align="center" justify="space-between" wrap>
          <H2>Pages</H2>
          <Select
            value={group}
            onChange={setGroup}
            options={GROUPS.map((g) => ({ label: g, value: g }))}
          />
        </Row>
        <Text tone="secondary" style={{ fontSize: 12 }}>
          Showing {filtered.length} of {PAGES.length} · filter by group
        </Text>
        <Table
          stickyHeader
          striped
          headers={['Path', 'Title', 'H1', 'H2', 'H3', 'First ~25 words']}
          rows={filtered.map((p) => [
            p.path,
            p.title,
            joinList(p.h1),
            joinList(p.h2),
            h3Cell(p.h3),
            p.first25,
          ])}
        />
      </Stack>

      <Stack gap={8}>
        <H3>Notes on specific pages</H3>
        {PAGES.filter((p) => p.notes).map((p) => (
          <Text key={p.path} tone="secondary" style={{ fontSize: 12 }}>
            <Text weight="medium" style={{ display: 'inline' }}>
              {p.path}
            </Text>
            {' — '}
            {p.notes}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
}
`;

const out = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/c-Dev-taylorrosereels/canvases/site-content-audit.canvas.tsx',
);
fs.writeFileSync(out, canvas);
console.log(`Wrote ${out} (${fs.statSync(out).size} bytes)`);
