import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Task } from '@roid/models/src/tasks.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    id: number;
}

class IncrementTaskViewsXhr extends BaseXhr<Task> {
    endpoint = '/tasks/{id}/view';
    method = XhrMethod.POST;

    request(args: Args) {
        this.params = {
            id: args.id,
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return plainToInstance(Task, response.data);
    }
}

export default new IncrementTaskViewsXhr();
