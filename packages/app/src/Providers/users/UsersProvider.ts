import { remove } from 'lodash';
import ToasterService from '../../Services/ToasterService';
import { User } from '@roid/models/src/users.model';
import UsersStore from './Stores/UsersStore';
import UsersFiltersStore, { UsersFiltersStoreValue } from './Stores/UsersFiltersStore';
import GetUsersXhr from './Xhrs/GetUsersXhr';

class UsersProvider {
    static stores = {
        UsersStore,
        UsersFiltersStore,
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Users
    ///////////////////////////////////////////////////////////////////////////////////////
    static async fetchUsers() {
        const usersFilters = UsersProvider.getUsersFilters();
        return await GetUsersXhr.request(usersFilters).catch((error) =>
            ToasterService.addXHRError('Fetch Users', error)
        );
    }

    static async fetchSetGetUsers() {
        UsersProvider.stores.UsersStore.setIsLoading(true);
        const response = await UsersProvider.fetchUsers();
        UsersProvider.setUsers(response || []);
        UsersProvider.stores.UsersStore.setIsLoading(false);
        return response;
    }

    //////////////////////////////////
    static getUsers() {
        return UsersProvider.stores.UsersStore.value();
    }

    static setUsers(users: Array<User>) {
        UsersProvider.stores.UsersStore.set(users);
    }

    static removeUser(userId: number) {
        const users = UsersProvider.getUsers();
        remove(users, { id: userId });
        UsersProvider.setUsers(users || []);
    }

    static clearUsers() {
        return UsersProvider.stores.UsersStore.reset();
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Users Filters
    ///////////////////////////////////////////////////////////////////////////////////////
    static getUsersFilters() {
        return UsersProvider.stores.UsersFiltersStore.value();
    }

    static setUsersFilters(usersFilters: UsersFiltersStoreValue) {
        UsersProvider.stores.UsersFiltersStore.set(usersFilters);
    }

    static clearUsersFilters() {
        return UsersProvider.stores.UsersFiltersStore.reset();
    }

    static setUsersFiltersSearch(value: string) {
        const usersFilters = UsersProvider.getUsersFilters();
        usersFilters.search = value;
        UsersProvider.setUsersFilters(usersFilters);
    }
}

export default UsersProvider;
