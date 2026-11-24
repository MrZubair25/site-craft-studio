import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FaqItem } from '../data/constants';

interface AccordionProps {
  items: FaqItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#0B3A5B]/10 dark:divide-[#7FE3EE]/12 rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] overflow-hidden shadow-sm">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F6F9FB]/60 dark:hover:bg-[#11263A]/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3CC4D6]"
            >
              <span className="font-display text-base sm:text-lg font-semibold text-[#0B1620] dark:text-[#EAF2F7]">
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 transition-transform duration-200 ${
                  isOpen ? 'rotate-45 bg-[#0B3A5B] text-white dark:bg-[#3CC4D6] dark:text-[#07131F]' : 'text-[#0B3A5B] dark:text-[#7FE3EE]'
                }`}
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm sm:text-base text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
