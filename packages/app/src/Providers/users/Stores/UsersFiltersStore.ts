import BaseStore from '../../../Services/StateService';

export interface UsersFiltersStoreValue {
    search?: string;
}

class UsersFiltersStore extends BaseStore<UsersFiltersStoreValue> {
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

export default new UsersFiltersStore();
