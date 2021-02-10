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
            {'action':'newColumn','caption':'New Column'},
            {'action':'','caption':'-'},
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
        const self = this;
        const result = await ColumnController.getView('new.html');
        if (!result.view) throw new Error('actionNewColumn: no view');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const columnName = $("#myModal input[id='columnName']").val();
            self.model.newColumn(columnName).then((data) => {
                self.addColumnItem(data).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='columnName']").focus();
    }

    async createTab(docs) {
        const self = this;
        console.log('TableController.createTab');
        // const $div = $('<div style="height:100%;background-color:lightgoldenrodyellow;">sample tab</div>');
        const result = await TableController.getView('TableView/TableView.ejs');
        const html = QForms.render(result.view, {model: this.model});
        const $div = $(html);
        $div.find('.btnCreateForm').click(() => {
            self.createForm();
        });
        super.createTab(docs, $div.get(0));
    }

    static async getView(view) {
        console.log('TableController.getView', view);
        return QForms.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : Helper.encodeObject({view : view})
        });
    }

    async createForm() {
        console.log('TableController.createForm');
        const result = await TableController.getView('newForm.ejs');
        const databaseController = this.parent;
        const applicationController = databaseController.parent;
        const application = this.model.parent.parent;
        const html = QForms.render(result.view, {
            tableName: this.model.getName(),
            pages    : application.pageLinks.map(pageLink => pageLink.getName())
        });
        $(document.body).append(html);
        $('#modal').on('hidden.bs.modal', function(e) {
            $(this).remove();
        });
        $("#modal button[name='create']").click(() => {
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
            const pageItem = applicationController.pageItems[formPage];
            Promise.try(() => {
                if (pageItem.ctrl instanceof PageLinkController) {
                    return EditorController.editorController.pageLinkToPage(pageItem);
                }
            }).then(() => {
                const params = formWizard.getFormParams();
                console.log('params:', params);
                return pageItem.ctrl.model.newForm(params).then((formData) => {
                    pageItem.ctrl.addFormItem(formData).select();
                    $('#modal').modal('hide');
                });
            });
        });
        $('#modal').modal('show');
        $("#modal input[id='formPage']").focus();
    }
    async delete() {
        console.log('TableController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeTable2(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }

}
