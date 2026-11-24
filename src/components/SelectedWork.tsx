import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PROJECT_CATEGORIES, PROJECTS, ProjectItem } from '../data/constants';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface SelectedWorkProps {
  onStartSimilar: (projectTitle: string) => void;
}

export function SelectedWork({ onStartSimilar }: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="work" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
              Selected Work
            </p>
            <h2
              className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Websites designed to look sharp and convert pipeline.
            </h2>
          </div>

          {/* Filter Tabs with animated pill indicator */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/15 bg-white/80 dark:bg-[#0D1E2E]/80 p-1.5 backdrop-blur-md"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white dark:text-[#07131F]'
                      : 'text-[#4B5E6F] dark:text-[#93AABF] hover:text-[#0B1620] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={filtered.length}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilar={onStartSimilar}
      />
    </section>
  );
}
