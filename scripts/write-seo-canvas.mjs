import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'reports/seo-canvas-data.json'), 'utf8'),
);
const canvasDir =
  'C:/Users/livingt/.cursor/projects/c-Dev-taylorrosereels/canvases';
fs.mkdirSync(canvasDir, { recursive: true });

const groupBlocks = data.groups
  .map((g) => {
    const rows = g.rows
      .map((r) => `      [${r.map((c) => JSON.stringify(c)).join(', ')}]`)
      .join(',\n');
    const tones = g.tones.map((t) => JSON.stringify(t)).join(', ');
    return `  {
    name: ${JSON.stringify(g.name)},
    count: ${g.count},
    rows: [
${rows}
    ],
    tones: [${tones}] as const,
  }`;
  })
  .join(',\n');

const src = `import {
  Callout,
  Card,
  CardBody,
  Divider,
  Grid,
  H1,
  H2,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const GROUPS = [
${groupBlocks}
];

export default function UatSeoPageSnapshot() {
  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <H1>Taylor Rose Reels — UAT SEO page snapshot</H1>
        <Text tone="secondary">
          Branch: user-acceptance-testing (local working tree) · ${data.pageCount} routes · generated ${data.generatedAt}
        </Text>
      </Stack>

      <Callout tone="info" title="Scope">
        Audited from the current UAT checkout including uncommitted local changes
        (new /services/* pages and renamed wedding gallery URLs). This is not live
        production at taylorrosereels.com. Titles/meta/H1/H2 come from source
        metadata and page copy used by the Next.js app.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="${String(data.pageCount)}" label="Pages audited" />
        <Stat value="6" label="New service pages" tone="success" />
        <Stat value="9" label="Renamed wedding shoots" tone="success" />
        <Stat value="${String(data.issueCount)}" label="Pages with notes" tone="warning" />
      </Grid>

      <H2>What is new on UAT vs production</H2>
      <Card>
        <CardBody>
          <Stack gap={6}>
            <Text>
              Six service hubs under /services/* (weddings, engagements, events,
              family, motherhood, portraits)
            </Text>
            <Text>
              Florence hub path is now /florence-sc-wedding-photography (was
              /wedding-photography-florence-sc on production)
            </Text>
            <Text>
              Wedding gallery URLs renamed to include venue slugs (e.g.
              …/pamplico-sc-wedding-sawtooth-acres)
            </Text>
            <Text>
              Experience and Pricing routes are gone from this UAT tree/sitemap
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <H2>Page-by-page SEO snapshot</H2>
      {GROUPS.map((g) => (
        <Stack key={g.name} gap={10}>
          <H2>
            {g.name} ({g.count})
          </H2>
          <Table
            headers={["Path", "Title", "Meta description", "H1", "H2", "Issues"]}
            rows={g.rows}
            rowTone={[...g.tones]}
          />
        </Stack>
      ))}

      <Divider />
      <Text tone="secondary" size="small">
        Full exports in repo: reports/seo-audit.json · reports/seo-audit.html ·
        reports/seo-audit.pdf
      </Text>
    </Stack>
  );
}
`;

const out = path.join(canvasDir, 'uat-seo-page-snapshot.canvas.tsx');
fs.writeFileSync(out, src);
console.log('wrote', out, src.length);
