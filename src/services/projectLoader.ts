import type { Manifest, Project, LoadedProject, ProjectLoadResult } from '@/types';

// Use import.meta.env.BASE_URL for proper base path handling
const BASE_URL = import.meta.env.BASE_URL;

/**
 * Fetch the projects manifest
 */
export async function fetchManifest(): Promise<Manifest> {
    const response = await fetch(`${BASE_URL}projects/index.json`);

    if (!response.ok) {
        throw new Error(`Failed to fetch manifest: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch a single project by path
 */
export async function fetchProject(
    id: string,
    path: string
): Promise<ProjectLoadResult> {
    try {
        // Path in manifest is relative like "projects/magic-tiles-3/project.json"
        const response = await fetch(`${BASE_URL}${path}`);

        if (!response.ok) {
            return {
                success: false,
                id,
                error: `HTTP ${response.status}: ${response.statusText}`,
            };
        }

        const project: Project = await response.json();

        // Calculate base path for media URLs
        const basePath = path.substring(0, path.lastIndexOf('/') + 1);

        const loadedProject: LoadedProject = {
            ...project,
            basePath: `${BASE_URL}${basePath}`,
        };

        return { success: true, project: loadedProject };
    } catch (error) {
        return {
            success: false,
            id,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Fetch multiple projects with concurrency limit
 */
export async function fetchProjectsWithLimit(
    projects: Array<{ id: string; path: string }>,
    limit: number = 5
): Promise<ProjectLoadResult[]> {
    const results: ProjectLoadResult[] = [];

    // Process in batches
    for (let i = 0; i < projects.length; i += limit) {
        const batch = projects.slice(i, i + limit);
        const batchResults = await Promise.all(
            batch.map(p => fetchProject(p.id, p.path))
        );
        results.push(...batchResults);
    }

    return results;
}

/**
 * Sort projects according to contract rules:
 * 1. featured: true first
 * 2. order desc
 * 3. period.from desc
 */
export function sortProjects(projects: LoadedProject[]): LoadedProject[] {
    return [...projects].sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        // Order descending (higher order = first)
        const orderA = a.order ?? 0;
        const orderB = b.order ?? 0;
        if (orderA !== orderB) return orderB - orderA;

        // Period.from descending (newer = first)
        const fromA = a.period.from;
        const fromB = b.period.from;
        return fromB.localeCompare(fromA);
    });
}

/**
 * Load all projects from manifest
 */
export async function loadAllProjects(): Promise<{
    projects: LoadedProject[];
    errors: Array<{ id: string; error: string }>;
}> {
    // Fetch manifest
    const manifest = await fetchManifest();

    // Fetch all projects with concurrency limit
    const results = await fetchProjectsWithLimit(manifest.projects, 5);

    // Separate successes and failures
    const projects: LoadedProject[] = [];
    const errors: Array<{ id: string; error: string }> = [];

    for (const result of results) {
        if (result.success) {
            projects.push(result.project);
        } else {
            errors.push({ id: result.id, error: result.error });
        }
    }

    // Sort successful projects
    const sortedProjects = sortProjects(projects);

    return { projects: sortedProjects, errors };
}
