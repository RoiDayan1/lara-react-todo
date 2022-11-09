import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { NewTask, Task } from '@roid/models/src/tasks.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    newTask: NewTask;
}

class CreateTaskXhr extends BaseXhr<Task> {
    endpoint = '/tasks';
    method = XhrMethod.POST;

    request(args: Args) {
        this.body = args.newTask;
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return plainToInstance(Task, response.data);
    }
}

export default new CreateTaskXhr();
