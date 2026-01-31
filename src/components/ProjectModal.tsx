import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LoadedProject } from '@/types';
import { GalleryCarousel } from './GalleryCarousel';

interface ProjectModalProps {
    project: LoadedProject | null;
    onClose: () => void;
}

/**
 * Project detail modal with full info and gallery
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Handle ESC key to close
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (isGalleryOpen) {
                setIsGalleryOpen(false);
            } else {
                onClose();
            }
        }
    }, [onClose, isGalleryOpen]);

    useEffect(() => {
        if (project) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
            };
        }
    }, [project, handleKeyDown]);

    // Focus trap - return focus to modal on tab
    useEffect(() => {
        if (project) {
            const modal = document.getElementById('project-modal');
            modal?.focus();
        }
    }, [project]);

    const openGallery = (index: number) => {
        setGalleryIndex(index);
        setIsGalleryOpen(true);
    };

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        id="project-modal"
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-4 md:inset-10 z-50 overflow-hidden glass-panel-strong flex flex-col focus:outline-none"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-[var(--color-border)]">
                            <div>
                                <h2 id="modal-title" className="text-2xl md:text-3xl font-bold gradient-text">
                                    {project.title}
                                </h2>
                                <p className="text-[var(--color-text-secondary)] mt-1">
                                    {project.studio} • {project.roleTitle}
                                </p>
                                {project.type && (
                                    <p className="text-sm text-[var(--color-text-muted)]">
                                        {project.type}
                                    </p>
                                )}
                            </div>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                className="p-2 hover:bg-[var(--color-surface-hover)] rounded-lg transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Content - scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Period */}
                            <div className="flex items-center gap-4 text-sm">
                                <span className="chip-accent">
                                    {formatPeriod(project.period.from, project.period.to)}
                                </span>
                                {project.platforms.map((platform) => (
                                    <span key={platform} className="chip">
                                        {platform}
                                    </span>
                                ))}
                            </div>

                            {/* Gallery thumbnails */}
                            {project.media.gallery.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                        Gallery
                                    </h3>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {project.media.gallery.map((img, index) => (
                                            <button
                                                key={img}
                                                onClick={() => openGallery(index)}
                                                className="flex-shrink-0 w-32 md:w-40 aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-[var(--color-accent-cyan)] transition-all"
                                            >
                                                <img
                                                    src={`${project.basePath}${img}`}
                                                    alt={`${project.title} screenshot ${index + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                    About
                                </h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                    Responsibilities
                                </h3>
                                <ul className="space-y-2">
                                    {project.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex gap-3 text-[var(--color-text-secondary)]">
                                            <span className="text-[var(--color-accent-cyan)]">▹</span>
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech stack */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="chip-accent">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights */}
                            {project.highlights && project.highlights.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                        Highlights
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {project.highlights.map((highlight, i) => (
                                            <div key={i} className="glass-panel p-4 text-center">
                                                <p className="text-xl font-bold gradient-text">{highlight.value}</p>
                                                <p className="text-sm text-[var(--color-text-muted)]">{highlight.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            {project.links && project.links.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                                        Links
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.links.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary gap-2"
                                            >
                                                <ExternalLinkIcon />
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {project.tags && project.tags.length > 0 && (
                                <div className="pt-4 border-t border-[var(--color-border)]">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs text-[var(--color-text-muted)]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Gallery lightbox */}
                    <GalleryCarousel
                        images={project.media.gallery.map(img => `${project.basePath}${img}`)}
                        isOpen={isGalleryOpen}
                        initialIndex={galleryIndex}
                        onClose={() => setIsGalleryOpen(false)}
                        projectTitle={project.title}
                    />
                </>
            )}
        </AnimatePresence>
    );
}

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

function CloseIcon() {
    return (
        <svg className="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}
