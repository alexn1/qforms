class DatabaseController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);

        // document view
        this.treeTables            = null;
        this.$divTableInfo         = null;
        this.tableView             = null;
        this.tables                = null;

        this.params  = [];
        this.tables2 = [];

        // items
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
        this.tableInfo = null;
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

    async createTab(docs) {
        console.log('DatabaseController.createTab');
        const result = await this.model.getView('DatabaseView/DatabaseView.html');
        const $div = $(result.view);
        this.initView($div, result.data);
        await super.createTab(docs, $div.get(0));
    }
    async createDocument() {
        const document = await super.createDocument();
        const result = await this.model.getView('DatabaseView/DatabaseView.html');
        // console.log('data:', result.data);
        document.tables = result.data.tables;
        return document;
    }
    initView($div, data) {
        this.tables        = data.tables;
        this.tableView     = data.tableView;
        this.treeTables    = TreeWidget_createObject($div.find('.tcTables').get(0));
        this.$divTableInfo = $div.find('.divTableInfo');
        this.treeTables.on('select', this.listeners.select = this.onTableSelect.bind(this));
        for (let i = 0; i < data.tables.length; i++) {
            const tableName = data.tables[i];
            this.treeTables.addItem(tableName);
        }
    }

    async onTableSelect(e) {
        console.log('DatabaseController.onTableSelect');
        const tableName = e.item.caption;
        const data = await this.model.getTableInfo(tableName);
        const html = QForms.render(this.tableView, data);
        this.$divTableInfo.empty();
        this.$divTableInfo.append(html);
        this.$divTableInfo.find('.btnCreateTable').click(() => {
            this.newTableAction(tableName, data.tableInfo);
        });
    }
    onTableSelect2 = async item => {
        console.log('DatabaseController.onTableSelect2', item.getTitle());
        const tableName = item.getTitle();
        const data = await this.model.getTableInfo(tableName);
        this.tableInfo = data.tableInfo;
        console.log('tableInfo:', this.tableInfo);
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
    getDocumentView() {
        return DatabaseView;
    }
}
