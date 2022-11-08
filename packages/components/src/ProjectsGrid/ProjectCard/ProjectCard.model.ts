export interface ProjectCard {
    id: string;
    name: string;
}

export type ProjectCardProps = {
    project: ProjectCard;
    onDeleteProject?: (projectId: string) => void;
};

export interface ProjectCardState {}
