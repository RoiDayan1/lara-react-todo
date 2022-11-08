import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { Project } from '@roid/models/src/projects.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    search?: string;
}

class GetProjectXhr extends BaseXhr<Project[]> {
    endpoint = '/projects';
    method = XhrMethod.GET;

    request(args: Args) {
        this.query = {
            search: args?.search || '',
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return response.data?.map((i: any) => plainToInstance(Project, i)) || [];
    }
}

export default new GetProjectXhr();
