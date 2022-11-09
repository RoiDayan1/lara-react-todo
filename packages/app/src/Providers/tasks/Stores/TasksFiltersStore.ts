import BaseStore from '../../../Services/StateService';

export interface TasksFiltersStoreValue {
    search?: string;
}

class TasksFiltersStore extends BaseStore<TasksFiltersStoreValue> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: true,
            initialValue: {
                search: '',
            },
        });
    }
}

export default new TasksFiltersStore();
