import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { NewProject, Project } from '@roid/models/src/projects.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    newProject: NewProject;
}

class CreateProjectXhr extends BaseXhr<Project> {
    endpoint = '/projects';
    method = XhrMethod.POST;

    request(args: Args) {
        this.body = args.newProject;
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return plainToInstance(Project, response.data);
    }
}

export default new CreateProjectXhr();
