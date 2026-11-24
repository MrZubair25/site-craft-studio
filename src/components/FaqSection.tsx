import { FAQS } from '../data/constants';
import { Accordion } from './Accordion';

export function FaqSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#EEF4F8]/60 dark:bg-[#0A1929]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
            FAQ
          </p>
          <h2
            className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
          >
            Answers before we start.
          </h2>
        </div>

        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
