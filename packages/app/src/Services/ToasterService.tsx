import {
    AddToast,
    AppearanceTypes,
    Options,
    RemoveAllToasts,
    RemoveToast,
    UpdateOptions,
    UpdateToast,
} from 'react-toast-notifications';
import React, { ReactNode } from 'react';

export interface ToastManager {
    toasts: Array<{
        content: ReactNode;
        id: string;
        appearance: AppearanceTypes;
    }>;
    add: AddToast;
    update: UpdateToast;
    remove: RemoveToast;
    removeAll: RemoveAllToasts;
}

class BaseToasterService {
    static manager: ToastManager;
}

class ToasterService {
    static readonly config = {
        autoDismiss: true,
        autoDismissTimeout: 5000,
    };

    static initToastManager(toastManager: ToastManager) {
        BaseToasterService.manager = toastManager;
    }

    static get toasts() {
        return BaseToasterService.manager.toasts;
    }

    static add(content: ReactNode, options?: Options, callback?: (id: string) => void): void {
        BaseToasterService.manager.add(content, options, callback);
    }

    static addInfo(content: ReactNode, options?: Options, callback?: (id: string) => void): void {
        options = { ...options, appearance: 'info' };
        BaseToasterService.manager.add(content, options, callback);
    }

    static addSuccess(content: ReactNode, options?: Options, callback?: (id: string) => void): void {
        options = { ...options, appearance: 'success' };
        BaseToasterService.manager.add(content, options, callback);
    }

    static addWarning(content: ReactNode, options?: Options, callback?: (id: string) => void): void {
        options = { ...options, appearance: 'warning' };
        BaseToasterService.manager.add(content, options, callback);
    }

    static addError(content: ReactNode, options?: Options, callback?: (id: string) => void): void {
        options = { ...options, appearance: 'error' };
        BaseToasterService.manager.add(content, options, callback);
    }

    static addXHRError(
        title: ReactNode,
        error: any,
        options?: Options,
        callback?: (id: string) => void
    ): void {
        if (error?.code === 'ECONNABORTED') return;
        options = { ...options, appearance: 'error' };
        const message = error?.response?.data?.message || error?.message;
        const content: ReactNode = (
            <div>
                <div>
                    <b>{title}</b>
                </div>
                {message && <div>{message}</div>}
            </div>
        );
        BaseToasterService.manager.add(content, options, callback);
    }

    static update(id: string, options?: UpdateOptions, callback?: (id: string) => void): void {
        BaseToasterService.manager.update(id, options, callback);
    }

    static remove(id: string, callback?: (id: string) => void): void {
        BaseToasterService.manager.remove(id, callback);
    }

    static removeAll(): void {
        BaseToasterService.manager.removeAll();
    }
}

export default ToasterService;
