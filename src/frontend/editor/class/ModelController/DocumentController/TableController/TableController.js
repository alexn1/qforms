class TableController extends DocumentController {

    constructor(model, parent) {
        super(model, parent);
        this.columns = [];
        this.items = [
            {
                getTitle: () => 'Columns',
                items: this.columns
            }
        ];
    }

    init() {
        this.model.columns.forEach(column => this.createColumn(column));
    }
    createColumn(model) {
        const column = new ColumnController(model, this);
        column.init();
        this.columns.push(column);
        return column;
    }
    removeColumn(columnController) {
        console.log('TableController.removeColumn', columnController.getTitle());
        const i = this.columns.indexOf(columnController);
        if (i === -1) throw new Error('no such columnController');
        this.columns.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newColumn', 'caption': 'New Column'},
            {'action': 'delete', 'caption': 'Delete'},
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                this.delete();
                break;
            case 'newColumn':
                this.actionNewColumn();
                break;
            default:
                throw new Error(`unknown action: ${name}`);
        }
    }

    static async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }

    async actionNewColumn() {
        await EditorController.editorController.openModal(new NewColumnController({onCreate: async values => {
            const column = await this.model.newColumn(values.name);
            const columnController = this.createColumn(column);
            await EditorController.editorController.treeWidget2.select(columnController);
            columnController.view.parent.open();
            this.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }
    onCreateFormButtonClick = async e => {
        console.log('TableController.onCreateFormButtonClick');
        await this.createFormAction();
    }
    static async getView(view) {
        console.log('TableController.getView', view);
        return QForms.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : Helper.encodeObject({view : view})
        });
    }

    async createFormAction() {
        console.log('TableController.createFormAction');
        await EditorController.editorController.openModal(new NewFormFromTableController({
            tableController: this,
            onCreate: async values => {
                const formWizard = FormWizard.create({
                    model       : this.model,
                    pageName    : values.page,
                    className   : values.class,
                    formName    : values.name,
                    formCaption : values.caption,
                });
                const params = formWizard.getFormParams();
                // console.log('params:', params);
                const databaseController = this.parent;
                const applicationController = databaseController.parent;
                const pageLinkController = applicationController.findPageLink(values.page);
                if (!pageLinkController.pageController) {
                    await pageLinkController.loadPage();
                }
                const pageController = pageLinkController.pageController;
                // console.log('pageController:', pageController);
                const form = await pageController.model.newForm(params);
                // console.log('form:', form);
                const formController = pageController.createForm(form);
                await EditorController.editorController.treeWidget2.select(formController);
                formController.view.parent.open();
                pageLinkController.view.rerender();
                EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }
    async delete() {
        console.log('TableController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeTable2(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return TableView;
    }

}
