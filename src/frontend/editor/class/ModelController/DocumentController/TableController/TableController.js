class TableController extends DocumentController {

    constructor(model, item, parent) {
        super(model);
        this.item = item;
        this.parent = parent;
        this.columnsItem = null;
        this.columns = [];

        // items
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
        const column = new ColumnController(model, null);
        column.init();
        this.columns.push(column);
    }

    createTree(item) {
        if (item) this.item = item;
        this.columnsItem = this.item.addItem('Columns');
        this.columns.forEach(column => this.addColumnItem(column));
    }

    addColumnItem(column) {
        const item = this.columnsItem.addItem(column.model.getName());
        item.ctrl = column;
        return item;
    }

    getActions() {
        return [
            {'action':'newColumn','caption':'New Column'},
            {'action':'','caption':'-'},
            {'action': 'delete', 'caption': 'Delete'},
        ];
    }

    doAction(name) {
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
        const self = this;
        console.log('TableController.createForm');
        const result = await TableController.getView('newForm.ejs');
        const databaseController = self.parent;
        const applicationController = databaseController.parent;
        const html = QForms.render(result.view, {
            tableName :self.model.name,
            pages     :Object.keys(applicationController.pageItems)
        });
        $(document.body).append(html);
        $('#modal').on('hidden.bs.modal', function(e) {
            $(this).remove();
        });
        $("#modal button[name='create']").click(function() {
            const formPage    = $("#modal select[id='formPage']").val();
            const formClass   = $("#modal select[id='formClass']").val();
            const formName    = $("#modal input[id='formName']").val();
            const formCaption = $("#modal input[id='formCaption']").val();
            const formWizard = FormWizard.create({
                model       : self.model,
                pageName    : formPage,
                className   : formClass,
                formName    : formName,
                formCaption : formCaption,
            });
            const pageItem = applicationController.pageItems[formPage];
            Promise.try(() => {
                if (pageItem.ctrl instanceof PageLinkController) {
                    return applicationController.editorController.pageLinkToPage(pageItem);
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

    /*getItem() {
        return {
            ctrl : this,
            title: this.model.getName(),
            items: [
                {
                    title: 'Columns',
                    items: this.columns.map(column => column.getItem())
                }
            ]
        };
    }*/

}
