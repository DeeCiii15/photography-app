import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioShootCard } from '@/lib/portfolioData';
import { getGridTiltPosition, getScrapbookStyle, polaroidImageFrameClass } from '@/lib/scrapbookGalleryStyles';

type PortfolioShootGridProps = {
  shoots: PortfolioShootCard[];
  categoryName: string;
};

function ShootCard({
  shoot,
  index,
}: {
  shoot: PortfolioShootCard;
  index: number;
}) {
  const { side, row } = getGridTiltPosition(index, 3);
  const s = getScrapbookStyle(side, row);

  return (
    <div className="w-full min-w-0 px-0.5 sm:px-2">
      <Link
        href={shoot.href}
        className={`group block w-full transition duration-300 hover:z-10 ${s.rotate} ${s.push} hover:scale-[1.02] hover:rotate-0`}
      >
        <div
          className={`scrapbook-mat flex flex-col overflow-hidden rounded-[2px] bg-[#faf8f4] p-1.5 dark:bg-[#2a2622] sm:p-2 ${s.lip}`}
        >
          <div className={polaroidImageFrameClass(index)}>
            <Image
              src={shoot.image}
              alt={shoot.title}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 33vw, 33vw"
            />
          </div>
          <div className="mt-1.5 shrink-0 px-0.5 text-center sm:mt-2 sm:px-1">
            <h3 className="font-display text-[0.8rem] leading-snug text-cream-dark dark:text-cream sm:text-xl">
              {shoot.label}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function PortfolioShootGrid({
  shoots,
}: PortfolioShootGridProps) {
  if (shoots.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/92 py-24 text-center shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark/48 dark:ring-boho-stone/25">
        <p className="text-lg text-cream-dark dark:text-cream">
          Sessions coming soon
        </p>
        <p className="mt-3 text-cream-dark/70 dark:text-cream/70">
          New shoots are on the way—check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-4 overflow-x-clip sm:gap-x-6 sm:gap-y-8 lg:gap-x-10">
      {shoots.map((shoot, i) => (
        <ShootCard key={shoot.slug} shoot={shoot} index={i} />
      ))}
    </div>
  );
}
