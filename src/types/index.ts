/**
 * Manifest file structure: projects/index.json
 */
export interface Manifest {
    version: number;
    projects: ManifestProject[];
}

export interface ManifestProject {
    id: string;
    path: string;
}

/**
 * Project data structure: projects/<id>/project.json
 */
export interface Project {
    // Required fields
    id: string;
    title: string;
    studio: string;
    period: Period;
    platforms: string[];
    roleTitle: string;
    summary: string;
    description: string;
    responsibilities: string[];
    tech: string[];
    media: ProjectMedia;

    // Optional fields
    type?: string;
    highlights?: Highlight[];
    links?: ProjectLink[];
    tags?: string[];
    featured?: boolean;
    order?: number;
}

export interface Period {
    from: string; // YYYY-MM format
    to: string | null; // YYYY-MM format or null for ongoing
}

export interface ProjectMedia {
    cover: string;
    gallery: string[];
}

export interface Highlight {
    label: string;
    value: string;
}

export interface ProjectLink {
    label: string;
    url: string;
}

/**
 * Loaded project with resolved media paths and loading state
 */
export interface LoadedProject extends Project {
    basePath: string; // Base path for resolving media URLs
}

/**
 * Project loading result - either success or error
 */
export type ProjectLoadResult =
    | { success: true; project: LoadedProject }
    | { success: false; id: string; error: string };
