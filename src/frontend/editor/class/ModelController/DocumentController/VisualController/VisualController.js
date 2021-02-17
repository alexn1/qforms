class VisualController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.data = null;
    }
    async createDocument() {
        console.log('VisualController.createDocument');
        const document = await super.createDocument();
        const result = await this.model.getView('VisualView.html');
        this.data = result.data;
        return document;
    }
    async onControllerSave(value) {
        console.log('ApplicationController.onControllerSave'/*, value*/);
        await this.model.saveController(value);
    }
    onCreateCustomController = async e => {
        console.log('ApplicationController.onCreateCustomController');
        const data = await this.model.createController();
        this.data.js = data.js;
        this.document.view.rerender();
    }
}
