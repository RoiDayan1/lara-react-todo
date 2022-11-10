import BaseStore from '../../../Services/StateService';

export interface TasksFiltersStoreValue {
    search?: string;
    project_id?: number | string;
}

class TasksFiltersStore extends BaseStore<TasksFiltersStoreValue> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: false,
            initialValue: {
                search: '',
            },
        });
    }
}

export default new TasksFiltersStore();
