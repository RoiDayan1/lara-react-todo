import BaseStore from '../../../Services/StateService';
import { User } from '@roid/models/src/users.model';

class UsersStore extends BaseStore<Array<User>> {
    constructor() {
        super({
            saveToLocalStorage: false,
            saveToQuery: false,
            initialValue: [],
        });
    }
}

export default new UsersStore();
