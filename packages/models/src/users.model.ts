import { Expose } from 'class-transformer';

export class NewUser {
    @Expose({ name: 'name' })
    name?: string;

    @Expose({ name: 'email' })
    email?: string;
}

export class User {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'name' })
    name!: string;

    @Expose({ name: 'email' })
    email!: string;

    @Expose({ name: 'email_verified_at' })
    emailVerifiedAt!: Date | string;

    @Expose({ name: 'created_at' })
    createdAt!: Date | string;

    @Expose({ name: 'updated_at' })
    updatedAt!: Date | string;
}
