import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import ConfigService from './ConfigService';
import { addQueryParamsToUrl, applyParamsToEndpoint, joinUrl } from '../Utils/url';

export class XhrService {
    static pendingRequests: Array<BaseXhrRequest> = [];

    static cancelPreviousRequests = (xhr: BaseXhrRequest) => {
        XhrService.pendingRequests.forEach((x: BaseXhrRequest) => {
            const isTheSame = x.name === xhr.name;
            if (isTheSame) {
                x.cancelTokenSource?.cancel();
            }
        });
    };

    static removeXhrFromPendingRequests = (xhr: BaseXhrRequest) => {
        XhrService.pendingRequests = XhrService.pendingRequests.filter(
            (x: BaseXhrRequest) => x.name !== xhr.name
        );
    };

    static request = async <T = any>(xhr: BaseXhrRequest): Promise<AxiosResponse<T> | 'CANCELED'> => {
        // cancel previous requests of the same Xhr type
        if (xhr.cancelPreviousRequest) {
            XhrService.cancelPreviousRequests(xhr);
        }
        // add this xhr to the pending requests list tobe able to cancel it if needed
        XhrService.pendingRequests.push(xhr);

        // get the cancellation token
        xhr.cancelTokenSource = axios.CancelToken.source();

        // replace params placeholders with params values
        const endpoint = applyParamsToEndpoint(xhr.endpoint, xhr.params);

        // if endpoint is full url don't concat the base api url
        let url = /^https?:\/\//i.test(endpoint) ? endpoint : joinUrl(ConfigService.apiUrl, endpoint);

        // add the query params object to the url
        if (Object.keys(xhr.query).length) {
            url = addQueryParamsToUrl(url, xhr.query);
        }

        // set base headers and concat xhr headers
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        headers = { ...headers, ...xhr.headers };

        let data: any;
        if (xhr.files?.length) {
            headers['Content-Type'] = 'multipart/form-data';
            data = new FormData();
            Object.keys(xhr.body).forEach((key) => {
                data.append(key, xhr.body[key]);
            });
            xhr.files.forEach((file: File) => {
                data.append('files[]', file);
            });
        } else {
            data = JSON.stringify(xhr.body);
        }

        // request
        return axios
            .request({
                url,
                headers,
                method: xhr.method,
                data,
                cancelToken: xhr.cancelTokenSource.token,
            })
            .then((res: AxiosResponse<T>) => {
                XhrService.removeXhrFromPendingRequests(xhr);
                return res;
            })
            .catch((error) => {
                if (error.constructor.name !== 'Cancel') {
                    XhrService.removeXhrFromPendingRequests(xhr);
                    throw error;
                }
                return 'CANCELED';
            });
    };
}

export enum XhrMethod {
    GET = 'GET',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    PURGE = 'PURGE',
    LINK = 'LINK',
    UNLINK = 'UNLINK',
}

export type XhrResponse<T = any> = AxiosResponse<T>;

type BaseXhrRequest = {
    name: string;
    endpoint: string;
    method: XhrMethod;
    cancelTokenSource?: CancelTokenSource;
    cancelPreviousRequest: boolean;
    headers: { [key: string]: string };
    params: { [key: string]: string };
    query: { [key: string]: any };
    body: { [key: string]: any };
    files: File[];
};

abstract class BaseXhr<T> {
    readonly name: string = this.constructor.name;
    private cancelPreviousRequest: boolean;
    protected abstract endpoint: string;
    protected abstract method: XhrMethod;
    protected headers: { [key: string]: string } = {};
    protected params: { [key: string]: string | number | undefined } = {};
    protected query: { [key: string]: any } = {};
    protected body: { [key: string]: any } = {};
    protected files: File[] = [];

    constructor(cancelable: boolean = true) {
        this.cancelPreviousRequest = cancelable;
    }

    get unCancel() {
        return new (Object.getPrototypeOf(this).constructor)(false);
    }

    responseTransform(response: XhrResponse<T>) {
        return response.data;
    }

    // don't override, will call the Xhr request
    protected readonly call = () => {
        return new Promise<T>((resolve, reject) => {
            XhrService.request<T>({
                name: this.name,
                endpoint: this.endpoint,
                method: this.method,
                cancelTokenSource: undefined,
                cancelPreviousRequest: this.cancelPreviousRequest,
                headers: this.headers,
                params: this.params,
                query: this.query,
                body: this.body,
                files: this.files,
            } as BaseXhrRequest)
                .then((res) => {
                    if (res !== 'CANCELED') resolve(this.responseTransform(res));
                })
                .catch((error) => reject(error));
        });
    };
}

export default BaseXhr;
