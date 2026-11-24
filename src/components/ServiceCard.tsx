import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Database,
  Gauge,
  GraduationCap,
  Layout,
  Plus,
  RefreshCw,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../data/constants';

const ICON_MAP = {
  Layout,
  Sparkles,
  Rocket,
  RefreshCw,
  Database,
  Gauge,
  GraduationCap,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isFullWidth?: boolean;
}

export function ServiceCard({ service, index, isFullWidth = false }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[service.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`group relative flex flex-col justify-between rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-6 shadow-sm hover:border-[#3CC4D6]/60 hover:shadow-xl hover:shadow-[#3CC4D6]/10 transition-all duration-300 ${
        isFullWidth ? 'sm:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4F8] dark:bg-[#11263A] text-[#0B3A5B] dark:text-[#3CC4D6] group-hover:bg-[#0B3A5B] group-hover:text-white dark:group-hover:bg-[#3CC4D6] dark:group-hover:text-[#07131F] transition-colors">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-label={`Toggle details for ${service.title}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] hover:text-[#0B3A5B] dark:hover:text-[#7FE3EE] cursor-pointer"
          >
            <span>{expanded ? 'Hide scope' : "What's included"}</span>
            <Plus
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                expanded ? 'rotate-45 text-[#3CC4D6]' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        <h3 className="mt-5 font-display text-lg font-bold text-[#0B1620] dark:text-[#EAF2F7]">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
          {service.shortDesc}
        </p>
      </div>

      {/* Reveal What's included on hover or click */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-5 border-t border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#3CC4D6] mb-2.5">
            What&apos;s included
          </p>
          <ul className="space-y-2">
            {service.included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs sm:text-sm text-[#0B1620] dark:text-[#EAF2F7]"
              >
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#3CC4D6]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
