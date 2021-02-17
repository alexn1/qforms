class DataSourceController extends DocumentController {

    constructor(model, parent) {
        super(model, parent);
        // this.itemKeys             = null;
        // this.itemParentKeyColumns = null;
        // this.$view                = null;
        this.keyColumns = [];

        // items for TreeWidget2
        this.items = [
            {
                getTitle: () => 'Key Columns',
                items: this.keyColumns
            }
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    init() {
        this.model.keyColumns.forEach(keyColumn => this.createKeyColumn(keyColumn));
    }

    createKeyColumn(model) {
        const keyColumn = new KeyColumnController(model, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumnController) {
        console.log('DataSourceController.removeKeyColumn', keyColumnController.getTitle());
        const i = this.keyColumns.indexOf(keyColumnController);
        if (i === -1) throw new Error('no such keyColumnController');
        this.keyColumns.splice(i, 1);
    }

    /*addKeyColumn(keyColumn) {
        const keyColumnItem = this.itemKeys.addItem(keyColumn.model.getName());
        keyColumnItem.ctrl = keyColumn;
        return keyColumnItem;
    }*/

    /*addParentKeyColumn(parentKeyColumn) {
        const itemParentKeyColumn = this.itemParentKeyColumns.addItem(parentKeyColumn.model.getName());
        itemParentKeyColumn.ctrl = parentKeyColumn;
        return itemParentKeyColumn;
    }*/

    getActions() {
        return [
            {
                'action' : 'newItem',
                'caption': 'New Key Column'
            },
            {
                'action' : 'newParentKeyColumn',
                'caption': 'New Parent Key Column'
            },
            {'action':        '', 'caption':         '-'},
            {'action':  'moveUp', 'caption':   'Move Up'},
            {'action':'moveDown', 'caption': 'Move Down'},
            {
                'action' : '',
                'caption': '-'
            },
            {
                'action' : 'delete',
                'caption': 'Delete'
            }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newItem':
                this.actionNewKeyColumn();
                break;
            case 'newParentKeyColumn':
                this.actionNewParentKeyColumn();
                break;
            case 'delete':
                this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.item.move(-1);
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.item.move(1);
                break;
        }
    }

    async actionNewKeyColumn() {
        const result = await KeyColumnController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(() => {
            const itemName = $("#myModal input[id='itemName']").val();
            this.model.newKeyColumn(itemName).then((itemData) => {
                this.addKeyColumn(itemData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='itemName']").focus();
    }

    /*async actionNewParentKeyColumn() {
        const result = await ParentKeyColumnController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(() => {
            const pkcName = $("#myModal input[id='pkcName']").val();
            this.model.newParentKeyColumn(pkcName).then((parentKeyColumnData) => {
                this.addParentKeyColumn(parentKeyColumnData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='pkcName']").focus();
    }*/

    getPropList() {
        const propList = {
            list   : {},
            options: {}
        };

        // list
        for (const name in this.model.data['@attributes']) {
            if (!['countQuery', 'singleQuery', 'multipleQuery'].includes(name)) {
                propList.list[name] = this.model.data['@attributes'][name];
            }
        }

        // options
        // propList.options['insertNewKey']         = ['true', 'false'];
        // propList.options['dumpFirstRowToParams'] = ['true', 'false'];
        return propList;
    }

    async createTab(docs) {
        /*console.log('DataSourceController.createTab', this.model.getFullName());
        const name = this.model.getFullName();
        const result = await this.model.getView('QueryView.ejs');
        const html = QForms.render(result.view, {model: this.model});
        this.$view        = $(html);
        this.data         = result.data;
        this.cmCountQuery = null;
        this.cmSingleQuery = null;
        this.cmMultipleQuery = null;
        this.cmBackendJs  = null;
        this.save         = 'singleQuery';

        // tab
        this.tab = docs.createTab(this.$view.get(0), name, (tab) => {
            tab.ctrl.tab = undefined;
        });
        this.tab.ctrl = this;
        docs.selectTab(this.tab);

        // prop/backend tab
        this.$view.children('.TabWidget').attr('id', '{name}_TabWidget'.replace('{name}', name));
        this.tabWidget = new TabWidget(this.$view.children('.TabWidget').get(0));
        this.tabWidget.init();
        this.tabWidget.on('tabShow', this.listeners.tabShow = this.tabWidget_TabShow.bind(this));

        // toolbar
        this.$view.find('.btnSave').click(() => {
            this.btnSave_Click();
        });
        this.$view.find('.btnCountQuery').click(() => {
            this.btnCountQuery_Click();
        });
        this.$view.find('.btnSingleQuery').click(() => {
            this.btnSingleQuery_Click();
        });
        this.$view.find('.btnMultipleQuery').click(() => {
            this.btnMultipleQuery_Click();
        });
        this.$view.find('.btnSaveController').click(() => {
            this.btnSaveController_Click();
        });
        this.$view.find('.btnCreateController').click(() => {
            this.btnCreateController_Click();
        });

        // properties
        if (this.model.getClassName() === 'SqlDataSource') {
            this.$view.find('.wndSingleQuery').css('display', 'block');
            this.initCmSingleQuery();
        }

        if (this.data.backendJs) {
            this.showCustomController();
        } else {
            this.$view.find('.btnSaveController').css('display', 'none');
        }*/
    }

    /*initCmCountQuery() {
        this.cmCountQuery = CodeMirror.fromTextArea(this.$view.find('.cmCountQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmCountQuery.setOption('theme', 'cobalt');
        this.cmCountQuery.setValue(this.model.data['@attributes'].countQuery);
    }*/

    /*initCmSingleQuery() {
        this.cmSingleQuery = CodeMirror.fromTextArea(this.$view.find('.cmSingleQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmSingleQuery.setOption('theme', 'cobalt');
        this.cmSingleQuery.setValue(this.model.data['@attributes'].singleQuery);
    }*/

    /*initCmMultipleQuery() {
        this.cmMultipleQuery = CodeMirror.fromTextArea(this.$view.find('.cmMultipleQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmMultipleQuery.setOption('theme', 'cobalt');
        this.cmMultipleQuery.setValue(this.model.data['@attributes'].multipleQuery);
    }*/

    /*initCmBackendJs() {
        this.cmBackendJs = CodeMirror.fromTextArea(this.$view.find('.cmBackendJs').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmBackendJs.setOption('theme', 'cobalt');
        this.cmBackendJs.setValue(this.data.backendJs);
    }*/

    /*btnSave_Click() {
        switch (this.save) {
            case 'countQuery': this.model.setValue('countQuery', this.cmCountQuery.getValue()); break;
            case 'singleQuery': this.model.setValue('singleQuery', this.cmSingleQuery.getValue()); break;
            case 'multipleQuery': this.model.setValue('multipleQuery', this.cmMultipleQuery.getValue()); break;
        }
    }*/

    /*btnCountQuery_Click() {
        console.log('btnCountQuery_Click');
        this.$view.find('.wndQuery').css('display', 'none');
        this.$view.find('.wndCountQuery').css('display', 'block');
        this.$view.find('.wndSingleQuery').css('display', 'none');
        this.$view.find('.wndMultipleQuery').css('display', 'none');
        if (this.cmCountQuery === null) {
            this.initCmCountQuery();
        }
        this.$view.find('.btnCountQuery').removeClass('btn-default');
        this.$view.find('.btnCountQuery').addClass('btn-primary');
        this.$view.find('.btnQuery').removeClass('btn-primary');
        this.$view.find('.btnQuery').addClass('btn-default');
        this.$view.find('.btnSingleQuery').removeClass('btn-primary');
        this.$view.find('.btnSingleQuery').addClass('btn-default');
        this.$view.find('.btnMultipleQuery').removeClass('btn-primary');
        this.$view.find('.btnMultipleQuery').addClass('btn-default');
        this.save = 'countQuery';
    }*/

    /*btnSingleQuery_Click() {
        console.log('btnSingleQuery_Click');
        this.$view.find('.wndQuery').css('display', 'none');
        this.$view.find('.wndCountQuery').css('display', 'none');
        this.$view.find('.wndSingleQuery').css('display', 'block');
        this.$view.find('.wndMultipleQuery').css('display', 'none');
        if (this.cmSingleQuery === null) {
            this.initCmSingleQuery();
        }
        this.$view.find('.btnQuery').removeClass('btn-primary');
        this.$view.find('.btnQuery').addClass('btn-default');
        this.$view.find('.btnCountQuery').removeClass('btn-primary');
        this.$view.find('.btnCountQuery').addClass('btn-default');
        this.$view.find('.btnSingleQuery').removeClass('btn-default');
        this.$view.find('.btnSingleQuery').addClass('btn-primary');
        this.$view.find('.btnMultipleQuery').removeClass('btn-primary');
        this.$view.find('.btnMultipleQuery').addClass('btn-default');
        this.save = 'singleQuery';
    }*/

    /*btnMultipleQuery_Click() {
        console.log('btnMultipleQuery_Click');
        this.$view.find('.wndQuery').css('display', 'none');
        this.$view.find('.wndCountQuery').css('display', 'none');
        this.$view.find('.wndSingleQuery').css('display', 'none');
        this.$view.find('.wndMultipleQuery').css('display', 'block');
        if (this.cmMultipleQuery === null) {
            this.initCmMultipleQuery();
        }
        this.$view.find('.btnQuery').removeClass('btn-primary');
        this.$view.find('.btnQuery').addClass('btn-default');
        this.$view.find('.btnCountQuery').removeClass('btn-primary');
        this.$view.find('.btnCountQuery').addClass('btn-default');
        this.$view.find('.btnSingleQuery').removeClass('btn-primary');
        this.$view.find('.btnSingleQuery').addClass('btn-default');
        this.$view.find('.btnMultipleQuery').removeClass('btn-default');
        this.$view.find('.btnMultipleQuery').addClass('btn-primary');
        this.save = 'multipleQuery';
    }*/

    /*tabWidget_TabShow(ea) {
        console.log('DataSourceController.tabWidget_TabShow');
        if ($(ea.tab).hasClass('tabController')) {
            if (this.data.backendJs) {
                if (this.cmBackendJs === null) {
                    this.initCmBackendJs();
                }
            }
        }
    }*/

    /*showCustomController() {
        this.$view.find('.wndBackendJs').css('display', 'block');
        if ($(this.tabWidget.activeTab).hasClass('tabController')) {
            this.initCmBackendJs();
        }
        this.$view.find('.btnCreateController').css('display', 'none');
        this.$view.find('.btnSaveController').css('display', 'inline-block');
    }*/

    /*btnSaveController_Click() {
        const text = this.cmBackendJs.getValue();
        this.model.saveController(text);
    }*/

    /*async btnCreateController_Click() {
        const data = await this.model.createController();
        this.data.backendJs = data.backendJs;
        this.showCustomController();
    }*/

    /*async delete() {
        console.log('DataSourceController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeDataSource(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }*/
    getDocumentViewClass() {
        if (this.model.getClassName() === 'SqlDataSource') return SqlDataSourceView;
        return super.getDocumentViewClass();
    }
    async onSaveClick(name, value) {
        // console.log('DataSourceController.onSaveClick', name, value);
        await this.model.setValue(name, value);
    }
}
