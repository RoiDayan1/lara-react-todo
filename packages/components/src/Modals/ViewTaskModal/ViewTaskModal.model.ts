import { Task } from '@roid/models/src/tasks.model';

export type ViewTaskModalProps = {
    task: Task;
    onUpdate?: (data: Partial<Task>) => void;
};

export interface ViewTaskModalState {}
