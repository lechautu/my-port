import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryCarouselProps {
    images: string[];
    isOpen: boolean;
    initialIndex: number;
    onClose: () => void;
    projectTitle: string;
}

/**
 * Fullscreen gallery carousel with keyboard navigation
 */
export function GalleryCarousel({
    images,
    isOpen,
    initialIndex,
    onClose,
    projectTitle,
}: GalleryCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Reset index when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowRight':
                goNext();
                break;
            case 'ArrowLeft':
                goPrev();
                break;
            case 'Escape':
                onClose();
                break;
        }
    }, [goNext, goPrev, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    if (images.length === 0) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close gallery"
                        className="absolute top-4 right-4 z-10 p-3 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <CloseIcon />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/70 text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Navigation buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                aria-label="Previous image"
                                className="absolute left-4 p-3 hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <ChevronLeftIcon />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                aria-label="Next image"
                                className="absolute right-4 p-3 hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <ChevronRightIcon />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-[90vw] max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        />
                    </motion.div>

                    {/* Dots navigation */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                                    aria-label={`Go to image ${index + 1}`}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-[var(--color-accent-cyan)] w-6'
                                            : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Keyboard hint */}
                    <div className="absolute bottom-6 right-4 text-white/40 text-xs hidden md:block">
                        Use ← → keys to navigate, ESC to close
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function CloseIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

function ChevronLeftIcon() {
    return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}
