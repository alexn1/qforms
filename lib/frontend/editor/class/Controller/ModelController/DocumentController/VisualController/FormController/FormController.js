'use strict';

QForms.inherit(FormController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(model, item) {
    VisualController.call(this, model);
    this.item            = item;
    this.itemDataSources = null;
    this.itemFields      = null;
    this.itemControls    = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.createTree = function() {
    // dataSoruces
    this.itemDataSources = this.item.addItem('Data Sources');
    if (this.model.data.dataSources) {
        for (var name in this.model.data.dataSources) {
            var dataSourceData = this.model.data.dataSources[name];
            this.addDataSourceItem(dataSourceData);
        }
    }
    // fields
    this.itemFields = this.item.addItem('Fields');
    if (this.model.data.fields) {
        for (var name in this.model.data.fields) {
            var fieldData = this.model.data.fields[name];
            this.addFieldItem(fieldData);
        }
    }
    this.itemControls = this.item.addItem('Controls');
    if (this.model.data.controls) {
        for (var name in this.model.data.controls) {
            var controlData = this.model.data.controls[name];
            this.addControlItem(controlData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addDataSourceItem = function(dataSourceData) {
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var itemDataSource = this.itemDataSources.addItem(caption);
    var dataSource = new DataSource(dataSourceData, this.model);
    itemDataSource.ctrl = new DataSourceController(dataSource, itemDataSource);
    itemDataSource.ctrl.createTree();
    return itemDataSource;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addFieldItem = function(fieldData) {
    var caption = FieldController.prototype.getCaption(fieldData);
    var itemField = this.itemFields.addItem(caption);
    var field = new Field(fieldData, this.model);
    itemField.ctrl = new FieldController(field, itemField);
    return itemField;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addControlItem = function(controlData) {
    var caption = ControlController.prototype.getCaption(controlData);
    var itemControl = this.itemControls.addItem(caption);
    var control = new Control(controlData, this.model);
    itemControl.ctrl = new ControlController(control, itemControl);
    return itemControl;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getActions = function() {
    return [
        {'action':'newDataSource', 'caption':'New Data Source'},
        {'action':'newField', 'caption':'New Field'},
        {'action':'newControl', 'caption':'New Control'},
        {'action':'', 'caption':'-'},
        {'action':'moveUp', 'caption':'Move Up'},
        {'action':'moveDown', 'caption':'Move Down'},
        {'action':'', 'caption':'-'},
        {'action':'delete', 'caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newDataSource':
            this.actionNewDataSource();
            break;
        case 'newField':
            this.actionNewField();
            break;
        case 'newControl':
            this.actionNewControl();
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
FormController.prototype.actionNewDataSource = function() {
    var self = this;
    DataSource.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var dsName = $("#myModal input[id='dsName']").val();
            var dsClass = $("#myModal select[id='dsClass']").val();
            var params = {
                name:dsName,
                class:dsClass
            };
            self.model.newDataSource(params, function(dataSourceData) {
                self.addDataSourceItem(dataSourceData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.actionNewField = function() {
    var self = this;
    Field.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var name = $("#myModal input[id='name']").val();
            var caption = $("#myModal input[id='caption']").val();
            var fieldClass = $("#myModal select[id='fieldClass']").val();
            var params = {
                name:name,
                caption:caption,
                class:fieldClass
            };
            self.model.newField(params, function(fieldData) {
                self.addFieldItem(fieldData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.actionNewControl = function() {
    var self = this;
    Control.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#modal button[name='create']").click(function() {
            var params = {
                name:$("#modal input[id='name']").val(),
                class:$("#modal select[id='class']").val(),
                caption:$("#modal input[id='caption']").val()
            };
            self.model.newControl(params, function(controlData) {
                self.addControlItem(controlData).select();
            });
            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='name']").focus();
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getPropList = function() {
    return {
        list   : this.model.data['@attributes'],
        options: {
            editMethod: [
                'disabled',
                'table',
                'form'
            ],
            newRowMode: [
                'disabled',
                'oneclick',
                'editform',
                'createform',
                'oneclick editform',
                'oneclick createform'
            ],
            deleteRowMode: [
                'disabled',
                'enabled'
            ],
            refreshButton: [
                'true',
                'false'
            ]
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.setProperty = function(name, value) {
    var self = this;
    this.model.setValue(name, value, function() {
        if (name === 'name') {
            self.item.text.innerHTML = self.getCaption(self.model.data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getCaption = function(data) {
    var caption = "<span class='blue'>{class}:</span>  <span class='green'>{name}</span>"
        .replace('{name}' , data['@attributes'].name)
        .replace('{class}', data['@class']);
    return caption;
};