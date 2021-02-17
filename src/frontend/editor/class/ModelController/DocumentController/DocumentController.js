class DocumentController extends ModelController {
    constructor(model, parent) {
        super(model, parent);
        this.document = null;
    }
    async createDocument() {
        const document = {
            controller: this,
            view      : null,
        };
        return this.document = document;
    }
    onDocumentClose() {
        console.log('DocumentController.onDocumentClose', this.getTitle());
        this.document = null;
    }
}
