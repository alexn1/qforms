"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdDocumentController = void 0;
const EdModelController_1 = require("../EdModelController");
class EdDocumentController extends EdModelController_1.EdModelController {
    constructor(model, parent) {
        super(model, parent);
        this.document = null;
    }
    async createDocument() {
        const document = {
            controller: this,
            view: null,
        };
        return (this.document = document);
    }
    onDocumentClose() {
        console.debug('DocumentController.onDocumentClose', this.getTitle());
        this.document = null;
    }
}
exports.EdDocumentController = EdDocumentController;
