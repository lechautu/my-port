import { useState, useEffect, useCallback } from 'react';
import type { LoadedProject } from '@/types';
import { loadAllProjects } from '@/services/projectLoader';

interface UseProjectsResult {
    projects: LoadedProject[];
    isLoading: boolean;
    errors: Array<{ id: string; error: string }>;
    refetch: () => void;
}

/**
 * Hook to load and manage project data
 */
export function useProjects(): UseProjectsResult {
    const [projects, setProjects] = useState<LoadedProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<Array<{ id: string; error: string }>>([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        try {
            const result = await loadAllProjects();
            setProjects(result.projects);
            setErrors(result.errors);
        } catch (error) {
            console.error('Failed to load projects:', error);
            setErrors([{ id: 'manifest', error: 'Failed to load project manifest' }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        projects,
        isLoading,
        errors,
        refetch: fetchData,
    };
}
