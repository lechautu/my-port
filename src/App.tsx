import { useState, useRef } from 'react';
import { AppShell, HeroSection, ProjectGrid, ProjectModal } from '@/components';
import { useProjects } from '@/hooks/useProjects';
import type { LoadedProject } from '@/types';

function App() {
    const { projects, isLoading, errors } = useProjects();
    const [selectedProject, setSelectedProject] = useState<LoadedProject | null>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    const handleViewProjects = () => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleProjectClick = (project: LoadedProject) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <AppShell>
            {/* Hero Section */}
            <HeroSection onViewProjectsClick={handleViewProjects} />

            {/* Projects Section */}
            <div ref={projectsRef}>
                <ProjectGrid
                    projects={projects}
                    isLoading={isLoading}
                    errors={errors}
                    onProjectClick={handleProjectClick}
                />
            </div>

            {/* Project Detail Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={handleCloseModal}
            />
        </AppShell>
    );
}

export default App;
