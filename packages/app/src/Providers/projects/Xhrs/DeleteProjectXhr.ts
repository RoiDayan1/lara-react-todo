import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Project } from '@roid/models/src/projects.model';

interface Args {
    id: number;
}

class DeleteProjectXhr extends BaseXhr<Project> {
    endpoint = '/projects/{id}';
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

export default new DeleteProjectXhr();
