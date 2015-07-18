'use strict';

QForms.inherit(DataSourceController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(model, item) {
    DataSourceController.super_.call(this, model);
    this.item                 = item;
    this.itemKeys             = null;
    this.itemParentKeyColumns = null;
    this.$view                = null;
    this.cmQuery              = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.createTree = function() {
    // keys
    this.itemKeys = this.item.addItem('Key Columns');
    if (this.model.data.keyColumns)
    for (var name in this.model.data.keyColumns) {
        var keyColumnData = this.model.data.keyColumns[name];
        this.addKeyColumn(keyColumnData);
    };

    // parent key columns
    this.itemParentKeyColumns = this.item.addItem('Parent Key Columns');
    if (this.model.data.parentKeyColumns)
    for (var name in this.model.data.parentKeyColumns) {
        var pkcData = this.model.data.parentKeyColumns[name];
        this.addParentKeyColumn(pkcData);
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addKeyColumn = function(itemData) {
    var caption = KeyColumnController.prototype.getCaption(itemData);
    var keyColumnItem = this.itemKeys.addItem(caption);
    var keyColumn = new KeyColumn(itemData, this.model);
    keyColumnItem.ctrl = new KeyColumnController(keyColumn, keyColumnItem);
    return keyColumnItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addParentKeyColumn = function(pkcData) {
    var caption = ParentKeyColumnController.prototype.getCaption(pkcData);
    var itemParentKeyColumn = this.itemParentKeyColumns.addItem(caption);
    var parentKeyColumn = new ParentKeyColumn(pkcData, this.model);
    itemParentKeyColumn.ctrl = new ParentKeyColumnController(parentKeyColumn, itemParentKeyColumn);
    return itemParentKeyColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getActions = function() {
    return [
        {
            'action':'newItem',
            'caption':'New Key Column'
        },
        {
            'action':'newParentKeyColumn',
            'caption':'New Parent Key Column'
        },
        {'action':'','caption':'-'},
        {'action':'moveUp','caption':'Move Up'},
        {'action':'moveDown','caption':'Move Down'},
        {
            'action':'',
            'caption':'-'
        },
        {
            'action':'delete',
            'caption':'Delete'
        }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.doAction = function(action) {
    var self = this;
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
            this.model.moveUp(function(data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            this.model.moveDown(function(data) {
                self.item.move(1);
            });
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.actionNewKeyColumn = function() {
    var self = this;
    KeyColumn.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var itemName = $("#myModal input[id='itemName']").val();
            self.model.newKeyColumn(itemName, function(itemData) {
                self.addKeyColumn(itemData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='itemName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.actionNewParentKeyColumn = function() {
    var self = this;
    ParentKeyColumn.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var pkcName = $("#myModal input[id='pkcName']").val();
            self.model.newParentKeyColumn(pkcName, function(parentKeyColumnData) {
                self.addParentKeyColumn(parentKeyColumnData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='pkcName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getPropList = function() {
    var progList = {
        list   : {},
        options: {}
    };

    // list
    for (var name in this.model.data['@attributes']) {
        if (name !== 'query' && name !== 'countQuery') {
            progList.list[name] = this.model.data['@attributes'][name];
        }
    }

    // options
    progList.options['insertNewKey']         = ['true', 'false'];
    progList.options['dumpFirstRowToParams'] = ['true', 'false'];
    return progList;
};



////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.createTab = function(docs) {
    var self = this;
    var name = this.model.getFullName();
    this.model.getView('QueryView.html', function(result) {
        self.$view        = $(result.view);
        self.data         = result.data;
        self.cmQuery      = null;
        self.cmCountQuery = null;
        self.cmBackendJs  = null;
        self.save         = 'query';

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
        self.tabWidget.eventTabShow.subscribe(self, 'tabWidget_TabShow');

        // buttons
        self.$view.find('.btnSave').click(function() {
            self.btnSave_Click(this);
        });
        self.$view.find('.btnQuery').click(function() {
            self.btnQuery_Click(this);
        });
        self.$view.find('.btnCountQuery').click(function() {
            self.btnCountQuery_Click(this);
        });
        self.$view.find('.btnSaveController').click(function() {
            self.btnSaveController_Click(this);
        });
        self.$view.find('.btnCreateController').click(function() {
            self.btnCreateController_Click(this);
        });

        // properties
        self.$view.find('.wndQuery').css('display', 'block');
        self.initCmQuery();

        if (self.data.backendJs) {
            self.showCustomController();
        } else {
            self.$view.find('.btnSaveController').css('display', 'none');
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmQuery = function() {
    this.cmQuery = CodeMirror.fromTextArea(this.$view.find('.cmQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    this.cmQuery.setOption('theme', 'cobalt');
    this.cmQuery.setValue(this.model.data['@attributes'].query);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmCountQuery = function() {
    this.cmCountQuery = CodeMirror.fromTextArea(this.$view.find('.cmCountQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    this.cmCountQuery.setOption('theme', 'cobalt');
    this.cmCountQuery.setValue(this.model.data['@attributes'].countQuery);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmBackendJs = function() {
    this.cmBackendJs = CodeMirror.fromTextArea(this.$view.find('.cmBackendJs').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    this.cmBackendJs.setOption('theme', 'cobalt');
    this.cmBackendJs.setValue(this.data.backendJs);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnSave_Click = function(ctrl) {
    switch (this.save) {
        case 'query':
            var value = this.cmQuery.getValue();
            this.model.setValue('query', value);
            break;
        case 'countQuery':
            var value = this.cmCountQuery.getValue();
            this.model.setValue('countQuery', value);
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnCountQuery_Click = function(ctrl) {
    this.$view.find('.wndCountQuery').css('display', 'block');
    this.$view.find('.wndQuery').css('display', 'none');
    if (this.cmCountQuery === null) {
        this.initCmCountQuery();
    }
    this.$view.find('.btnCountQuery').removeClass('btn-default');
    this.$view.find('.btnCountQuery').addClass('btn-primary');
    this.$view.find('.btnQuery').removeClass('btn-primary');
    this.$view.find('.btnQuery').addClass('btn-default');
    this.save = 'countQuery';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnQuery_Click = function(ctrl) {
    this.$view.find('.wndQuery').css('display', 'block');
    this.$view.find('.wndCountQuery').css('display', 'none');
    this.$view.find('.btnQuery').removeClass('btn-default');
    this.$view.find('.btnQuery').addClass('btn-primary');
    this.$view.find('.btnCountQuery').removeClass('btn-primary');
    this.$view.find('.btnCountQuery').addClass('btn-default');
    this.save = 'count';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.tabWidget_TabShow = function(ea) {
    var self = this;
    if ($(ea.tab).hasClass('tabController')) {
        if (self.data.backendJs) {
            if (this.cmBackendJs === null) {
                this.initCmBackendJs();
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.showCustomController = function() {
    this.$view.find('.wndBackendJs').css('display', 'block');
    if ($(this.tabWidget.activeTab).hasClass('tabController')) {
        this.initCmBackendJs();
    }
    this.$view.find('.btnCreateController').css('display', 'none');
    this.$view.find('.btnSaveController').css('display', 'inline-block');
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnSaveController_Click = function(ctrl) {
    var text  = this.cmBackendJs.getValue();
    this.model.saveController(text);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnCreateController_Click = function() {
    var self = this;
    this.model.createController(function(data) {
        self.data.backendJs = data.backendJs;
        self.showCustomController();
    });
};