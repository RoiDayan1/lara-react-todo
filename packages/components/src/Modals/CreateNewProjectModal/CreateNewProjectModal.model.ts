import { NewProject } from '@roid/models/src/projects.model';

export type CreateNewProjectModalProps = {
    createNewProject?: (newProject: NewProject) => void;
};

export interface CreateNewProjectModalState {
    errors: Partial<{ [key in keyof NewProject]: string }>;
}
