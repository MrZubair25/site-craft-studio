import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Command, Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/constants';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { MagneticButton } from './MagneticButton';
import { triggerConfetti } from '../utils/confetti';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenCommand: () => void;
  onBookCall: () => void;
  onToast: (title: string, description?: string) => void;
}

export function Navbar({
  isDark,
  onToggleTheme,
  onOpenCommand,
  onBookCall,
  onToast,
}: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#work');
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCompact(latest > 48);
    if (latest > 160 && latest > previous && !mobileOpen) {
      setHidden(true);
    } else if (latest < previous || latest <= 160) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    triggerConfetti(e.clientX, e.clientY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onToast('Site Craft Studio', 'Crafted with precision in Framer & React.');
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-3 sm:gap-5 rounded-full border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white/80 dark:bg-[#0D1E2E]/80 backdrop-blur-xl shadow-lg shadow-[#0B3A5B]/5 dark:shadow-black/35 transition-all duration-300 ${
            compact ? 'max-w-5xl px-3.5 sm:px-4 py-2' : 'max-w-6xl px-4 sm:px-5 py-2.5'
          }`}
        >
          {/* Zone 1: Brand logo */}
          <a
            href="#"
            onClick={handleLogoClick}
            aria-label="Site Craft Studio home"
            data-cursor="Spark"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC4D6] rounded-xl"
          >
            <BrandLogo />
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#0B3A5B] dark:text-[#7FE3EE]'
                      : 'text-[#4B5E6F] hover:text-[#0B1620] dark:text-[#93AABF] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#3CC4D6]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme toggle, Cmd+K & Primary CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenCommand}
              aria-label="Open command palette (Ctrl or Cmd + K)"
              data-cursor="Search"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/18 bg-[#F6F9FB]/80 dark:bg-[#07131F]/60 text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] hover:text-[#0B3A5B] dark:hover:text-[#7FE3EE] hover:border-[#3CC4D6]/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Command className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-mono-num">K</span>
            </button>

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <div className="hidden md:block">
              <MagneticButton
                onClick={onBookCall}
                cursorLabel="Book"
                className="rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-[#07131F] shadow-md shadow-[#0B3A5B]/15 dark:shadow-[#3CC4D6]/20 hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors"
              >
                Book a Call
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white/80 dark:bg-[#07131F]/80 text-[#0B1620] dark:text-[#EAF2F7] cursor-pointer shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#F6F9FB]/98 dark:bg-[#07131F]/98 backdrop-blur-2xl flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between py-3 border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 text-2xl font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#3CC4D6]" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-8 space-y-5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onBookCall();
                }}
                className="w-full rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] py-3.5 px-6 text-base font-semibold text-white dark:text-[#07131F]"
              >
                Book a Free Call
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm text-[#4B5E6F] dark:text-[#93AABF]">
                <div className="flex flex-wrap gap-4">
                  {BRAND.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#0B3A5B] dark:hover:text-[#7FE3EE] transition-colors"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
