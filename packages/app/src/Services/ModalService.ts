import { DestroyFn, HideFn, ShowFn, State, UpdateFn } from 'mui-modal-provider/dist/types';

interface ModalManager {
    state: State;
    updateModal: UpdateFn;
    hideModal: HideFn;
    destroyModal: DestroyFn;
    showModal: ShowFn;
}

class BaseModalService {
    static manager: ModalManager;
}

class ModalService {
    static initModalManager(modalManager: ModalManager) {
        BaseModalService.manager = modalManager;
    }

    static get state() {
        return BaseModalService.manager.state;
    }

    static get update() {
        return BaseModalService.manager.updateModal;
    }

    static get hide() {
        return BaseModalService.manager.hideModal;
    }

    static get destroy() {
        return BaseModalService.manager.destroyModal;
    }

    static get show() {
        return BaseModalService.manager.showModal;
    }
}

export default ModalService;
