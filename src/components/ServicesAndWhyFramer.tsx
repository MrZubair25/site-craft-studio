import { motion } from 'motion/react';
import { Minus } from 'lucide-react';
import { SERVICES, WHY_FRAMER_ROWS } from '../data/constants';
import { ServiceCard } from './ServiceCard';

function AnimatedCheckmark({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-[#3CC4D6]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <motion.path
        d="M8 12.5L10.8 15.2L16.5 9.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export function ServicesAndWhyFramer() {
  return (
    <>
      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-24 scroll-mt-24 bg-[#EEF4F8]/60 dark:bg-[#0A1929]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
              Services
            </p>
            <h2
              className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Everything you need to launch and scale on Framer.
            </h2>
            <p className="mt-3 text-base text-[#4B5E6F] dark:text-[#93AABF]">
              Hover or tap any service card to inspect exact deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isFullWidth={SERVICES.length % 3 === 1 && index === SERVICES.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY FRAMER */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
              Why Framer
            </p>
            <h2
              className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Framer vs. traditional web development.
            </h2>
            <p className="mt-3 text-base text-[#4B5E6F] dark:text-[#93AABF]">
              Ship faster without sacrificing custom design, performance, or SEO control.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-[#F6F9FB] dark:bg-[#07131F]/60">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF]">
                      Capability
                    </th>
                    <th className="px-6 py-4 text-sm font-display font-bold text-[#0B3A5B] dark:text-[#7FE3EE]">
                      Framer + Site Craft Studio
                    </th>
                    <th className="px-6 py-4 text-sm font-display font-semibold text-[#4B5E6F] dark:text-[#93AABF]">
                      Traditional Custom Dev
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B3A5B]/8 dark:divide-[#7FE3EE]/10">
                  {WHY_FRAMER_ROWS.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-[#F6F9FB]/70 dark:hover:bg-[#11263A]/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7] whitespace-nowrap">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm font-medium text-[#0B1620] dark:text-[#EAF2F7]">
                          <AnimatedCheckmark delay={idx * 0.06} />
                          <span>{row.framer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm text-[#4B5E6F] dark:text-[#93AABF]">
                          <Minus className="w-4 h-4 shrink-0 opacity-60" aria-hidden="true" />
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
