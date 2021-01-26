class DataSourceController extends DocumentController {

    constructor(model, item) {
        super(model);
        this.item                 = item;
        this.itemKeys             = null;
        this.itemParentKeyColumns = null;
        this.$view                = null;
        this.cmQuery              = null;
    }

    createTree() {
        // keys
        this.itemKeys = this.item.addItem('Key Columns');
        if (this.model.data.keyColumns)
        for (const name in this.model.data.keyColumns) {
            const keyColumnData = this.model.data.keyColumns[name];
            this.addKeyColumn(keyColumnData, name);
        }

        // parent key columns
        this.itemParentKeyColumns = this.item.addItem('Parent Key Columns');
        if (this.model.data.parentKeyColumns)
        for (const name in this.model.data.parentKeyColumns) {
            const pkcData = this.model.data.parentKeyColumns[name];
            this.addParentKeyColumn(pkcData);
        }
    }

    addKeyColumn(itemData, name) {
        const caption = KeyColumnController.prototype.getCaption(itemData);
        const keyColumnItem = this.itemKeys.addItem(caption);
        const keyColumn = new KeyColumn(itemData, this.model);
        keyColumnItem.ctrl = new KeyColumnController(keyColumn, keyColumnItem);
        return keyColumnItem;
    }

    addParentKeyColumn(pkcData) {
        const caption = ParentKeyColumnController.prototype.getCaption(pkcData);
        const itemParentKeyColumn = this.itemParentKeyColumns.addItem(caption);
        const parentKeyColumn = new ParentKeyColumn(pkcData, this.model);
        itemParentKeyColumn.ctrl = new ParentKeyColumnController(parentKeyColumn, itemParentKeyColumn);
        return itemParentKeyColumn;
    }

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

    async doAction(action) {
        switch (action) {
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
        const self = this;
        const result = await KeyColumnController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const itemName = $("#myModal input[id='itemName']").val();
            self.model.newKeyColumn(itemName).then((itemData) => {
                self.addKeyColumn(itemData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='itemName']").focus();
    }

    async actionNewParentKeyColumn() {
        const self = this;
        const result = await ParentKeyColumnController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const pkcName = $("#myModal input[id='pkcName']").val();
            self.model.newParentKeyColumn(pkcName).then((parentKeyColumnData) => {
                self.addParentKeyColumn(parentKeyColumnData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='pkcName']").focus();
    }

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
        const self = this;
        const name = self.model.getFullName();
        const result = await self.model.getView('QueryView.ejs');
        const html = QForms.render(result.view, {model: self.model});
        self.$view        = $(html);
        self.data         = result.data;
        self.cmCountQuery = null;
        self.cmSingleQuery = null;
        self.cmMultipleQuery = null;
        self.cmBackendJs  = null;
        self.save         = 'singleQuery';

        // tab
        self.tab = docs.createTab(self.$view.get(0), name, function(tab) {
            tab.ctrl.tab = undefined;
        });
        self.tab.ctrl = self;
        docs.selectTab(self.tab);

        // prop/backend tab
        self.$view.children('.TabWidget').attr('id', '{name}_TabWidget'.replace('{name}', name));
        self.tabWidget = new TabWidget(self.$view.children('.TabWidget').get(0));
        self.tabWidget.init();
        self.tabWidget.on('tabShow', self.listeners.tabShow = self.tabWidget_TabShow.bind(self));

        // toolbar
        self.$view.find('.btnSave').click(function() {
            self.btnSave_Click(this);
        });
        self.$view.find('.btnCountQuery').click(function() {
            self.btnCountQuery_Click(this);
        });
        self.$view.find('.btnSingleQuery').click(function() {
            self.btnSingleQuery_Click(this);
        });
        self.$view.find('.btnMultipleQuery').click(function() {
            self.btnMultipleQuery_Click(this);
        });
        self.$view.find('.btnSaveController').click(function() {
            self.btnSaveController_Click(this);
        });
        self.$view.find('.btnCreateController').click(function() {
            self.btnCreateController_Click(this);
        });

        // properties
        if (self.model.data['@class'] === 'SqlDataSource') {
            self.$view.find('.wndSingleQuery').css('display', 'block');
            self.initCmSingleQuery();
        }

        if (self.data.backendJs) {
            self.showCustomController();
        } else {
            self.$view.find('.btnSaveController').css('display', 'none');
        }
    }

    initCmCountQuery() {
        this.cmCountQuery = CodeMirror.fromTextArea(this.$view.find('.cmCountQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmCountQuery.setOption('theme', 'cobalt');
        this.cmCountQuery.setValue(this.model.data['@attributes'].countQuery);
    }

    initCmSingleQuery() {
        this.cmSingleQuery = CodeMirror.fromTextArea(this.$view.find('.cmSingleQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmSingleQuery.setOption('theme', 'cobalt');
        this.cmSingleQuery.setValue(this.model.data['@attributes'].singleQuery);
    }

    initCmMultipleQuery() {
        this.cmMultipleQuery = CodeMirror.fromTextArea(this.$view.find('.cmMultipleQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmMultipleQuery.setOption('theme', 'cobalt');
        this.cmMultipleQuery.setValue(this.model.data['@attributes'].multipleQuery);
    }

    initCmBackendJs() {
        this.cmBackendJs = CodeMirror.fromTextArea(this.$view.find('.cmBackendJs').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmBackendJs.setOption('theme', 'cobalt');
        this.cmBackendJs.setValue(this.data.backendJs);
    }

    btnSave_Click(ctrl) {
        switch (this.save) {
            case 'countQuery': this.model.setValue('countQuery', this.cmCountQuery.getValue()); break;
            case 'singleQuery': this.model.setValue('singleQuery', this.cmSingleQuery.getValue()); break;
            case 'multipleQuery': this.model.setValue('multipleQuery', this.cmMultipleQuery.getValue()); break;
        }
    }

    btnCountQuery_Click(ctrl) {
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
    }

    btnSingleQuery_Click(ctrl) {
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
    }

    btnMultipleQuery_Click(ctrl) {
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
    }

    tabWidget_TabShow(ea) {
        console.log('DataSourceController.tabWidget_TabShow');
        if ($(ea.tab).hasClass('tabController')) {
            if (this.data.backendJs) {
                if (this.cmBackendJs === null) {
                    this.initCmBackendJs();
                }
            }
        }
    }

    showCustomController() {
        this.$view.find('.wndBackendJs').css('display', 'block');
        if ($(this.tabWidget.activeTab).hasClass('tabController')) {
            this.initCmBackendJs();
        }
        this.$view.find('.btnCreateController').css('display', 'none');
        this.$view.find('.btnSaveController').css('display', 'inline-block');
    }


    btnSaveController_Click(ctrl) {
        const text = this.cmBackendJs.getValue();
        this.model.saveController(text);
    }

    async btnCreateController_Click() {
        const data = await this.model.createController();
        this.data.backendJs = data.backendJs;
        this.showCustomController();
    }

    getCaption(data) {
        const caption = "<span class='blue'>{class}:</span>  <span class='green'>{name}</span>"
            .replace('{name}' , data['@attributes'].name)
            .replace('{class}', data['@class']);
        return caption;
    }

    getItem() {
        return {
            ctrl : this,
            title: `${this.model.getClassName()}: ${this.model.getName()}`,
            items: [
                {
                    title: 'Key Columns'
                }
            ]
        };
    }

}
