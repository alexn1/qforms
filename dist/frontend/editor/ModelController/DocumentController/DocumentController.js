"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const ModelController_1 = require("../ModelController");
class DocumentController extends ModelController_1.ModelController {
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
        console.log('DocumentController.onDocumentClose', this.getTitle());
        this.document = null;
    }
}
exports.DocumentController = DocumentController;
