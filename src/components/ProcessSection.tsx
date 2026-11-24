import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Figma, Rocket, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '../data/constants';

const STEP_ICONS = [Compass, Figma, Sparkles, Rocket];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 65%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="py-20 sm:py-24 scroll-mt-24 bg-[#EEF4F8]/60 dark:bg-[#0A1929]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
            Process
          </p>
          <h2
            className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
          >
            From blank canvas to live Framer domain in four clear steps.
          </h2>
        </div>

        <div ref={containerRef} className="relative pl-8 sm:pl-12">
          {/* Background vertical track */}
          <div
            aria-hidden="true"
            className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-[2px] rounded-full bg-[#0B3A5B]/12 dark:bg-[#7FE3EE]/15"
          />
          {/* Scroll-driven active fill line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-[#0B3A5B] via-[#3CC4D6] to-[#7FE3EE]"
          />

          <div className="space-y-6 sm:space-y-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Node marker */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-8 sm:-left-12 top-6 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#3CC4D6] bg-white dark:bg-[#0D1E2E] text-[#0B3A5B] dark:text-[#3CC4D6] shadow-md"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  <div className="rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-6 sm:p-7 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-num text-xs font-semibold text-[#3CC4D6]">
                          Step {step.number}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                          {step.title}
                        </h3>
                      </div>
                      <span className="font-mono-num text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF]">
                        {step.duration}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm sm:text-base text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed max-w-2xl">
                      {step.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#0B3A5B] dark:text-[#7FE3EE] font-medium">
                      {step.deliverables.map((item, i) => (
                        <span key={item} className="inline-flex items-center gap-2">
                          {i > 0 && <span className="text-[#3CC4D6]" aria-hidden="true">·</span>}
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
