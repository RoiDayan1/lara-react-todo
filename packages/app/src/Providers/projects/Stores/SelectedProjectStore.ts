import BaseStore from '../../../Services/StateService';
import { Project } from '@roid/models/src/projects.model';

class SelectedProjectStore extends BaseStore<Project | null> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: false,
            initialValue: null,
        });
    }
}

export default new SelectedProjectStore();
