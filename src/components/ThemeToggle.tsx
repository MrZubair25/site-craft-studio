import { motion, useReducedMotion } from 'motion/react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-cursor={isDark ? 'Light' : 'Dark'}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white/80 dark:bg-[#0D1E2E]/80 text-[#0B3A5B] dark:text-[#7FE3EE] hover:border-[#3CC4D6] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC4D6]"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 20 }}
      >
        <mask id="theme-moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            cx="17"
            cy="7"
            r="6"
            fill="black"
            animate={{
              cx: isDark ? 17 : 26,
              cy: isDark ? 7 : 0,
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          r={isDark ? 8 : 5}
          fill="currentColor"
          mask="url(#theme-moon-mask)"
          animate={{ r: isDark ? 8 : 5 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35 }}
        />
        <motion.g
          stroke="currentColor"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
          style={{ transformOrigin: '12px 12px' }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </button>
  );
}
