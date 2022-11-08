import BaseStore from '../../../Services/StateService';

export interface ProjectsFiltersStoreValue {
    search?: string;
}

class ProjectsFiltersStore extends BaseStore<ProjectsFiltersStoreValue> {
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

export default new ProjectsFiltersStore();
