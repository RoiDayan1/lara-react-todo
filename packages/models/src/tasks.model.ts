import { Expose, Type } from 'class-transformer';
import { Project } from './projects.model';

export enum TaskState {
    Todo = 'Todo',
    Done = 'Done',
}

export class NewTask {
    @Expose({ name: 'description' })
    description!: string;

    @Expose({ name: 'state' })
    state!: TaskState;

    @Expose({ name: 'views' })
    views!: number;

    @Expose({ name: 'project_id' })
    project_id!: number;
    @Expose({ name: 'project' })
    @Type(() => Project)
    project?: Project;

    @Expose({ name: 'user_id' })
    user_id!: number;
}

export class Task {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'description' })
    description!: string;

    @Expose({ name: 'state' })
    state!: TaskState;

    @Expose({ name: 'views' })
    views!: number;

    @Expose({ name: 'project_id' })
    project_id!: number;
    @Expose({ name: 'project' })
    @Type(() => Project)
    project?: Project;

    @Expose({ name: 'user_id' })
    user_id!: number;

    @Expose({ name: 'created_at' })
    createdAt!: Date | string;

    @Expose({ name: 'updated_at' })
    updatedAt!: Date | string;
}
