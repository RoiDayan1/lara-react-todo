import { get, isString } from 'lodash';

export interface DictionaryObj {
    [key: string]: string | DictionaryObj;
}

class DictionaryObject {
    static obj: DictionaryObj = {
        cancel: 'CANCEL',
        apply: 'APPLY',
        errorPages: {
            error404Page: {
                h: 'Page Not Found',
                p: "We're sorry, we couldn't find the page you were looking for",
            },
            backHomeButton: 'Head Back Home ?',
        },
    };
}

export class DictionaryService {
    static init(obj: DictionaryObj) {
        DictionaryObject.obj = obj;
    }

    static t(path: string, defaultValue?: string): string | undefined {
        const val = get(DictionaryObject.obj, path);
        return val !== undefined && isString(val) ? val : defaultValue;
    }
}

const t = DictionaryService.t;
export default t;
