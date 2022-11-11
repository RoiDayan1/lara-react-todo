import { Task } from '@roid/models/src/tasks.model';

export type ProjectTasksGridProps = {
    fetchingMore?: boolean;
    tasks?: Task[];
    onDeleteTask?: (taskId: number) => void;
    onClickTask?: (taskId: number) => void;
};

export interface ProjectTasksGridState {}
