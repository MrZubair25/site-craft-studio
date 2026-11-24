import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/constants';

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [paused]);

  const current = TESTIMONIALS[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#EEF4F8]/60 dark:bg-[#0A1929]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
              Client Proof
            </p>
            <h2
              className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Trusted by founders and teams worldwide.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white dark:bg-[#0D1E2E] text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white dark:bg-[#0D1E2E] text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Draggable carousel stage */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-cursor="Drag"
          className="relative overflow-hidden rounded-[28px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-6 sm:p-10 shadow-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNext();
                if (info.offset.x > 50) handlePrev();
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#0B3A5B] dark:text-[#7FE3EE] font-mono-num">
                  Result: {current.outcome}
                </span>
              </div>

              <div className="relative">
                <Quote
                  className="w-8 h-8 text-[#3CC4D6]/30 mb-3"
                  aria-hidden="true"
                />
                <blockquote className="font-display text-xl sm:text-2xl font-semibold text-[#0B1620] dark:text-[#EAF2F7] leading-snug max-w-4xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] text-sm font-display font-bold text-white dark:text-[#07131F] shrink-0">
                  {current.initials}
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                    {current.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[#4B5E6F] dark:text-[#93AABF]">
                    {current.role} · {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View testimonial from ${t.name}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === index
                      ? 'w-7 bg-[#0B3A5B] dark:bg-[#3CC4D6]'
                      : 'w-2 bg-[#0B3A5B]/20 dark:bg-[#7FE3EE]/25 hover:bg-[#3CC4D6]/60'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">
              Drag or click arrows
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
