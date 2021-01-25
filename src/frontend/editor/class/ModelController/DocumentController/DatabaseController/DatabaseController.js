class DatabaseController extends DocumentController {

    constructor(model, item, applicationController) {
        super(model);
        this.item                  = item;
        this.parent                = applicationController;
        this.applicationController = applicationController;
        this.paramsItem            = null;
        this.tablesItem            = null;

        // document view
        this.treeTables            = null;
        this.$divTableInfo         = null;
        this.tableView             = null;
        this.tableInfo             = null;
        this.tables                = null;
        this.tableName             = null;

        this.params = {};
        this.tables = {};
    }


    createTree() {
        // params
        this.paramsItem = this.item.addItem('Params');
        if (this.model.data.params) {
            for (const name in this.model.data.params) {
                const paramData = this.model.data.params[name];
                this.addParamItem(paramData, name);
            }
        }

        // tables
        this.tablesItem = this.item.addItem('Tables');
        if (this.model.data.tables) {
            for (const name in this.model.data.tables) {
                const tableData = this.model.data.tables[name];
                this.addTableItem(tableData);
            }
        }
    }

    addParamItem(data, name) {
        const caption = ParamController.prototype.getCaption(data);
        const item = this.paramsItem.addItem(caption);
        // const param = new Param(data, this.model);
        const param = this.model.params[name];
        this.params[name] = item.ctrl = new ParamController(param, item);
        return item;
    }

    addTableItem(data) {
        const caption = TableController.prototype.getCaption(data);
        const item = this.tablesItem.addItem(caption);
        const table = new Table(data, this.model);
        item.ctrl = new TableController(table, item, this);
        item.ctrl.createTree();
        return item;
    }

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

    getItem() {
        return {
            title: `${this.model.getClassName()}: ${this.model.getName()}`,
            items: [
                {title: 'Params'},
                {title: 'Tables'}
            ]
        };
    }

}
