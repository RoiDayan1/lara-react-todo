import { NewTask } from '@roid/models/src/tasks.model';

export type CreateNewTaskModalProps = {
    projectId: number;
    createNewTask?: (newTask: NewTask) => void;
};

export interface CreateNewTaskModalState {
    errors: Partial<{ [key in keyof NewTask]: string }>;
    userIdSelect?: number;
}
