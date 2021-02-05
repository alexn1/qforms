class DatabaseController extends DocumentController {

    constructor(model, applicationController) {
        super(model);
        this.parent                = applicationController;
        this.applicationController = applicationController;
        this.item                  = null;
        this.paramsItem            = null;
        this.tablesItem            = null;

        // document view
        this.treeTables            = null;
        this.$divTableInfo         = null;
        this.tableView             = null;
        this.tableInfo             = null;
        this.tables                = null;
        this.tableName             = null;

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
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    init() {
        this.model.params.forEach(param => this.createParam(param));
        this.model.tables.forEach(table => this.createTable2(table));
    }

    createParam(model) {
        const param = new ParamController(model, null);
        param.init();
        this.params.push(param);
    }

    createTable2(model) {
        const table = new TableController(model, null, this);
        table.init();
        this.tables2.push(table);
    }

    /*createTree(item) {
        this.item = item;

        // params
        this.paramsItem = this.item.addItem('Params');
        this.params.forEach(param => this.addParamItem(param));

        // tables
        this.tablesItem = this.item.addItem('Tables');
        this.tables2.forEach(table => this.addTableItem(table));
    }*/

    /*addParamItem(param) {
        const item = this.paramsItem.addItem(param.model.getName());
        item.ctrl = param;
        return item;
    }*/

    /*addTableItem(table) {
        const item = this.tablesItem.addItem(table.model.getName());
        item.ctrl = table;
        item.ctrl.createTree(item);
        return item;
    }*/

    getActions() {
        return [
            {'action':'newParam','caption':'New Param'},
            {'action':'newTable','caption':'New Table'},
            {'action':'','caption':'-'},
            {'action':'delete','caption':'Delete'}
        ];
    }

    doAction(action) {
        switch (action) {
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
        super.createTab(docs, $div.get(0));
    }

    initView($div, data) {
        this.tables        = data.tables;
        this.tableView     = data.tableView;
        this.treeTables    = TreeWidget_createObject($div.find('.tcTables').get(0));
        this.$divTableInfo = $div.find('.divTableInfo');
        this.treeTables.on('select', this.listeners.select = this.onTableSelect.bind(this));
        for (let i = 0; i < data.tables.length; i++) {
            //const row = data.tables[i];
            //self.treeTables.addItem(row[0]);
            const tableName = data.tables[i];
            this.treeTables.addItem(tableName);
        }
    }

    async onTableSelect(e) {
        console.log('DatabaseController.onTableSelect');
        this.tableName = e.item.caption;
        const data = await this.model.getTableInfo(this.tableName);
        this.tableInfo = data.tableInfo;
        const html = QForms.render(this.tableView, data);
        this.$divTableInfo.empty();
        this.$divTableInfo.append(html);
        this.$divTableInfo.find('.btnCreateTable').click(() => {
            this.createTable();
        });
    }

    async createTable() {
        console.log('DatabaseController.createTable', this.tableInfo);
        const params = {
            name: this.tableName,
            columns: this.tableInfo.map(column => ({
                name    : column.name,
                caption : column.name,
                type    : column.type,
                dbType  : column.dbType,
                key     : column.key,
                auto    : column.auto,
                nullable: column.nullable,
            }))
        };
        const tableData = await this.model.newTable(params);
        this.addTableItem(tableData).select();
    }

    getCaption(data) {
        return `<span class='blue'>${data['@class']}:</span> <span class='green'>${data['@attributes'].name}</span>`;
    }

}
