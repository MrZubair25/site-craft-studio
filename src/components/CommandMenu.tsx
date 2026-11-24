import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  Copy,
  ExternalLink,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/constants';

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onBookCall: () => void;
  onCopyEmail: () => void;
}

export function CommandMenu({
  open,
  onClose,
  isDark,
  onToggleTheme,
  onBookCall,
  onCopyEmail,
}: CommandMenuProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const items = useMemo(() => {
    const sections = NAV_LINKS.map((link) => ({
      id: `nav-${link.label}`,
      label: `Jump to ${link.label}`,
      group: 'Navigation',
      icon: ArrowRight,
      action: () => {
        onClose();
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    const actions = [
      {
        id: 'action-book',
        label: 'Book a Free Discovery Call',
        group: 'Actions',
        icon: Calendar,
        action: () => {
          onClose();
          onBookCall();
        },
      },
      {
        id: 'action-theme',
        label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        group: 'Actions',
        icon: isDark ? Sun : Moon,
        action: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'action-email',
        label: `Copy Email (${BRAND.email})`,
        group: 'Actions',
        icon: Copy,
        action: () => {
          onCopyEmail();
          onClose();
        },
      },
      {
        id: 'action-fiverr',
        label: 'Open Fiverr Profile',
        group: 'External',
        icon: ExternalLink,
        action: () => {
          onClose();
          window.open(BRAND.fiverrUrl, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    const all = [...sections, ...actions];
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );
  }, [query, isDark, onClose, onBookCall, onToggleTheme, onCopyEmail]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-start justify-center pt-[14vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07131F]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white dark:bg-[#0D1E2E] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 px-4 py-3.5">
              <Search className="w-4 h-4 text-[#3CC4D6] shrink-0" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, switch theme, or book a call..."
                className="w-full bg-transparent text-sm text-[#0B1620] dark:text-[#EAF2F7] placeholder:text-[#4B5E6F] dark:placeholder:text-[#93AABF] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="rounded-lg p-1 text-[#4B5E6F] hover:text-[#0B1620] dark:text-[#93AABF] dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#4B5E6F] dark:text-[#93AABF]">
                  No matching commands found.
                </p>
              ) : (
                items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm text-[#0B1620] dark:text-[#EAF2F7] hover:bg-[#EEF4F8] dark:hover:bg-[#11263A] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#3CC4D6]" aria-hidden="true" />
                        <span className="font-medium">{item.label}</span>
                      </span>
                      <span className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">{item.group}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 px-4 py-2.5 text-xs text-[#4B5E6F] dark:text-[#93AABF]">
              <span>Site Craft Studio Command Menu</span>
              <span className="font-mono-num">ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
