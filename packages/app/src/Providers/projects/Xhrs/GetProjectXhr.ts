import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Project } from '@roid/models/src/projects.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    id: string;
}

class GetProjectXhr extends BaseXhr<Project> {
    endpoint = '/projects/{id}';
    method = XhrMethod.GET;

    request(args: Args) {
        this.params = {
            id: args.id,
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return plainToInstance(Project, response.data);
    }
}

export default new GetProjectXhr();
