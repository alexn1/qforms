import { Controller } from '../Controller';

export class ModalController extends Controller {
    options: any;

    constructor(options: any = {}) {
        super();
        if (!options.app) throw new Error('no app');
        if (!options.id) throw new Error('no id');
        this.options = options;
    }

    getId() {
        return this.options.id;
    }

    getApp() {
        return this.options.app;
    }

    async close() {
        await this.getApp().closeModal(this);
        if (this.options.onClose) {
            this.options.onClose();
        }
    }
}
