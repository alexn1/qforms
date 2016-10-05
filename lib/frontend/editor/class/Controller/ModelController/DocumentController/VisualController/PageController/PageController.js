'use strict';

QForms.inherits(PageController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(model, item, pageLink) {
    var self = this;
    VisualController.call(self, model);
    self.item      = item;
    self.pageLink  = pageLink;
    self.itemForms = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.createTree = function() {
    var self = this;
    // data sources
    self.dataSourcesItem = self.item.addItem('Data Sources');
    if (self.model.data.dataSources) {
        for (var name in self.model.data.dataSources) {
            var dataSourceData = self.model.data.dataSources[name];
            self.addDataSourceItem(dataSourceData);
        }
    }
    // forms
    self.itemForms = self.item.addItem('Forms');
    if (self.model.data.forms) {
        for (var name in self.model.data.forms) {
            var formData = self.model.data.forms[name];
            self.addFormItem(formData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.addFormItem = function(formData) {
    var self = this;
    var caption = FormController.prototype.getCaption(formData);
    var itemForm = self.itemForms.addItem(caption);
    var form = new Form(formData, self.model);
    itemForm.ctrl = new FormController(form, itemForm);
    itemForm.ctrl.createTree();
    return itemForm;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.addDataSourceItem = function(dataSourceData) {
    var self = this;
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var dataSourceItem = self.dataSourcesItem.addItem(caption);
    var dataSource = new DataSource(dataSourceData, self.model);
    dataSourceItem.ctrl = new DataSourceController(dataSource, dataSourceItem, self);
    dataSourceItem.ctrl.createTree();
    return dataSourceItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'newDataSource', 'caption': 'New Data Source'},
        {'action': 'newForm'      , 'caption': 'New Form'       },
        {'action': ''             , 'caption': '-'              },
        {'action': 'moveUp'       , 'caption': 'Move Up'        },
        {'action': 'moveDown'     , 'caption': 'Move Down'      },
        {'action': ''             , 'caption': '-'              },
        {'action': 'delete'       , 'caption': 'Delete'         }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newForm':
            self.actionNewForm();
            break;
        case 'newDataSource':
            self.newDataSourceAction();
            break;
        case 'delete':
            self.delete();
            break;
        case 'moveUp':
            self.model.pageLink.moveUp(function(data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            self.model.pageLink.moveDown(function(data) {
                self.item.move(1);
            });
            break;
        default:
            console.log(action);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.actionNewForm = function() {
    var self = this;
    Form.prototype.getView2('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var params = {
                name:$("#myModal input[id='name']").val(),
                caption:$("#myModal input[id='caption']").val(),
                class:$("#myModal select[id='formClass']").val()
            };
            self.model.newForm(params, function(formData) {
                self.addFormItem(formData).select();
                $('#myModal').modal('hide');
            });
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.newDataSourceAction = function() {
    var self = this;
    DataSource.prototype.getView2('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var dsName = $("#myModal input[id='dsName']").val();
            var dsClass = $("#myModal select[id='dsClass']").val();
            var params = {
                name :dsName,
                class:dsClass
            };
            DataSource.create(self.model, params, function(dataSourceData) {
                self.addDataSourceItem(dataSourceData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getPropList = function() {
    var self = this;
    var propList = PageController.super_.prototype.getPropList.call(self);
    propList.list['menu']    = self.pageLink.data['@attributes']['menu'];
    propList.list['startup'] = self.pageLink.data['@attributes']['startup'];
    propList.options['startup'] = ['true', 'false'];
    return propList;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.setProperty = function(name, value) {
    var self = this;
    if (name === 'startup' || name === 'menu') {
        self.pageLink.setValue2(name, value);
    } else  {
        ModelController.prototype.setProperty.call(self, name, value);
    }
};