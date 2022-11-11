import { Project } from '@roid/models/src/projects.model';

export type ProjectCardProps = {
    project: Project;
    onDeleteProject?: (projectId: number) => void;
    onClickProject?: (projectId: number) => void;
};

export interface ProjectCardState {}
