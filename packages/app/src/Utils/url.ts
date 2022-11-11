import { isObject } from 'lodash';

export function joinUrl(...args: Array<string>) {
    return args.map((a) => a.replace(/^\/+|\/+$/g, '')).join('/');
}

export function addQueryParamsToUrl(url: string, query: { [key: string]: any }) {
    const urlObj = new URL(url);
    const queryChar = urlObj.search ? '&' : '?';

    function serializeQuery(params: any, prefix = '') {
        const q: string[] = Object.keys(params).map((key) => {
            const value = params[key];
            if (params.constructor === Array) key = `${prefix}[]`;
            else if (params.constructor === Object) key = prefix ? `${prefix}[${key}]` : key;

            if (typeof value === 'object') return serializeQuery(value, key);
            else return `${key}=${encodeURIComponent(value)}`;
        });
        return q.join('&');
    }

    return url + queryChar + serializeQuery(query);
}

export function applyParamsToEndpoint(endpoint: string, params: { [key: string]: string }) {
    Object.keys(params).forEach((p) => {
        endpoint = endpoint.replace(`{${p}}`, params[p]);
    });
    return endpoint;
}

export function applyParamsToRoute(path: string, params: { [key: string]: string }) {
    Object.keys(params).forEach((p) => {
        path = path.replace(`:${p}`, params[p]);
    });
    return path;
}

export function urlQueryStringToObj(str?: string) {
    const urlSearchParams = new URLSearchParams(str || window.location.search);
    const obj = {};
    for (const key of urlSearchParams.keys()) {
        const value = urlSearchParams.get(key);
        if (value === null) {
            obj[key] = null;
        } else if (value === undefined) {
            // do nothing
        } else {
            try {
                obj[key] = JSON.parse(value);
            } catch (err) {
                // obj[key] = value; => need to be commented to prevent manually data corruption
            }
        }
    }
    return obj;
}

export function routerQueryObjParse(obj: { [key: string]: string }) {
    Object.keys(obj).forEach((key) => {
        try {
            obj[key] = JSON.parse(obj[key]);
        } catch (err) {
            delete obj[key];
        }
    });
    return obj;
}

export function objToUrlQueryString(obj?: { [key: string]: any }) {
    const urlSearchParams = new URLSearchParams();
    for (const key in obj) {
        const value: any = obj[key];
        if (value !== undefined && value !== null) {
            urlSearchParams.set(key, isObject(value) ? JSON.stringify(value) : value);
        }
    }
    urlSearchParams.sort();
    const search = urlSearchParams.toString();
    return search.length ? '?' + search : '';
}
