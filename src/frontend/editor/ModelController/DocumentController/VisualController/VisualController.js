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
    createDataSource(model) {
        const dataSource = new DataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    removeDataSource(dataSourceController) {
        // console.log('VisualController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1) throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
    }
    createAction(model) {
        const action = new ActionController(model, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeAction(actionController) {
        // console.log('VisualController.removeAction', actionController.getTitle());
        const i = this.actions.indexOf(actionController);
        if (i === -1) throw new Error('no such actionController');
        this.actions.splice(i, 1);
    }
    async actionNewAction() {
        console.log('VisualController.actionNewAction');
        await EditorApp.editorApp.openModal(new NewActionController({onCreate: async values => {
            const action = await this.model.newAction({
                name   : values.name,
                caption: values.caption
            });
            const actionController = this.createAction(action);
            await EditorApp.editorApp.treeWidget2.select(actionController);
            actionController.view.parent.open();
            if (this.pageLinkController) {
                this.pageLinkController.view.rerender();
            } else {
                this.view.rerender();
            }
            EditorApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
}
