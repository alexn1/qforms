import { ModelController } from '../ModelController';

export class DocumentController extends ModelController {
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
