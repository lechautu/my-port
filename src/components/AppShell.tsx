import { ReactNode } from 'react';

interface AppShellProps {
    children: ReactNode;
}

/**
 * Root layout component with glassmorphic dark background
 */
export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[var(--color-background)] relative overflow-hidden">
            {/* Background gradient orbs for visual depth */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Cyan gradient orb - top right */}
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, var(--color-accent-cyan), transparent 70%)',
                    }}
                />
                {/* Purple gradient orb - bottom left */}
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, var(--color-accent-purple), transparent 70%)',
                    }}
                />
                {/* Subtle center glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, var(--color-accent-cyan), transparent 60%)',
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
