import { ProjectCard } from './ProjectCard/ProjectCard.model';

export type ProjectsGridProps = {
    fetchingMore?: boolean;
    projects?: ProjectCard[];
    onDeleteProject?: (projectId: string) => void;
};

export interface ProjectsGridState {}
