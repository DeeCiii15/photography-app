type DecorativeFlourishProps = {
  className?: string;
};

/** Arch + soft drape — evergreen arbor, sheer fabric, golden-hour curve. */
export default function DecorativeFlourish({
  className = 'h-8 w-[5.5rem] text-boho-sage/55',
}: DecorativeFlourishProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M60 32V14"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.5"
      />
      <path
        d="M28 18c14-12 50-12 64 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M38 22c10 8 34 8 44 0"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.45"
      />
      <circle cx="60" cy="10" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="44" cy="14" r="1" fill="currentColor" opacity="0.25" />
      <circle cx="76" cy="14" r="1" fill="currentColor" opacity="0.25" />
    </svg>
  );
}
