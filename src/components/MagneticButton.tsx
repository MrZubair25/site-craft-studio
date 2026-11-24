import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  cursorLabel?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  cursorLabel,
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const sharedClass = `relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC4D6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07131F] ${className}`;

  const rippleNodes = ripples.map((r) => (
    <span
      key={r.id}
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
      style={{
        left: r.x,
        top: r.y,
        width: r.size,
        height: r.size,
        transform: 'scale(0)',
      }}
    />
  ));

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.4 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          data-cursor={cursorLabel}
          onClick={(e) => {
            spawnRipple(e);
            onClick?.(e);
          }}
          className={sharedClass}
        >
          {rippleNodes}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          aria-label={ariaLabel}
          data-cursor={cursorLabel}
          onClick={(e) => {
            spawnRipple(e);
            onClick?.(e);
          }}
          className={sharedClass}
        >
          {rippleNodes}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </button>
      )}
    </motion.div>
  );
}
