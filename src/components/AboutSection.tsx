import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Download } from 'lucide-react';
import { ABOUT_STATS, ASSETS, BRAND, SKILL_RINGS } from '../data/constants';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './MagneticButton';

interface AboutSectionProps {
  onToast: (title: string, description?: string) => void;
}

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1100;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-4 sm:p-5"
    >
      <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B3A5B] dark:text-[#3CC4D6] font-mono-num">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-[#4B5E6F] dark:text-[#93AABF]">{label}</p>
    </div>
  );
}

function SkillRing({ name, level }: { name: string; level: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] px-3 py-4">
      <div className="relative h-16 w-16 flex items-center justify-center">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4.5"
            className="text-[#0B3A5B]/10 dark:text-[#7FE3EE]/15"
          />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#3CC4D6"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute text-xs font-mono-num font-bold text-[#0B1620] dark:text-[#EAF2F7]">
          {level}%
        </span>
      </div>
      <span className="text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7] text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export function AboutSection({ onToast }: AboutSectionProps) {
  const handleDownloadResume = () => {
    const resumeText = `ZUBAIR AKRAM
Framer Website Designer & Founder — Site Craft Studio
Email: ${BRAND.email} | WhatsApp: ${BRAND.whatsappDisplay}
Location: ${BRAND.location}

SUMMARY
I'm Zubair Akram, a Framer website designer and the founder of Site Craft Studio.
I help startups, agencies, and global brands launch modern, high-performing websites that look incredible and convert.

EXPERIENCE
- Founder & Lead Framer Designer, Site Craft Studio (2023 – Present)
  50+ websites shipped · 30+ global clients · 100% client satisfaction
  Core Capabilities: Framer Website Design, Custom React Code Overrides, Framer CMS Architecture, Technical SEO & Speed Optimization, Figma Design Systems.

TOOLS & STACK
Framer (98%) · Figma (95%) · Motion & UX (94%) · Technical SEO (92%) · React / Code (88%)
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Zubair-Akram-Site-Craft-Studio-CV.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    onToast('Resume downloaded', 'Zubair Akram — Site Craft Studio CV saved.');
  };

  return (
    <section id="about" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Arch-masked portrait with floating logo badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-t-[200px] rounded-b-[28px] bg-[#3CC4D6]/20 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-t-[190px] rounded-b-[28px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/20 bg-white dark:bg-[#0D1E2E] p-2.5 shadow-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-t-[180px] rounded-b-[20px]">
                  <img
                    src={ASSETS.portrait}
                    alt="Zubair Akram — Founder of Site Craft Studio"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating Studio Logo Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/25 bg-white/95 dark:bg-[#0D1E2E]/95 backdrop-blur-xl px-4 py-2.5 shadow-xl">
                <BrandLogo />
              </div>
            </div>
          </motion.div>

          {/* Bio, Stats, Skills & Resume */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
                About Me
              </p>
              <h2
                className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Design taste paired with conversion engineering.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                I&apos;m Zubair Akram, a Framer website designer and the founder of Site Craft Studio. I help brands launch modern, high-performing websites that look incredible and convert.
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                Every layout I build balances crisp editorial hierarchy, purposeful motion, and clean technical SEO—so founders get an asset that pays for itself instead of a template that blends in.
              </p>
            </div>

            {/* Count-up stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ABOUT_STATS.map((stat) => (
                <CountUpStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>

            {/* Skill Progress Rings */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF] mb-3">
                Core Craft & Stack
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                {SKILL_RINGS.map((skill) => (
                  <SkillRing key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton
                onClick={handleDownloadResume}
                cursorLabel="Save CV"
                className="rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-6 py-3 text-sm font-semibold text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download CV / Resume
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
