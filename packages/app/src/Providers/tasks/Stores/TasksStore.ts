import BaseStore from '../../../Services/StateService';
import { Task } from '@roid/models/src/tasks.model';

class TasksStore extends BaseStore<Array<Task>> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: false,
            initialValue: [],
        });
    }
}

export default new TasksStore();
