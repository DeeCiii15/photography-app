type SectionWaveProps = {
  /** When true, wave crest points down (for bottom of previous section fill). */
  flip?: boolean;
  className?: string;
};

export default function SectionWave({
  flip,
  className = 'relative h-10 w-full text-cream md:h-14',
}: SectionWaveProps) {
  return (
    <div className={className} aria-hidden>
      <svg
        className={`absolute inset-0 h-full w-full ${flip ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,48 V36 Q240,20 480,32 T960,28 T1440,34 V48 Z"
        />
      </svg>
    </div>
  );
}
