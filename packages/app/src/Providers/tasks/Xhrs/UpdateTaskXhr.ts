import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Task } from '@roid/models/src/tasks.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    id: number;
    data: Partial<Task>;
}

class UpdateTaskXhr extends BaseXhr<Task> {
    endpoint = '/tasks/{id}';
    method = XhrMethod.PUT;

    request(args: Args) {
        this.params = {
            id: args.id,
        };
        this.body = args.data;
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return plainToInstance(Task, response.data);
    }
}

export default new UpdateTaskXhr();
