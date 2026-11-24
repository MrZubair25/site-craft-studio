import { ASSETS } from '../data/constants';

interface BrandLogoProps {
  className?: string;
  chipInDark?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function BrandLogo({ className = '', chipInDark = true, onClick }: BrandLogoProps) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center select-none transition-transform duration-200 ${
        chipInDark
          ? 'dark:bg-[#F6F9FB] dark:px-2.5 dark:py-1 dark:rounded-xl dark:shadow-sm'
          : ''
      } ${className}`}
    >
      <img
        src={ASSETS.logo}
        alt="Site Craft Studio logo"
        className="h-8 sm:h-9 w-auto object-contain block"
        referrerPolicy="no-referrer"
      />
    </span>
  );
}
