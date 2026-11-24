import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export function Cursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 280, damping: 26, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        setLabel(target.getAttribute('data-cursor') || '');
      } else {
        const interactive = (e.target as HTMLElement | null)?.closest('a, button, input, select, textarea');
        setLabel(interactive ? '' : null);
      }
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!enabled) return null;

  const hasText = Boolean(label && label.length > 0);
  const isHovering = label !== null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden lg:block" aria-hidden="true">
      {/* Inner dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: isPressed ? 0.6 : hasText ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#3CC4D6]"
      />
      {/* Trailing ring / label bubble */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hasText ? 88 : isHovering ? 42 : 28,
          height: hasText ? 34 : isHovering ? 42 : 28,
          marginLeft: hasText ? -44 : isHovering ? -21 : -14,
          marginTop: hasText ? -17 : isHovering ? -21 : -14,
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-colors duration-150 ${
          hasText
            ? 'bg-[#0B3A5B] dark:bg-[#3CC4D6] text-white dark:text-[#07131F] shadow-lg shadow-[#3CC4D6]/25'
            : 'border border-[#3CC4D6]/65 bg-[#3CC4D6]/5'
        }`}
      >
        {hasText && (
          <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap px-2">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
