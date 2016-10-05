'use strict';

QForms.inherits(DataSourceController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(model, item) {
    var self = this;
    DataSourceController.super_.call(self, model);
    self.item                 = item;
    self.itemKeys             = null;
    self.itemParentKeyColumns = null;
    self.$view                = null;
    self.cmQuery              = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.createTree = function() {
    var self = this;
    // keys
    self.itemKeys = self.item.addItem('Key Columns');
    if (self.model.data.keyColumns)
    for (var name in self.model.data.keyColumns) {
        var keyColumnData = self.model.data.keyColumns[name];
        self.addKeyColumn(keyColumnData);
    }

    // parent key columns
    self.itemParentKeyColumns = self.item.addItem('Parent Key Columns');
    if (self.model.data.parentKeyColumns)
    for (var name in self.model.data.parentKeyColumns) {
        var pkcData = self.model.data.parentKeyColumns[name];
        self.addParentKeyColumn(pkcData);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addKeyColumn = function(itemData) {
    var self = this;
    var caption = KeyColumnController.prototype.getCaption(itemData);
    var keyColumnItem = self.itemKeys.addItem(caption);
    var keyColumn = new KeyColumn(itemData, self.model);
    keyColumnItem.ctrl = new KeyColumnController(keyColumn, keyColumnItem);
    return keyColumnItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addParentKeyColumn = function(pkcData) {
    var self = this;
    var caption = ParentKeyColumnController.prototype.getCaption(pkcData);
    var itemParentKeyColumn = self.itemParentKeyColumns.addItem(caption);
    var parentKeyColumn = new ParentKeyColumn(pkcData, self.model);
    itemParentKeyColumn.ctrl = new ParentKeyColumnController(parentKeyColumn, itemParentKeyColumn);
    return itemParentKeyColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getActions = function() {
    var self = this;
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newItem':
            self.actionNewKeyColumn();
            break;
        case 'newParentKeyColumn':
            self.actionNewParentKeyColumn();
            break;
        case 'delete':
            self.delete();
            break;
        case 'moveUp':
            self.model.moveUp2().then(function (data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            self.model.moveDown2().then(function (data) {
                self.item.move(1);
            });
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.actionNewKeyColumn = function() {
    var self = this;
    KeyColumn.prototype.getView2('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var itemName = $("#myModal input[id='itemName']").val();
            self.model.newKeyColumn2(itemName).then(function (itemData) {
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
    ParentKeyColumn.prototype.getView2('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var pkcName = $("#myModal input[id='pkcName']").val();
            self.model.newParentKeyColumn2(pkcName).then(function (parentKeyColumnData) {
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
    var self = this;
    var progList = {
        list   : {},
        options: {}
    };

    // list
    for (var name in self.model.data['@attributes']) {
        if (name !== 'query' && name !== 'countQuery') {
            progList.list[name] = self.model.data['@attributes'][name];
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
    var name = self.model.getFullName();
    self.model.getView2('QueryView.ejs').then(function (result) {
        var html = QForms.render(result.view, {
            model: self.model
        });
        self.$view        = $(html);
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
        //self.tabWidget.eventTabShow.subscribe(self, 'tabWidget_TabShow');
        self.tabWidget.on('tabShow', self.listeners.tabShow = self.tabWidget_TabShow.bind(self));

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
        if (self.model.data['@class'] === 'SqlDataSource') {
            self.$view.find('.wndQuery').css('display', 'block');
            self.initCmQuery();
        }

        if (self.data.backendJs) {
            self.showCustomController();
        } else {
            self.$view.find('.btnSaveController').css('display', 'none');
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmQuery = function() {
    var self = this;
    self.cmQuery = CodeMirror.fromTextArea(self.$view.find('.cmQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmQuery.setOption('theme', 'cobalt');
    self.cmQuery.setValue(self.model.data['@attributes'].query);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmCountQuery = function() {
    var self = this;
    self.cmCountQuery = CodeMirror.fromTextArea(self.$view.find('.cmCountQuery').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmCountQuery.setOption('theme', 'cobalt');
    self.cmCountQuery.setValue(self.model.data['@attributes'].countQuery);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.initCmBackendJs = function() {
    var self = this;
    self.cmBackendJs = CodeMirror.fromTextArea(self.$view.find('.cmBackendJs').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmBackendJs.setOption('theme', 'cobalt');
    self.cmBackendJs.setValue(self.data.backendJs);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnSave_Click = function(ctrl) {
    var self = this;
    switch (self.save) {
        case 'query':
            var value = self.cmQuery.getValue();
            self.model.setValue2('query', value);
            break;
        case 'countQuery':
            var value = self.cmCountQuery.getValue();
            self.model.setValue2('countQuery', value);
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnCountQuery_Click = function(ctrl) {
    var self = this;
    self.$view.find('.wndCountQuery').css('display', 'block');
    self.$view.find('.wndQuery').css('display', 'none');
    if (self.cmCountQuery === null) {
        self.initCmCountQuery();
    }
    self.$view.find('.btnCountQuery').removeClass('btn-default');
    self.$view.find('.btnCountQuery').addClass('btn-primary');
    self.$view.find('.btnQuery').removeClass('btn-primary');
    self.$view.find('.btnQuery').addClass('btn-default');
    self.save = 'countQuery';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnQuery_Click = function(ctrl) {
    var self = this;
    self.$view.find('.wndQuery').css('display', 'block');
    self.$view.find('.wndCountQuery').css('display', 'none');
    self.$view.find('.btnQuery').removeClass('btn-default');
    self.$view.find('.btnQuery').addClass('btn-primary');
    self.$view.find('.btnCountQuery').removeClass('btn-primary');
    self.$view.find('.btnCountQuery').addClass('btn-default');
    self.save = 'query';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.tabWidget_TabShow = function(ea) {
    var self = this;
    if ($(ea.tab).hasClass('tabController')) {
        if (self.data.backendJs) {
            if (self.cmBackendJs === null) {
                self.initCmBackendJs();
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.showCustomController = function() {
    var self = this;
    self.$view.find('.wndBackendJs').css('display', 'block');
    if ($(self.tabWidget.activeTab).hasClass('tabController')) {
        self.initCmBackendJs();
    }
    self.$view.find('.btnCreateController').css('display', 'none');
    self.$view.find('.btnSaveController').css('display', 'inline-block');
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnSaveController_Click = function(ctrl) {
    var self = this;
    var text = self.cmBackendJs.getValue();
    self.model.saveController2(text);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnCreateController_Click = function() {
    var self = this;
    self.model.createController2().then(function (data) {
        self.data.backendJs = data.backendJs;
        self.showCustomController();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getCaption = function(data) {
    var self = this;
    var caption = "<span class='blue'>{class}:</span>  <span class='green'>{name}</span>"
        .replace('{name}' , data['@attributes'].name)
        .replace('{class}', data['@class']);
    return caption;
};