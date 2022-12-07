import { ModelController } from '../ModelController';

export class DocumentController extends ModelController {
    document: any;
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
