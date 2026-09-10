import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/site-links';

export function StoreBadges({
  align = 'start',
}: {
  align?: 'start' | 'center';
}) {
  return (
    <div
      className={`grid w-full grid-cols-2 items-center gap-2 sm:flex sm:gap-4 ${
        align === 'center' ? 'sm:justify-center' : 'sm:justify-start'
      }`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[clamp(2.75rem,13vw,3.5rem)] min-w-0 items-center justify-center transition-opacity hover:opacity-80"
        aria-label="Download on the App Store"
      >
        <img
          src="/assets/app-store-badge.svg"
          alt="Download on the App Store"
          className="h-full max-w-full w-auto object-contain"
        />
      </a>

      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[clamp(2.75rem,13vw,3.5rem)] min-w-0 items-center justify-center transition-opacity hover:opacity-80"
        aria-label="Get it on Google Play"
      >
        <img
          src="/assets/google-play-badge.svg"
          alt="Get it on Google Play"
          className="h-full max-w-full w-auto object-contain"
        />
      </a>
    </div>
  );
}
