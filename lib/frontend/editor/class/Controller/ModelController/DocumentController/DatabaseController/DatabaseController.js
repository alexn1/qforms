'use strict';

QForms.inherits(DatabaseController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseController(model, item, applicationController) {
    var self = this;
    DatabaseController.super_.call(self, model);
    self.item                  = item;
    self.applicationController = applicationController;
    self.paramsItem            = null;
    self.treeTables            = null;
    self.$divTableInfo         = null;
    self.tableView             = null;
    self.tableInfo             = null;
    self.$btnCreateForm        = null;
    self.tables                = null;
    self.tableName             = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.createTree = function() {
    var self = this;
    // params
    self.paramsItem = self.item.addItem('Params');
    if (self.model.data.params) {
        for (var name in self.model.data.params) {
            var paramData = self.model.data.params[name];
            self.addParamItem(paramData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.addParamItem = function(paramData) {
    var self = this;
    var caption = ParamController.prototype.getCaption(paramData);
    var paramItem = self.paramsItem.addItem(caption);
    var param = new Param(paramData, self.model);
    paramItem.ctrl = new ParamController(param, paramItem);
    return paramItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.getActions = function() {
    var self = this;
    return [
        {'action':'newParam','caption':'New Param'},
        //{'action':'','caption':'-'},
        {'action':'delete','caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newParam':
            self.actionNewParam();
            break;
        case 'delete':
            self.delete();
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.actionNewParam = function() {
    var self = this;
    Param.prototype.getView('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var paramName = $("#myModal input[id='paramName']").val();
            self.model.newParam(paramName).then(function (paramData) {
                self.addParamItem(paramData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='paramName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.createTab = function(docs) {
    var self = this;
    var name = self.model.data['@attributes'].name;
    self.model.getView('DatabaseView/DatabaseView.html').then(function (result) {
        var $div = $(result.view);
        self.initView($div, result.data);
        self.tab = docs.createTab($div.get(0), name, function(tab) {
            tab.ctrl.tab = undefined;
        });
        self.tab.ctrl = self;
        docs.selectTab(self.tab);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.initView = function($div, data) {
    var self = this;
    self.tables        = data.tables;
    self.tableView     = data.tableView;
    self.treeTables    = TreeWidget_createObject($div.find('.tcTables').get(0));
    self.$divTableInfo = $div.find('.divTableInfo');
    //this.treeTables.eventSelect.subscribe(this, 'onTableSelect');
    self.treeTables.on('select', self.listeners.select = self.onTableSelect.bind(self));
    for (var i = 0; i < data.tables.length; i++) {
        var row = data.tables[i];
        self.treeTables.addItem(row[0]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.onTableSelect = function(e) {
    var self = this;
    self.tableName = e.item.caption;
    self.model.getTableInfo(self.tableName).then(function (data) {
        self.tableInfo = data.desc;
        var html = QForms.render(self.tableView, data);
        self.$divTableInfo.empty();
        self.$divTableInfo.append(html);
        self.$btnCreateForm = self.$divTableInfo.find('.btnCreateForm');
        self.$btnCreateForm.click(function() {
            self.createForm();
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.createForm = function() {
    var self = this;
    self.model.getView('newForm.ejs').then(function (result) {
        var html = QForms.render(result.view, {
            tables:self.tables,
            tableName:self.tableName,
            pages:Object.keys(self.applicationController.pageItems)
        });
        $(document.body).append(html);
        $('#modal').on('hidden.bs.modal', function(e) {
            $(this).remove();
        });
        $("#modal button[name='create']").click(function() {
            var formPage    = $("#modal select[id='formPage']").val();
            var formClass   = $("#modal select[id='formClass']").val();
            var formName    = $("#modal input[id='formName']").val();
            var formCaption = $("#modal input[id='formCaption']").val();
            var pageItem = self.applicationController.pageItems[formPage];
            var formWizard = new FormWizard({
                    pageName    : formPage,
                    className   : formClass,
                    formName    : formName,
                    formCaption : formCaption,
                    databaseName: self.model.data['@attributes'].name,
                    tableName   : self.tableName,
                    tableColumns: self.tableInfo
                }
            );
            /*
            var todo = function() {
                var params = formWizard.getFormParams();
                pageItem.ctrl.model.newForm(params, function(formData) {
                    pageItem.ctrl.addFormItem(formData).select();
                    $('#modal').modal('hide');
                });
            };
            if (pageItem.ctrl instanceof PageLinkController) {
                self.applicationController.editorController.pageLinkToPage(pageItem).then(todo);
            } else {
                todo();
            }
            */
            Promise.try(function () {
                if (pageItem.ctrl instanceof PageLinkController) {
                    return self.applicationController.editorController.pageLinkToPage(pageItem);
                }
            }).then(function () {
                var params = formWizard.getFormParams();
                pageItem.ctrl.model.newForm2(params).then(function (formData) {
                    pageItem.ctrl.addFormItem(formData).select();
                    $('#modal').modal('hide');
                });
            });
        });
        $('#modal').modal('show');
        $("#modal input[id='formPage']").focus();
    });
};