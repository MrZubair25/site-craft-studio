import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { ProjectItem } from '../data/constants';
import { MagneticButton } from './MagneticButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilar: (projectTitle: string) => void;
}

export function ProjectModal({ project, onClose, onStartSimilar }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07131F]/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-white dark:bg-[#0D1E2E] shadow-2xl"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-white/90 dark:bg-[#0D1E2E]/90 backdrop-blur-xl px-5 sm:px-8 py-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#4B5E6F] dark:text-[#93AABF]">
                  <span className="font-semibold text-[#0B3A5B] dark:text-[#7FE3EE]">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#0B1620] dark:text-[#EAF2F7]">{project.metric}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-8">
              {/* Gallery Preview */}
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-[#EEF4F8] dark:bg-[#11263A] aspect-[16/10]">
                  <img
                    src={project.gallery[activeImage] ?? project.image}
                    alt={`${project.title} preview ${activeImage + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                {project.gallery.length > 1 && (
                  <div className="flex items-center gap-3">
                    {project.gallery.map((img, i) => (
                      <button
                        key={img + i}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        className={`overflow-hidden rounded-xl border-2 transition-all cursor-pointer w-24 aspect-[4/3] ${
                          activeImage === i
                            ? 'border-[#3CC4D6] opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview / Challenge / Solution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-[#F6F9FB] dark:bg-[#07131F]/60 p-5">
                  <h4 className="font-display text-sm font-bold text-[#0B3A5B] dark:text-[#7FE3EE] mb-2">
                    Overview
                  </h4>
                  <p className="text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                    {project.overview}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-[#F6F9FB] dark:bg-[#07131F]/60 p-5">
                  <h4 className="font-display text-sm font-bold text-[#0B3A5B] dark:text-[#7FE3EE] mb-2">
                    The Challenge
                  </h4>
                  <p className="text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-[#F6F9FB] dark:bg-[#07131F]/60 p-5">
                  <h4 className="font-display text-sm font-bold text-[#0B3A5B] dark:text-[#7FE3EE] mb-2">
                    The Solution
                  </h4>
                  <p className="text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Results & Stack */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-3">
                  <h4 className="font-display text-base font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                    Measured Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {project.results.map((res) => (
                      <li
                        key={res}
                        className="flex items-start gap-2.5 text-sm text-[#0B1620] dark:text-[#EAF2F7]"
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#3CC4D6]" aria-hidden="true" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-5 space-y-3">
                  <h4 className="font-display text-base font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                    Tools & Craft
                  </h4>
                  <p className="text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
                    {project.tools.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 pt-6">
                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  cursorLabel="Open"
                  className="rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-6 py-3 text-sm font-semibold text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors"
                >
                  Visit Live Framer Site
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => {
                    const title = project.title;
                    onClose();
                    onStartSimilar(title);
                  }}
                  className="rounded-full border border-[#0B3A5B]/20 dark:border-[#7FE3EE]/25 px-5 py-3 text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
                >
                  Build Something Similar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
