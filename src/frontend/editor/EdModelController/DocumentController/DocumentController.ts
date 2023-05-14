import { EdModelController } from '../EdModelController';

export class DocumentController extends EdModelController {
    document: any;

    constructor(model, parent) {
        super(model, parent);
        this.document = null;
    }

    async createDocument(): Promise<any> {
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
