import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../data/constants';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'intro' | 'split' | 'done'>('intro');

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('done');
      onComplete();
      return;
    }

    const splitTimer = setTimeout(() => setPhase('split'), 1450);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2050);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center overflow-hidden"
        aria-label="Loading Site Craft Studio"
      >
        {/* Top split panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'split' ? '-100%' : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#07131F]"
        />
        {/* Bottom split panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'split' ? '100%' : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#07131F]"
        />

        {/* Subtle teal ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase === 'split' ? 0 : 0.45, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-5 px-6"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-6 rounded-full bg-[#3CC4D6]/25 blur-2xl" aria-hidden="true" />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl bg-[#F6F9FB] px-5 py-3 shadow-2xl shadow-[#3CC4D6]/20"
            >
              <img
                src={ASSETS.logo}
                alt="Site Craft Studio"
                className="h-10 sm:h-12 w-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-sm font-medium tracking-[0.22em] uppercase text-[#7FE3EE]"
          >
            Site Craft Studio
          </motion.p>

          {/* Progress line */}
          <div className="w-48 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-gradient-to-r from-[#3CC4D6] via-[#7FE3EE] to-[#3CC4D6]"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
