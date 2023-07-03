import { EdModelController } from '../EdModelController';

export class EdDocumentController extends EdModelController {
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
        console.debug('DocumentController.onDocumentClose', this.getTitle());
        this.document = null;
    }
}
