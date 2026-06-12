import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS_CENTERED } from '@/lib/portfolioData';
import { SCRAPBOOK_STYLES } from '@/lib/scrapbookGalleryStyles';

type PortfolioHomeGalleryProps = {
  variant?: 'home' | 'portfolio';
};

type HomeCard = (typeof PORTFOLIO_HOME_CARDS_CENTERED)[number];

function getCenteredGalleryGroups() {
  const weddingIndex = PORTFOLIO_HOME_CARDS_CENTERED.findIndex(
    (c) => c.name === 'Weddings',
  );
  const wedding = PORTFOLIO_HOME_CARDS_CENTERED[weddingIndex]!;
  const left = PORTFOLIO_HOME_CARDS_CENTERED.slice(0, weddingIndex);
  const right = PORTFOLIO_HOME_CARDS_CENTERED.slice(weddingIndex + 1);
  return { left, wedding, weddingIndex, right };
}

function imageFrameClass(i: number, variant: 'home' | 'portfolio'): string {
  const base = 'relative overflow-hidden bg-[#e8e3db] dark:bg-boho-ink';
  if (variant === 'home') {
    if (i % 3 === 0) return `${base} aspect-[5/4] min-h-[92px] sm:min-h-[200px]`;
    if (i % 3 === 1) return `${base} aspect-[4/5] min-h-[100px] sm:min-h-[220px]`;
    return `${base} aspect-[3/4] min-h-[88px] sm:min-h-[190px]`;
  }
  if (i % 3 === 0) return `${base} aspect-[5/4] min-h-[200px]`;
  if (i % 3 === 1) return `${base} aspect-[4/5] min-h-[220px]`;
  return `${base} aspect-[3/4] min-h-[190px]`;
}

function GalleryCard({
  card,
  index,
  variant,
  featured = false,
  className,
}: {
  card: HomeCard;
  index: number;
  variant: 'home' | 'portfolio';
  featured?: boolean;
  className?: string;
}) {
  const s = SCRAPBOOK_STYLES[index % SCRAPBOOK_STYLES.length];
  const isHome = variant === 'home';

  return (
    <Link
      href={card.href}
      className={`group block break-inside-avoid transition duration-300 hover:z-10 hover:scale-[1.02] hover:rotate-0 ${featured ? 'h-full' : ''} ${isHome && !featured ? 'mb-4 sm:mb-10' : !featured ? 'mb-10' : ''} ${s.rotate} ${s.push} ${className ?? ''}`}
    >
      <div
        className={`scrapbook-mat rounded-[2px] bg-[#faf8f4] p-2 dark:bg-[#2a2622] ${s.lip} ${featured ? 'flex h-full flex-col' : ''}`}
      >
        <div
          className={
            featured
              ? 'relative min-h-[190px] flex-1 bg-[#e8e3db] dark:bg-boho-ink'
              : imageFrameClass(index, variant)
          }
        >
          <Image
            src={card.image}
            alt={card.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes={
              featured
                ? '(max-width: 1024px) 100vw, 33vw'
                : '(max-width: 640px) 45vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        </div>
        <div
          className={`shrink-0 px-0.5 text-center ${isHome ? 'mt-1.5 sm:mt-3 sm:px-1' : 'mt-3 px-1'}`}
        >
          <h3
            className={
              isHome
                ? 'font-display text-[0.7rem] leading-tight text-cream-dark dark:text-cream sm:text-xl'
                : 'font-display text-xl text-cream-dark dark:text-cream'
            }
          >
            {card.name}
          </h3>
          <p
            className={
              isHome
                ? 'mt-0.5 font-body text-[0.55rem] italic leading-snug text-cream-dark/60 dark:text-cream/55 sm:text-xs'
                : 'mt-0.5 font-body text-xs italic text-cream-dark/60 dark:text-cream/55'
            }
          >
            {card.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioHomeGallery({
  variant = 'home',
}: PortfolioHomeGalleryProps) {
  const isHome = variant === 'home';
  const { left, wedding, weddingIndex, right } = getCenteredGalleryGroups();
  const mobileGridClass = isHome
    ? 'grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-8 sm:gap-y-10'
    : 'grid grid-cols-2 gap-x-8 gap-y-10';

  return (
    <>
      <div
        className={`hidden lg:grid lg:grid-cols-3 lg:items-stretch ${isHome ? 'lg:gap-x-10' : 'lg:gap-x-10'}`}
      >
        <div className={`flex flex-col ${isHome ? 'gap-10' : 'gap-10'}`}>
          {left.map((card, i) => (
            <GalleryCard
              key={card.name}
              card={card}
              index={i}
              variant={variant}
            />
          ))}
        </div>
        <GalleryCard
          card={wedding}
          index={weddingIndex}
          variant={variant}
          featured
          className="min-h-0"
        />
        <div className={`flex flex-col ${isHome ? 'gap-10' : 'gap-10'}`}>
          {right.map((card, i) => (
            <GalleryCard
              key={card.name}
              card={card}
              index={weddingIndex + 1 + i}
              variant={variant}
            />
          ))}
        </div>
      </div>

      <div className={`lg:hidden ${mobileGridClass}`}>
        {left.map((card, i) => (
          <GalleryCard
            key={card.name}
            card={card}
            index={i}
            variant={variant}
            className="mb-0"
          />
        ))}
        <div className="col-span-2 flex justify-center">
          <GalleryCard
            card={wedding}
            index={weddingIndex}
            variant={variant}
            className="mb-0 w-[calc(50%-0.25rem)] sm:w-[calc(50%-1rem)]"
          />
        </div>
        {right.map((card, i) => (
          <GalleryCard
            key={card.name}
            card={card}
            index={weddingIndex + 1 + i}
            variant={variant}
            className="mb-0"
          />
        ))}
      </div>
    </>
  );
}
