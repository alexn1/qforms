'use strict';

QForms.inherit(PageController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(model, item, pageLink) {
    VisualController.call(this, model);
    this.item = item;
    this.pageLink = pageLink;
    this.itemForms = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.createTree = function(callback) {
    // data sources
    this.dataSourcesItem = this.item.addItem('Data Sources');
    if (this.model.data.dataSources) {
        for (var name in this.model.data.dataSources) {
            var dataSourceData = this.model.data.dataSources[name];
            this.addDataSourceItem(dataSourceData);
        }
    }
    // forms
    this.itemForms = this.item.addItem('Forms');
    if (this.model.data.forms) {
        for (var name in this.model.data.forms) {
            var formData = this.model.data.forms[name];
            this.addFormItem(formData);
        };
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.addFormItem = function(formData) {
    var caption = FormController.prototype.getCaption(formData);
    var itemForm = this.itemForms.addItem(caption);
    var form = new Form(formData, this.model);
    itemForm.ctrl = new FormController(form, itemForm);
    itemForm.ctrl.createTree();
    return itemForm;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.addDataSourceItem = function(dataSourceData) {
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var dataSourceItem = this.dataSourcesItem.addItem(caption);
    var dataSource = new DataSource(dataSourceData, this.model);
    dataSourceItem.ctrl = new DataSourceController(dataSource, dataSourceItem, this);
    dataSourceItem.ctrl.createTree();
    return dataSourceItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getActions = function() {
    return [
        {'action':'newDataSource', 'caption':'New Data Source'},
        {'action':'newForm', 'caption':'New Form'},
        {'action':'', 'caption':'-'},
        {'action':'moveUp', 'caption':'Move Up'},
        {'action':'moveDown', 'caption':'Move Down'},
        {'action':'', 'caption':'-'},
        {'action':'delete', 'caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newForm':
            this.actionNewForm();
            break;
        case 'newDataSource':
            this.newDataSourceAction();
            break;
        case 'delete':
            this.delete();
            break;
        case 'moveUp':
            this.model.pageLink.moveUp(function(data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            this.model.pageLink.moveDown(function(data) {
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
    Form.prototype.getView('new.html', function(result) {
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
    DataSource.prototype.getView('new.html', function(result) {
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
    var propList = PageController.super_.prototype.getPropList.call(this);
    propList.list['menu']    = this.pageLink.data['@attributes']['menu'];
    propList.list['startup'] = this.pageLink.data['@attributes']['startup'];
    propList.options['startup'] = ['true', 'false'];
    return propList;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.setProperty = function(name, value) {
    if (name === 'startup' || name === 'menu') {
        this.pageLink.setValue(name, value);
    } else  {
        ModelController.prototype.setProperty.call(this, name, value);
    }
};

