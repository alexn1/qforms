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
            {
                'action': 'newColumn',
                'caption': 'New Column'
            },
            {
                'action': '',
                'caption': '-'
            },
            {
                'action': 'delete',
                'caption': 'Delete'
            },
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
        await EditorController.editorController.openModal(new NewFormFromTableController({onCreate: async values => {

        }}));
        /*
        const result = await TableController.getView('newForm.ejs');
        const databaseController = this.parent;
        const applicationController = databaseController.parent;
        const application = this.model.parent.parent;
        const html = QForms.render(result.view, {
            tableName: this.model.getName(),
            pages    : application.pageLinks.map(pageLink => pageLink.getName())
        });
        $(document.body).append(html);
        $('#modal').on('hidden.bs.modal', function(e) {$(this).remove();});
        $("#modal button[name='create']").click(async () => {
            const formPage    = $("#modal select[id='formPage']").val();
            const formClass   = $("#modal select[id='formClass']").val();
            const formName    = $("#modal input[id='formName']").val();
            const formCaption = $("#modal input[id='formCaption']").val();
            const formWizard = FormWizard.create({
                model       : this.model,
                pageName    : formPage,
                className   : formClass,
                formName    : formName,
                formCaption : formCaption,
            });
            const params = formWizard.getFormParams();
            // console.log('params:', params);

            const pageLinkController = applicationController.findPageLink(formPage);
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

            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='formPage']").focus();*/
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
