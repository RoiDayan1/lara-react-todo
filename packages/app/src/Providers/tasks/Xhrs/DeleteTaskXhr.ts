import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Task } from '@roid/models/src/tasks.model';

interface Args {
    id: string;
}

class DeleteTaskXhr extends BaseXhr<Task> {
    endpoint = '/tasks/{id}';
    method = XhrMethod.DELETE;

    request(args: Args) {
        this.params = {
            id: args.id,
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return response.data;
    }
}

export default new DeleteTaskXhr();
