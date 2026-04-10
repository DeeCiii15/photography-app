/**
 * Per-card scrapbook tilt, offset, and polaroid “lip” — home gallery + portfolio.
 * Even index → clockwise (leans right / toward the neighbor on the right).
 * Odd index → counter-clockwise (leans left / toward the neighbor on the left).
 * With CSS columns, that reads as each side-by-side pair tilting toward each other.
 * Indices 2–3 are flipped so the middle row leans the opposite way.
 */
export const SCRAPBOOK_STYLES = [
  { rotate: 'rotate-[2.5deg]', push: 'translate-y-3', lip: 'pb-9' },
  { rotate: '-rotate-[2.25deg]', push: '-translate-y-2', lip: 'pb-8' },
  { rotate: '-rotate-[2deg]', push: 'translate-y-5', lip: 'pb-10' },
  { rotate: 'rotate-[2.4deg]', push: '-translate-y-1', lip: 'pb-7' },
  { rotate: 'rotate-[1.85deg]', push: 'translate-y-2', lip: 'pb-9' },
  { rotate: '-rotate-[2deg]', push: 'translate-y-6', lip: 'pb-8' },
] as const;
