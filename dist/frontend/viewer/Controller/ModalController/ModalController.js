"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalController = void 0;
const Controller_1 = require("../Controller");
class ModalController extends Controller_1.Controller {
    constructor(options = {}) {
        super();
        if (!options.app)
            throw new Error('no app');
        if (!options.id)
            throw new Error('no id');
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
exports.ModalController = ModalController;
