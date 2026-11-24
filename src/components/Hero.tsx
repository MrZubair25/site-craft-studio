import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Calendar, Sparkles, Star } from 'lucide-react';
import { ASSETS, BRAND, HERO_COPY, TOOL_MARQUEE } from '../data/constants';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onBookCall: () => void;
}

export function Hero({ onBookCall }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const words = HERO_COPY.headline.split(' ');

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 14,
    });
  };

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-10 bg-grain"
    >
      {/* Interactive gradient mesh background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(680px circle at ${mousePos.x}% ${mousePos.y}%, rgba(60, 196, 214, 0.16), transparent 62%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-28 h-[420px] w-[420px] rounded-full bg-[#3CC4D6]/15 dark:bg-[#3CC4D6]/12 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Typographic hierarchy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Availability badge with pulsing green dot as requested */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white/85 dark:bg-[#0D1E2E]/85 backdrop-blur-md px-3.5 py-1.5 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#0B1620] dark:text-[#EAF2F7]">
                {HERO_COPY.availability}
              </span>
            </motion.div>

            {/* Word-by-word masked headline reveal */}
            <h1
              className="font-display font-extrabold text-[#0B1620] dark:text-[#EAF2F7] leading-[1.06] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 4.3vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              {words.map((word, index) => {
                const isHighlight = word === 'Framer' || word === 'clients.';
                return (
                  <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-1">
                    <motion.span
                      initial={prefersReducedMotion ? { y: 0 } : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: prefersReducedMotion ? 0 : 0.04 * index,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block ${
                        isHighlight
                          ? 'text-[#0B3A5B] dark:text-[#3CC4D6]'
                          : ''
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-base sm:text-lg text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed"
            >
              {HERO_COPY.subheadline}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <MagneticButton
                onClick={scrollToWork}
                cursorLabel="Explore"
                className="rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-6 py-3.5 text-sm sm:text-base font-semibold text-white dark:text-[#07131F] shadow-lg shadow-[#0B3A5B]/20 dark:shadow-[#3CC4D6]/20 hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors"
              >
                {HERO_COPY.primaryCta}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                onClick={onBookCall}
                cursorLabel="Schedule"
                className="rounded-full border border-[#0B3A5B]/20 dark:border-[#7FE3EE]/25 bg-white/80 dark:bg-[#0D1E2E]/80 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#3CC4D6]" aria-hidden="true" />
                {HERO_COPY.secondaryCta}
              </MagneticButton>

              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-2 text-sm font-medium text-[#0B3A5B] dark:text-[#7FE3EE] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                {HERO_COPY.fiverrCta}
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Right column: Arched Portrait Frame with floating glass cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: tilt.x * 0.6,
                      y: tilt.y * 0.6,
                    }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="relative w-full max-w-[380px]"
            >
              {/* Soft teal ambient aura */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-t-[220px] rounded-b-[32px] bg-gradient-to-tr from-[#0B3A5B]/25 via-[#3CC4D6]/25 to-[#7FE3EE]/30 blur-2xl"
              />

              {/* Arched Glass Frame */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative overflow-hidden rounded-t-[200px] rounded-b-[28px] border border-white/60 dark:border-[#7FE3EE]/25 bg-white/40 dark:bg-[#0D1E2E]/60 p-2.5 backdrop-blur-xl shadow-2xl shadow-[#0B3A5B]/15 dark:shadow-black/50"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[188px] rounded-b-[20px] bg-[#EEF4F8] dark:bg-[#11263A]">
                  {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#0B3A5B]/15 via-[#3CC4D6]/15 to-transparent" />
                  )}
                  <img
                    src={ASSETS.portrait}
                    alt="Zubair Akram, Founder of Site Craft Studio, standing in a marble architectural lobby"
                    onLoad={() => setImgLoaded(true)}
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-top transition-all duration-700 ${
                      imgLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07131F]/80 via-[#07131F]/25 to-transparent"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <p className="text-sm font-display font-bold leading-tight">{BRAND.owner}</p>
                      <p className="text-xs text-[#7FE3EE]">{BRAND.studio}</p>
                    </div>
                    <span className="text-[11px] font-medium text-white/85">Framer Partner</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating glass card 1 */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex absolute sm:-left-4 lg:-left-7 top-14 items-center gap-2.5 rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white/90 dark:bg-[#0D1E2E]/90 backdrop-blur-xl px-3.5 py-2.5 shadow-xl"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6] text-white dark:text-[#07131F] font-display font-bold text-xs">
                  50+
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7]">50+ Projects</p>
                  <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF]">Shipped globally</p>
                </div>
              </motion.div>

              {/* Floating glass card 2 */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="hidden sm:flex absolute sm:-right-3 lg:-right-5 top-28 items-center gap-2 rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white/90 dark:bg-[#0D1E2E]/90 backdrop-blur-xl px-3.5 py-2.5 shadow-xl"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7]">5.0★ Rating</p>
                  <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF]">Verified clients</p>
                </div>
              </motion.div>

              {/* Floating glass card 3 */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="hidden sm:flex absolute sm:-left-3 lg:-left-6 bottom-12 items-center gap-2 rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white/90 dark:bg-[#0D1E2E]/90 backdrop-blur-xl px-3.5 py-2.5 shadow-xl"
              >
                <Sparkles className="w-4 h-4 text-[#3CC4D6] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7]">Framer Expert</p>
                  <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF]">Fast 7–14d delivery</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile proof row (visible below 640px where floating cards hide) */}
        <div className="mt-8 grid grid-cols-2 sm:hidden gap-2.5">
          {HERO_COPY.floatingBadges.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/15 bg-white/80 dark:bg-[#0D1E2E]/80 px-3.5 py-2.5"
            >
              <p className="text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7]">{item.label}</p>
              <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF]">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Scroll-down indicator */}
        <div className="mt-10 flex justify-center">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToWork();
            }}
            aria-label="Scroll to selected work"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] hover:text-[#0B3A5B] dark:hover:text-[#7FE3EE] transition-colors"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#3CC4D6]" />
            </motion.span>
          </a>
        </div>
      </div>

      {/* Infinite pause-on-hover tool marquee */}
      <div className="mt-10 border-y border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-white/60 dark:bg-[#0D1E2E]/50 backdrop-blur-md py-4 marquee-wrapper overflow-hidden">
        <div className="animate-marquee items-center">
          {[...TOOL_MARQUEE, ...TOOL_MARQUEE].map((tool, index) => (
            <div key={`${tool}-${index}`} className="flex items-center gap-8 px-6">
              <span className="text-sm font-display font-semibold tracking-tight text-[#0B3A5B] dark:text-[#EAF2F7] whitespace-nowrap">
                {tool}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#3CC4D6]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
