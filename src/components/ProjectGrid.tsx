import { motion } from 'framer-motion';
import type { LoadedProject } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
    projects: LoadedProject[];
    isLoading: boolean;
    errors: Array<{ id: string; error: string }>;
    onProjectClick: (project: LoadedProject) => void;
}

/**
 * Responsive grid of project cards with scroll reveal animation
 */
export function ProjectGrid({
    projects,
    isLoading,
    errors,
    onProjectClick
}: ProjectGridProps) {
    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Item animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="projects" className="px-6 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                        Featured Projects
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        A collection of games and applications I've worked on throughout my career.
                    </p>
                </motion.div>

                {/* Loading state */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Error cards for failed projects */}
                {errors.length > 0 && (
                    <div className="mb-6 space-y-2">
                        {errors.map((error) => (
                            <div
                                key={error.id}
                                className="glass-panel p-4 border-l-4 border-amber-500"
                            >
                                <p className="text-amber-400 text-sm">
                                    ⚠️ Failed to load project "{error.id}": {error.error}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects grid */}
                {!isLoading && projects.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projects.map((project) => (
                            <motion.div key={project.id} variants={itemVariants}>
                                <ProjectCard
                                    project={project}
                                    onClick={() => onProjectClick(project)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty state */}
                {!isLoading && projects.length === 0 && errors.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[var(--color-text-muted)]">
                            No projects found. Add projects to the <code className="text-[var(--color-accent-cyan)]">public/projects</code> folder.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

/**
 * Skeleton card for loading state
 */
function SkeletonCard() {
    return (
        <div className="glass-panel overflow-hidden">
            {/* Cover skeleton */}
            <div className="aspect-video skeleton" />

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
                <div className="flex gap-2">
                    <div className="h-6 w-16 skeleton rounded-full" />
                    <div className="h-6 w-16 skeleton rounded-full" />
                </div>
                <div className="h-4 w-full skeleton rounded" />
            </div>
        </div>
    );
}
