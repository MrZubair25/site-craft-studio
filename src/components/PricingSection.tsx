import { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING_TIERS } from '../data/constants';
import { PricingCard } from './PricingCard';

interface PricingSectionProps {
  onSelectTier: (tierName: string, priceText: string) => void;
}

export function PricingSection({ onSelectTier }: PricingSectionProps) {
  const [billing, setBilling] = useState<'project' | 'monthly'>('project');
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');

  return (
    <section id="pricing" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
              Pricing
            </p>
            <h2
              className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Transparent investment, built for ROI.
            </h2>
          </div>

          {/* Billing & Currency controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Project vs Monthly Retainer */}
            <div className="inline-flex items-center rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-1">
              {(['project', 'monthly'] as const).map((mode) => {
                const active = billing === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setBilling(mode)}
                    className={`relative rounded-xl px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'text-white dark:text-[#07131F]'
                        : 'text-[#4B5E6F] dark:text-[#93AABF]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="pricing-billing-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6]"
                      />
                    )}
                    <span className="relative z-10">
                      {mode === 'project' ? 'Per Project' : 'Monthly Retainer'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* USD / PKR Currency Switcher */}
            <div className="inline-flex items-center rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-1">
              {(['USD', 'PKR'] as const).map((curr) => {
                const active = currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`relative rounded-xl px-3.5 py-2 text-xs sm:text-sm font-mono-num font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'text-white dark:text-[#07131F]'
                        : 'text-[#4B5E6F] dark:text-[#93AABF]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="pricing-currency-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6]"
                      />
                    )}
                    <span className="relative z-10">{curr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, idx) => (
            <div
              key={tier.id}
              className={`flex ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-full flex [&>*]:w-full">
                <PricingCard
                  tier={tier}
                  billing={billing}
                  currency={currency}
                  onSelectTier={onSelectTier}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
