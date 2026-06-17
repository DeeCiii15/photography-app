/**
 * Scrapbook tilt for polaroid cards.
 * Left column always leans right (+); right column always leans left (−).
 * Center (wedding) uses a subtle neutral tilt.
 */

export type ScrapbookTiltSide = 'left' | 'right' | 'center';

export type ScrapbookStyle = {
  rotate: string;
  push: string;
  lip: string;
};

/** Leans clockwise — toward the center column */
const LEFT_STYLES: ScrapbookStyle[] = [
  { rotate: 'rotate-[2deg]', push: 'translate-y-1', lip: 'pb-8' },
  { rotate: 'rotate-[2.25deg]', push: 'translate-y-2', lip: 'pb-9' },
  { rotate: 'rotate-[1.75deg]', push: '-translate-y-1', lip: 'pb-8' },
];

/** Leans counter-clockwise — toward the center column */
const RIGHT_STYLES: ScrapbookStyle[] = [
  { rotate: '-rotate-[2deg]', push: '-translate-y-1', lip: 'pb-8' },
  { rotate: '-rotate-[2.25deg]', push: 'translate-y-2', lip: 'pb-9' },
  { rotate: '-rotate-[1.75deg]', push: 'translate-y-1', lip: 'pb-8' },
];

const CENTER_STYLES: ScrapbookStyle[] = [
  { rotate: 'rotate-[1deg]', push: 'translate-y-1', lip: 'pb-8' },
  { rotate: '-rotate-[0.75deg]', push: 'translate-y-2', lip: 'pb-9' },
  { rotate: 'rotate-[1.25deg]', push: 'translate-y-0', lip: 'pb-8' },
];

export function getScrapbookStyle(
  side: ScrapbookTiltSide,
  rowIndex = 0,
): ScrapbookStyle {
  const i = rowIndex % 3;
  if (side === 'left') return LEFT_STYLES[i]!;
  if (side === 'right') return RIGHT_STYLES[i]!;
  return CENTER_STYLES[i]!;
}

/** Row-major CSS grid: column 0 → left tilt, last column → right, middle → center */
export function getGridTiltPosition(
  index: number,
  columnCount = 3,
): { side: ScrapbookTiltSide; row: number } {
  const col = index % columnCount;
  const row = Math.floor(index / columnCount);
  if (col === 0) return { side: 'left', row };
  if (col === columnCount - 1) return { side: 'right', row };
  return { side: 'center', row };
}

/**
 * Masonry / CSS-columns layout: infer column from fill order (top-to-bottom per column).
 * First column → left tilt; last column → right tilt; middle → center.
 */
export function getMasonryTiltPosition(
  index: number,
  totalItems: number,
  columnCount: number,
): { side: ScrapbookTiltSide; row: number } {
  if (columnCount <= 1) {
    return {
      side: index % 2 === 0 ? 'left' : 'right',
      row: Math.floor(index / 2),
    };
  }

  const rowsPerColumn = Math.ceil(totalItems / columnCount);
  const col = Math.floor(index / rowsPerColumn);
  const row = index % rowsPerColumn;

  if (col === 0) return { side: 'left', row };
  if (col === columnCount - 1) return { side: 'right', row };
  return { side: 'center', row };
}

export function getScrapbookStyleForMasonryIndex(
  index: number,
  totalItems: number,
  columnCount: number,
): ScrapbookStyle {
  const { side, row } = getMasonryTiltPosition(index, totalItems, columnCount);
  return getScrapbookStyle(side, row);
}

/** Polaroid image area — same rough size with subtle aspect variation */
const POLAROID_ASPECTS = ['aspect-[4/5]', 'aspect-[5/6]', 'aspect-[9/11]'] as const;

export function polaroidImageFrameClass(index: number): string {
  return `relative isolate w-full max-w-full overflow-hidden bg-[#e8e3db] dark:bg-boho-ink ${POLAROID_ASPECTS[index % 3]}`;
}
