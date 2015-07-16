'use strict';

QForms.inherit(DatabaseController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseController(model, item, applicationController) {
    DatabaseController.super_.call(this, model);
    this.item                  = item;
    this.applicationController = applicationController;
    this.paramsItem            = null;
    this.treeTables            = null;
    this.$divTableInfo         = null;
    this.tableView             = null;
    this.tableInfo             = null;
    this.$btnCreateForm        = null;
    this.tables                = null;
    this.tableName             = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.createTree = function() {
    // params
    this.paramsItem = this.item.addItem('Params');
    if (this.model.data.params) {
        for (var name in this.model.data.params) {
            var paramData = this.model.data.params[name];
            this.addParamItem(paramData);
        };
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.addParamItem = function(paramData) {
    var caption = ParamController.prototype.getCaption(paramData);
    var paramItem = this.paramsItem.addItem(caption);
    var param = new Param(paramData, this.model);
    paramItem.ctrl = new ParamController(param, paramItem);
    return paramItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.getActions = function() {
    return [
        {'action':'newParam','caption':'New Param'},
        //{'action':'','caption':'-'},
        {'action':'delete','caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.doAction = function(action) {
    switch (action) {
        case 'newParam':
            this.actionNewParam();
            break;
        case 'delete':
            this.delete();
            break;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.actionNewParam = function() {
    var self = this;
    Param.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var paramName = $("#myModal input[id='paramName']").val();
            self.model.newParam(paramName, function(paramData) {
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
    var name = this.model.data['@attributes'].name;
    var self = this;
    this.model.getView('DatabaseView/DatabaseView.html', function(result) {
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
    this.tables = data.tables;
    this.tableView = data.tableView;
    this.treeTables = TreeWidget_createObject($div.find('.tcTables').get(0));
    this.$divTableInfo = $div.find('.divTableInfo');
    this.treeTables.eventSelect.subscribe(this, 'onTableSelect');
    for (var i=0;i<data.tables.length;i++) {
        var row = data.tables[i];
        this.treeTables.addItem(row[0]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.onTableSelect = function(e) {
    var self = this;
    this.tableName = e.item.caption;
    this.model.getTableInfo(this.tableName, function(data) {
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
    this.model.getView('newForm.ejs', function(result) {
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
            var formPage = $("#modal select[id='formPage']").val();
            var formClass = $("#modal select[id='formClass']").val();
            var formName = $("#modal input[id='formName']").val();
            var formCaption = $("#modal input[id='formCaption']").val();
            var pageItem = self.applicationController.pageItems[formPage];
            var formWizard = new FormWizard({
                    pageName:formPage,
                    className:formClass,
                    formName:formName,
                    formCaption:formCaption,
                    databaseName:self.model.data['@attributes'].name,
                    tableName:self.tableName,
                    tableColumns:self.tableInfo
                }
            );
            var todo = function() {
                var params = formWizard.getFormParams();
                pageItem.ctrl.model.newForm(params, function(formData) {
                    pageItem.ctrl.addFormItem(formData).select();
                    $('#modal').modal('hide');
                });
            };
            if (pageItem.ctrl instanceof PageLinkController) {
                self.applicationController.editorController.pageLinkToPage(pageItem, todo);
            } else {
                todo();
            }
        });
        $('#modal').modal('show');
        $("#modal input[id='formPage']").focus();
    });
};