import { motion } from 'framer-motion';
import type { LoadedProject } from '@/types';

interface ProjectCardProps {
    project: LoadedProject;
    onClick: () => void;
}

/**
 * Project card with cover, title, studio, platforms, and summary
 * Features hover lift/tilt effect with glow
 */
export function ProjectCard({ project, onClick }: ProjectCardProps) {
    // Resolve cover image URL
    const coverUrl = `${project.basePath}${project.media.cover}`;

    return (
        <motion.article
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${project.title}`}
            className="glass-panel overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)] transition-shadow hover:shadow-[var(--shadow-card-hover)] hover:glow-cyan"
        >
            {/* Cover image */}
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={coverUrl}
                    alt={`${project.title} cover`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[var(--color-accent-purple)] text-white text-xs font-semibold rounded">
                        Featured
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title and studio */}
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1 group-hover:gradient-text transition-all">
                    {project.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    {project.studio} • {project.roleTitle}
                </p>

                {/* Platform tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.platforms.map((platform) => (
                        <span
                            key={platform}
                            className="chip"
                        >
                            {platform}
                        </span>
                    ))}
                </div>

                {/* Summary */}
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {project.summary}
                </p>

                {/* Period */}
                <p className="text-xs text-[var(--color-text-muted)] mt-3">
                    {formatPeriod(project.period.from, project.period.to)}
                </p>
            </div>
        </motion.article>
    );
}

/**
 * Format period display
 */
function formatPeriod(from: string, to: string | null): string {
    const formatDate = (date: string) => {
        const [year, month] = date.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const fromFormatted = formatDate(from);
    const toFormatted = to ? formatDate(to) : 'Present';

    return `${fromFormatted} — ${toFormatted}`;
}
