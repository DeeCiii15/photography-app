import Image from 'next/image';

const ROTATIONS = [
  '-rotate-[3.5deg]',
  'rotate-[2.5deg]',
  '-rotate-[2deg]',
  'rotate-[3deg]',
] as const;

type ExperienceProcessPostItProps = {
  src: string;
  alt: string;
  stepNumber: number;
  rotationIndex: number;
};

/** Sticky-note frame with tape + thumb-tacked photo */
export default function ExperienceProcessPostIt({
  src,
  alt,
  stepNumber,
  rotationIndex,
}: ExperienceProcessPostItProps) {
  const rotate = ROTATIONS[rotationIndex % ROTATIONS.length]!;

  return (
    <div className={`relative w-fit shrink-0 ${rotate}`}>
      <span
        className="absolute -top-1.5 left-1/2 z-20 h-2.5 w-11 -translate-x-1/2 -rotate-1 rounded-[1px] bg-[#ebe4d8]/95 shadow-[0_1px_2px_rgba(61,52,44,0.12)] dark:bg-[#4a433c]/90 dark:shadow-black/30"
        aria-hidden
      />
      <div className="rounded-[1px] border border-[#e5d9b8]/90 bg-[#fffdf6] p-1.5 pb-2.5 shadow-[2px_3px_0_rgba(61,52,44,0.08),4px_8px_24px_rgba(61,52,44,0.1)] sm:p-2 sm:pb-3 dark:border-[#5c5348]/60 dark:bg-[#2c2824] dark:shadow-[2px_3px_0_rgba(0,0,0,0.2),4px_12px_28px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-square w-[3.75rem] shrink-0 overflow-hidden bg-[#e8e3db] min-[400px]:w-[4.25rem] sm:w-24 md:w-28 dark:bg-boho-ink">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
          />
        </div>
        <p className="mt-2 text-center font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-coral/90 dark:text-[#d4a574]">
          {String(stepNumber).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
