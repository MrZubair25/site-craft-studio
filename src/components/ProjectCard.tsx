import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ProjectItem } from '../data/constants';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index, total, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [bubble, setBubble] = useState({ x: 0, y: 0, visible: false });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setSpotlight({ x: xPct, y: yPct, active: true });
    setBubble({ x, y, visible: true });

    if (!prefersReducedMotion) {
      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = -((y / rect.height) - 0.5) * 6;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }));
    setBubble((prev) => ({ ...prev, visible: false }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const hasHeroLead = total % 2 === 1 && index === 0;
  let colClass = 'md:col-span-1 lg:col-span-6';
  let aspectClass = 'aspect-[4/3]';

  if (total === 1 || hasHeroLead) {
    colClass = 'md:col-span-2 lg:col-span-12';
    aspectClass = 'aspect-[16/9] lg:aspect-[21/9]';
  } else {
    const pairOffset = total % 2 === 1 ? index - 1 : index;
    const pairRow = Math.floor(pairOffset / 2);
    const isFirstInPair = pairOffset % 2 === 0;
    const wideLeft = pairRow % 2 === 0;
    const isWide = (wideLeft && isFirstInPair) || (!wideLeft && !isFirstInPair);
    colClass = isWide ? 'md:col-span-1 lg:col-span-7' : 'md:col-span-1 lg:col-span-5';
    aspectClass = isWide ? 'aspect-[16/10]' : 'aspect-[4/3]';
  }

  let domainLabel = `${project.id}.framer.website`;
  try {
    const parsed = new URL(project.liveUrl);
    if (parsed.hostname !== 'framer.com') {
      domainLabel = parsed.hostname;
    }
  } catch {
    // keep default
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className={colClass}
    >
      <button
        ref={cardRef}
        type="button"
        onClick={() => onSelect(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="View"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-4 sm:p-5 text-left shadow-sm hover:shadow-xl hover:shadow-[#0B3A5B]/8 dark:hover:shadow-black/40 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC4D6]"
      >
        {/* Mouse-following spotlight glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(60, 196, 214, 0.12), transparent 60%)`,
          }}
        />

        {/* Cursor-following View Project bubble */}
        {bubble.visible && !prefersReducedMotion && (
          <div
            aria-hidden="true"
            style={{
              transform: `translate3d(${bubble.x - 54}px, ${bubble.y - 18}px, 0)`,
            }}
            className="pointer-events-none hidden lg:flex absolute top-0 left-0 z-30 items-center gap-1.5 rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-3.5 py-1.5 text-xs font-semibold text-white dark:text-[#07131F] shadow-lg transition-transform duration-75"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Browser-frame mockup */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-[#EEF4F8] dark:bg-[#11263A]">
          <div className="flex items-center justify-between border-b border-[#0B3A5B]/8 dark:border-[#7FE3EE]/10 bg-white/80 dark:bg-[#07131F]/80 px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#0B3A5B]/25 dark:bg-[#EAF2F7]/25" />
              <span className="h-2 w-2 rounded-full bg-[#0B3A5B]/20 dark:bg-[#EAF2F7]/20" />
              <span className="h-2 w-2 rounded-full bg-[#3CC4D6]" />
            </div>
            <span className="text-[11px] font-mono-num text-[#4B5E6F] dark:text-[#93AABF] truncate max-w-[180px]">
              {domainLabel}
            </span>
          </div>

          <div className={`relative w-full overflow-hidden ${aspectClass}`}>
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#0B3A5B]/10 via-[#3CC4D6]/10 to-transparent" />
            )}
            {imgError ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0B3A5B] to-[#07131F] p-6 text-white">
                <Layers className="w-8 h-8 text-[#3CC4D6]" />
                <span className="font-display font-bold text-base">{project.title}</span>
              </div>
            ) : (
              <img
                src={project.image}
                alt={`${project.title} Framer website case study mockup`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
                  imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                }`}
              />
            )}
          </div>
        </div>

        {/* Metadata & Title */}
        <div className="relative z-10 mt-4 flex flex-1 flex-col justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#4B5E6F] dark:text-[#93AABF]">
              <span className="font-medium text-[#0B3A5B] dark:text-[#7FE3EE]">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#0B1620] dark:text-[#EAF2F7]">{project.metric}</span>
            </div>

            <div className="mt-1.5 flex items-start justify-between gap-3">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B1620] dark:text-[#EAF2F7] group-hover:text-[#0B3A5B] dark:group-hover:text-[#7FE3EE] transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight
                className="w-4 h-4 mt-1 shrink-0 text-[#4B5E6F] dark:text-[#93AABF] group-hover:text-[#3CC4D6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1.5 text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed line-clamp-2">
              {project.summary}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
