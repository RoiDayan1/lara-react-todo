import { Project } from '@roid/models/src/projects.model';

export type ProjectsGridProps = {
    fetchingMore?: boolean;
    projects?: Project[];
    onDeleteProject?: (projectId: number) => void;
    onClickProject?: (projectId: number) => void;
};

export interface ProjectsGridState {}
