import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Task } from '@roid/models/src/tasks.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    project_id?: string;
    search?: string;
}

class GetTasksXhr extends BaseXhr<Task[]> {
    endpoint = '/tasks';
    method = XhrMethod.GET;

    request(args: Args) {
        this.query = {
            project_id: args?.project_id || '',
            search: args?.search || '',
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return response.data?.map((i: any) => plainToInstance(Task, i)) || [];
    }
}

export default new GetTasksXhr();
