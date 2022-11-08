import BaseStore from '../../../Services/StateService';
import { Project } from '@roid/models/src/projects.model';

class ProjectsStore extends BaseStore<Array<Project>> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: false,
            initialValue: [],
        });
    }
}

export default new ProjectsStore();
