"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalController = void 0;
const EditorFrontHostApp_1 = require("../EditorFrontHostApp/EditorFrontHostApp");
class ModalController {
    constructor(options) {
        this.onClose = async (e) => {
            console.log('ModalController.onClose');
            await this.close();
        };
        this.onCreate = async (values) => {
            console.log('ModalController.onCreate', values);
            await this.close();
            if (this.options.onCreate) {
                await this.options.onCreate(values);
            }
        };
        this.options = options;
    }
    async close() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.onModalClose();
    }
    getViewClass() {
        throw new Error('ModalController.getViewClass not implemented');
    }
}
exports.ModalController = ModalController;
