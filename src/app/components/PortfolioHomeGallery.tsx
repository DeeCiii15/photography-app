import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS_CENTERED } from '@/lib/portfolioData';
import {
  getGridTiltPosition,
  getScrapbookStyle,
  polaroidImageFrameClass,
} from '@/lib/scrapbookGalleryStyles';

type PortfolioHomeGalleryProps = {
  variant?: 'home' | 'portfolio';
};

type HomeCard = (typeof PORTFOLIO_HOME_CARDS_CENTERED)[number];

const GRID_CLASS =
  'grid grid-cols-3 gap-x-2 gap-y-4 overflow-x-clip sm:gap-x-6 sm:gap-y-8 lg:gap-x-10';

function GalleryCard({
  card,
  index,
  variant,
}: {
  card: HomeCard;
  index: number;
  variant: 'home' | 'portfolio';
}) {
  const { side, row } = getGridTiltPosition(index, 3);
  const s = getScrapbookStyle(side, row);
  const isHome = variant === 'home';

  return (
    <div className="w-full min-w-0 px-0.5 sm:px-2">
      <Link
        href={card.href}
        className={`group block w-full transition duration-300 hover:z-10 ${s.rotate} ${s.push} hover:scale-[1.02] hover:rotate-0`}
      >
        <div
          className={`scrapbook-mat flex w-full flex-col overflow-hidden rounded-[2px] bg-[#faf8f4] p-1.5 dark:bg-[#2a2622] sm:p-2 ${s.lip}`}
        >
          <div className={polaroidImageFrameClass(index)}>
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 33vw, 33vw"
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
    </div>
  );
}

export default function PortfolioHomeGallery({
  variant = 'home',
}: PortfolioHomeGalleryProps) {
  return (
    <div className={GRID_CLASS}>
      {PORTFOLIO_HOME_CARDS_CENTERED.map((card, i) => (
        <GalleryCard key={card.name} card={card} index={i} variant={variant} />
      ))}
    </div>
  );
}
