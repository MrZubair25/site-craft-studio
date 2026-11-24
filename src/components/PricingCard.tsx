import { Check } from 'lucide-react';
import { PricingTier } from '../data/constants';
import { MagneticButton } from './MagneticButton';

interface PricingCardProps {
  tier: PricingTier;
  billing: 'project' | 'monthly';
  currency: 'USD' | 'PKR';
  onSelectTier: (tierName: string, priceText: string) => void;
}

export function PricingCard({ tier, billing, currency, onSelectTier }: PricingCardProps) {
  const rawAmount =
    billing === 'project'
      ? currency === 'USD'
        ? tier.projectUSD
        : tier.projectPKR
      : currency === 'USD'
        ? tier.monthlyUSD
        : tier.monthlyPKR;

  const formattedPrice =
    rawAmount === null
      ? 'Custom'
      : currency === 'USD'
        ? `$${rawAmount.toLocaleString('en-US')}`
        : `PKR ${rawAmount.toLocaleString('en-US')}`;

  const periodSuffix = rawAmount === null ? '' : billing === 'monthly' ? '/mo' : ' flat';

  return (
    <div
      className={`relative flex flex-col justify-between rounded-[24px] p-6 sm:p-7 transition-all duration-300 ${
        tier.popular
          ? 'border-2 border-[#3CC4D6] bg-white dark:bg-[#0D1E2E] shadow-xl shadow-[#3CC4D6]/15'
          : 'border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-[#0B1620] dark:text-[#EAF2F7]">
            {tier.name}
          </h3>
          {tier.popular && (
            <span className="text-xs font-semibold text-[#0B3A5B] dark:text-[#3CC4D6]">
              Most Popular
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
          {tier.tagline}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B1620] dark:text-[#EAF2F7] font-mono-num">
            {formattedPrice}
          </span>
          {periodSuffix && (
            <span className="text-sm text-[#4B5E6F] dark:text-[#93AABF]">{periodSuffix}</span>
          )}
        </div>

        <p className="mt-1.5 text-xs font-medium text-[#3CC4D6]">{tier.delivery}</p>

        <ul className="mt-6 space-y-3 border-t border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 pt-6">
          {tier.features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2.5 text-sm text-[#0B1620] dark:text-[#EAF2F7]"
            >
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#3CC4D6]" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <MagneticButton
          onClick={() => onSelectTier(tier.name, `${formattedPrice}${periodSuffix}`)}
          cursorLabel="Select"
          className={`w-full rounded-full py-3.5 px-6 text-sm font-semibold transition-colors ${
            tier.popular
              ? 'bg-[#0B3A5B] dark:bg-[#3CC4D6] text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE]'
              : 'border border-[#0B3A5B]/20 dark:border-[#7FE3EE]/25 text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6]'
          }`}
        >
          {tier.ctaLabel}
        </MagneticButton>
      </div>
    </div>
  );
}
