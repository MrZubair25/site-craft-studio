import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'info';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 right-4 z-[90] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white/95 dark:bg-[#0D1E2E]/95 backdrop-blur-xl px-4 py-3.5 shadow-xl shadow-[#0B3A5B]/10 dark:shadow-black/40"
          >
            <div className="mt-0.5 shrink-0 text-[#0B3A5B] dark:text-[#3CC4D6]">
              {toast.variant === 'info' ? (
                <Info className="w-4 h-4" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#0B3A5B] dark:text-[#3CC4D6]" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7]">
                {toast.title}
              </p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-lg p-1 text-[#4B5E6F] hover:text-[#0B1620] dark:text-[#93AABF] dark:hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
