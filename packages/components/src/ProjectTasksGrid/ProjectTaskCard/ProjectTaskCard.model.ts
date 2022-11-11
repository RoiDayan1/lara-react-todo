import { Task } from '@roid/models/src/tasks.model';

export type ProjectTaskCardProps = {
    task: Task;
    onDeleteTask?: (taskId: number) => void;
};

export interface ProjectTaskCardState {}
