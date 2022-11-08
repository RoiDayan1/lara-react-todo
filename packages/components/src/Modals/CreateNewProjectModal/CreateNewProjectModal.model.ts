import { NewProject } from '@roid/models/src/projects.model';

export interface CreateNewProjectModalStateError {
    name?: string;
}

export type CreateNewProjectModalProps = {
    createNewProject?: (newProject: NewProject) => void;
};

export interface CreateNewProjectModalState {
    errors: CreateNewProjectModalStateError;
}
