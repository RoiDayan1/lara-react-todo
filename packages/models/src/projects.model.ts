import { Expose } from 'class-transformer';

export class NewProject {
    @Expose({ name: 'name' })
    name?: string;
}

export class Project {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'name' })
    name!: string;

    @Expose({ name: 'created_at' })
    createdAt!: Date | string;

    @Expose({ name: 'updated_at' })
    updatedAt!: Date | string;
}
