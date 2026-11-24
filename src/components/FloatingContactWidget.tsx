import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Headphones,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { BRAND } from '../data/constants';

interface FloatingContactWidgetProps {
  onCustomerAction: () => void;
}

export function FloatingContactWidget({ onCustomerAction }: FloatingContactWidgetProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    'Hi Zubair! I visited Site Craft Studio and would like to discuss a project.'
  )}`;

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Customer support and WhatsApp quick menu"
            className="w-72 sm:w-80 overflow-hidden rounded-[24px] border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white/95 dark:bg-[#0D1E2E]/95 backdrop-blur-xl shadow-2xl shadow-[#0B3A5B]/15 dark:shadow-black/50"
          >
            {/* Header */}
            <div className="bg-[#0B3A5B] dark:bg-[#07131F] px-5 py-4 text-white border-b border-white/10">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-bold">{BRAND.studio}</p>
                  <p className="text-xs text-[#7FE3EE]">Customer Desk &amp; Instant Chat</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact menu"
                  className="rounded-full p-1 text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Unified Actions: WhatsApp + Customer Support */}
            <div className="p-3 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 hover:bg-emerald-500/15 px-3.5 py-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7]">
                      WhatsApp Chat
                    </p>
                    <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF] font-mono-num truncate">
                      {BRAND.whatsappDisplay}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onCustomerAction();
                }}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/18 bg-[#F6F9FB] dark:bg-[#11263A]/70 hover:border-[#3CC4D6] px-3.5 py-3 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6] text-white dark:text-[#07131F]">
                    <Headphones className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7]">
                      Customer Support
                    </p>
                    <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF]">
                      Request quote or book a call
                    </p>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 shrink-0 text-[#3CC4D6]" />
              </button>

              <a
                href={`tel:${BRAND.phoneTel}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 hover:border-[#3CC4D6] px-3.5 py-2.5 transition-colors"
              >
                <span className="flex items-center gap-2.5 text-xs font-medium text-[#0B1620] dark:text-[#EAF2F7]">
                  <Phone className="w-3.5 h-3.5 text-[#3CC4D6]" aria-hidden="true" />
                  <span>Direct Call · {BRAND.whatsappDisplay}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#4B5E6F]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Combined Floating Button (Customer Support + WhatsApp) */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Close Customer & WhatsApp menu' : 'Open Customer Support & WhatsApp'}
        data-cursor={open ? 'Close' : 'Connect'}
        className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-4 text-white dark:text-[#07131F] shadow-xl shadow-[#0B3A5B]/25 dark:shadow-[#3CC4D6]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC4D6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07131F]"
      >
        {open ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <>
            <span className="flex items-center -space-x-1" aria-hidden="true">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 dark:bg-[#07131F]/15">
                <Headphones className="w-3.5 h-3.5" />
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-[#0B3A5B] dark:ring-[#3CC4D6]">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
            </span>
            <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap pr-0.5">
              Support &amp; WhatsApp
            </span>
          </>
        )}
      </button>
    </div>
  );
}
