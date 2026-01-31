import { motion } from 'framer-motion';

// Real data from portfolio
const HERO_DATA = {
    name: 'Le Chau Tu',
    headline: 'Product-focused Unity & Frontend engineer building polished, performance-first experiences.',
    location: 'Ho Chi Minh, Vietnam',
    bio: 'Crafting immersive mobile gaming experiences with Unity. Passionate about rhythm games, live-ops, and pushing the boundaries of mobile performance.',
    links: {
        linkedin: 'https://www.linkedin.com/in/tu-le-16b980109/',
        github: 'https://github.com/lechautu',
        email: 'lechautu1993@gmail.com',
    },
};

interface HeroSectionProps {
    onViewProjectsClick: () => void;
}

/**
 * Hero section with name, headline, links, and CTA
 */
export function HeroSection({ onViewProjectsClick }: HeroSectionProps) {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Animated entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Location badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-panel"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-[var(--color-text-secondary)]">
                            {HERO_DATA.location}
                        </span>
                    </motion.div>

                    {/* Name - large gradient text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
                    >
                        {HERO_DATA.name}
                    </motion.h1>

                    {/* Headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-6"
                    >
                        {HERO_DATA.headline}
                    </motion.p>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        {HERO_DATA.bio}
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-10"
                    >
                        <SocialLink href={HERO_DATA.links.linkedin} label="LinkedIn">
                            <LinkedInIcon />
                        </SocialLink>
                        <SocialLink href={HERO_DATA.links.github} label="GitHub">
                            <GitHubIcon />
                        </SocialLink>
                        <SocialLink href={`mailto:${HERO_DATA.links.email}`} label="Email">
                            <EmailIcon />
                        </SocialLink>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onViewProjectsClick}
                        className="btn-primary text-lg px-8 py-4 gap-2"
                    >
                        View Projects
                        <ArrowDownIcon />
                    </motion.button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-[var(--color-border)] rounded-full flex justify-center pt-2"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-2 bg-[var(--color-accent-cyan)] rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Social link component
interface SocialLinkProps {
    href: string;
    label: string;
    children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center glass-panel hover:border-[var(--color-accent-cyan)] transition-colors"
        >
            {children}
        </motion.a>
    );
}

// Icons
function LinkedInIcon() {
    return (
        <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function ArrowDownIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    );
}
