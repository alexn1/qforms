class DatabaseController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.tableName = null;
        this.tableInfo = null;
        this.params  = [];
        this.tables2 = [];
        this.items = [
            {
                getTitle: () => 'Params',
                items: this.params
            },
            {
                getTitle: () => 'Tables',
                items: this.tables2
            }
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    init() {
        this.model.params.forEach(param => this.createParam(param));
        this.model.tables.forEach(table => this.createTable2(table));
    }
    createParam(model) {
        const param = new ParamController(model, this);
        param.init();
        this.params.push(param);
        return param;
    }
    createTable2(model) {
        const table = new TableController(model, this);
        table.init();
        this.tables2.push(table);
        return table;
    }
    removeParam(paramController) {
        console.log('DatabaseController.removeParam', paramController.getTitle());
        const i = this.params.indexOf(paramController);
        if (i === -1) throw new Error('no such paramController');
        this.params.splice(i, 1);
    }
    removeTable2(tableController) {
        console.log('DatabaseController.removeTable2', tableController.getTitle());
        const i = this.tables2.indexOf(tableController);
        if (i === -1) throw new Error('no such tableController');
        this.tables2.splice(i, 1);
    }
    getActions() {
        return [
            {'action':'newParam','caption':'New Param'},
            {'action':'newTable','caption':'New Table'},
            {'action':'','caption':'-'},
            {'action':'delete','caption':'Delete'}
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'newParam':
                this.actionNewParam();
                break;
            case 'newTable':
                this.actionNewTable();
                break;
            case 'delete':
                this.delete();
                break;
        }
    }
    async actionNewParam() {
        const self = this;
        const result = await ParamController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const paramName = $("#myModal input[id='paramName']").val();
            self.model.newParam(paramName).then((paramData) => {
                self.addParamItem(paramData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='paramName']").focus();
    }
    actionNewTable() {
        const self = this;
        TableController.getView('new.html').then((result) => {
            if (!result.view) throw new Error('actionNewTable: no view');
            $(document.body).append(result.view);
            $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
            $("#myModal button[name='create']").click(function() {
                const tableName = $("#myModal input[id='tableName']").val();
                self.model.newTable({name: tableName}).then((tableData) => {
                    self.addTableItem(tableData).select();
                });
                $('#myModal').modal('hide');
            });
            $('#myModal').modal('show');
            $("#myModal input[id='tableName']").focus();
        });
    }
    async createDocument() {
        const document = await super.createDocument();
        const result = await this.model.getView('DatabaseView/DatabaseView.html');
        // console.log('data:', result.data);
        document.treeWidgetItems = result.data.tables.map(tableName => ({getTitle: () => tableName}))
        return document;
    }
    onTableSelect2 = async item => {
        console.log('DatabaseController.onTableSelect2', item.getTitle());
        const tableName = item.getTitle();
        this.tableName = tableName;
        const data = await this.model.getTableInfo(tableName);
        this.tableInfo = data.tableInfo;
        this.document.view.rerender();
        // console.log('tableInfo:', this.tableInfo);
    }
    onCreateTableClick = e => {
        console.log('DatabaseController.onCreateTableClick');
        this.newTableAction(this.tableName, this.tableInfo);
    }
    async newTableAction(tableName, tableInfo) {
        console.log('DatabaseController.newTableAction', tableName, tableInfo);
        const table = await this.model.newTable({
            name   : tableName,
            columns: tableInfo.map(column => ({
                name    : column.name,
                caption : column.name,
                type    : column.type,
                dbType  : column.dbType,
                key     : column.key,
                auto    : column.auto,
                nullable: column.nullable,
            }))
        });
        const tableController = this.createTable2(table);
        await EditorController.editorController.treeWidget2.select(tableController);
        tableController.view.parent.open();
        this.view.rerender();
        // EditorController.editorController.treeWidget2.scrollToSelected();
    }
    async delete() {
        console.log('DatabaseController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeDatabase(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return DatabaseView;
    }
}
