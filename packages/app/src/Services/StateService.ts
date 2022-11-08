import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import NavigationService from './NavigationService';
import { cloneDeep, isEqual, mapValues } from 'lodash';
import { urlQueryStringToObj } from '../Utils/url';

abstract class BaseStore<T> {
    readonly name: string = this.constructor.name.replace(/store/i, '');
    private state!: { isLoading: boolean; value: T };

    private readonly saveToLocalStorage: boolean;
    private readonly saveToQuery: boolean;
    private readonly initialValue: T;

    protected constructor(args: { saveToLocalStorage: boolean; saveToQuery: boolean; initialValue: T }) {
        this.saveToLocalStorage = args.saveToLocalStorage;
        this.saveToQuery = args.saveToQuery;
        this.initialValue = args.initialValue;
        this.init();
    }

    private init() {
        this.state = { isLoading: false, value: cloneDeep(this.initialValue) };

        if (this.saveToLocalStorage) {
            if (Storage.has(this.name)) {
                this.state.value = Storage.get(this.name);
            }
        } else {
            Storage.remove(this.name);
        }

        if (this.saveToQuery) {
            if (Query.has(this.name)) {
                this.state.value = Query.get(this.name);
            }
        } else {
            Query.remove(this.name);
        }

        State.dispatch(this.name, this.state);
    }

    readonly value = () => {
        return cloneDeep(this.state.value);
    };

    readonly isLoading = () => {
        return cloneDeep(this.state.isLoading);
    };

    readonly setIsLoading = (value: boolean) => {
        this.state.isLoading = value;
        State.dispatch(this.name, cloneDeep(this.state));
    };

    readonly update = (value: T) => {
        this.state.value = value;

        if (this.saveToQuery) {
            if (isEqual(this.state.value, this.initialValue)) {
                Query.remove(this.name);
            } else {
                Query.set(this.name, this.state.value);
            }
        }
        if (this.saveToLocalStorage) {
            if (isEqual(this.state.value, this.initialValue)) {
                Storage.remove(this.name);
            } else {
                Storage.set(this.name, this.state.value);
            }
        }

        State.dispatch(this.name, cloneDeep(this.state));
    };

    readonly reset = () => {
        this.update(this.initialValue);
        return this.value();
    };
}

export default BaseStore;

////////////////////////////////////////////////////
///// State
////////////////////////////////////////////////////

class State {
    static store: Store = createStore(reducer, applyMiddleware(thunk));

    static get state() {
        return State.store.getState();
    }

    static setAppState(newState = {}) {
        return {
            type: null,
            newState: newState,
        };
    }

    static dispatch(name: string, value: any) {
        let newState = { [name]: value };
        State.store.dispatch(State.setAppState(newState));
    }
}

function reducer(state = {}, params: AnyAction) {
    return { ...state, ...params.newState };
}

export const store = State.store;

////////////////////////////////////////////////////
///// Storage
////////////////////////////////////////////////////

class Storage {
    static storage: { [key: string]: any } = mapValues(localStorage, (v) => {
        try {
            return JSON.parse(v);
        } catch (e) {
            return v;
        }
    });

    static has(key: string) {
        return key in Storage.storage;
    }

    static get(key: string): any {
        return cloneDeep(Storage.storage[key]);
    }

    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        Storage.storage[key] = value;
    }

    static remove(...keys: string[]) {
        keys.forEach((key) => {
            localStorage.removeItem(key);
            delete Storage.storage[key];
        });
    }

    static clearAll() {
        localStorage.clear();
        Storage.storage = {};
    }
}

////////////////////////////////////////////////////
///// Query
////////////////////////////////////////////////////

class Query {
    static query = urlQueryStringToObj();

    static get string() {
        const urlSearchParams = new URLSearchParams(NavigationService.history.location.search);
        urlSearchParams.sort();
        return urlSearchParams.toString();
    }

    static has(key: string) {
        return key in Query.query;
    }

    static get(key: string) {
        return cloneDeep(Query.query[key]);
    }

    static set(key: string, value: any) {
        const urlSearchParams = new URLSearchParams(NavigationService.history.location.search);
        urlSearchParams.set(key, JSON.stringify(value));
        urlSearchParams.sort();
        NavigationService.history.replace({
            search: '?' + urlSearchParams.toString(),
        });
        Query.query[key] = value;
    }

    static remove(key: string) {
        const urlSearchParams = new URLSearchParams(NavigationService.history.location.search);
        urlSearchParams.delete(key);
        urlSearchParams.sort();
        NavigationService.history.replace({
            search: '?' + urlSearchParams.toString(),
        });
        delete Query.query[key];
    }

    static clearAll() {
        NavigationService.history.replace({
            search: '',
        });
        Query.query = {};
    }
}
