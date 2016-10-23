'use strict';

QForms.inherits(FormController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(model, item) {
    var self = this;
    VisualController.call(self, model);
    self.item            = item;
    self.itemDataSources = null;
    self.itemFields      = null;
    self.itemControls    = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.createTree = function() {
    var self = this;
    // dataSoruces
    this.itemDataSources = self.item.addItem('Data Sources');
    if (self.model.data.dataSources) {
        for (var name in self.model.data.dataSources) {
            var dataSourceData = self.model.data.dataSources[name];
            self.addDataSourceItem(dataSourceData);
        }
    }
    // fields
    self.itemFields = self.item.addItem('Fields');
    if (self.model.data.fields) {
        for (var name in self.model.data.fields) {
            var fieldData = self.model.data.fields[name];
            self.addFieldItem(fieldData);
        }
    }
    self.itemControls = self.item.addItem('Controls');
    if (self.model.data.controls) {
        for (var name in self.model.data.controls) {
            var controlData = self.model.data.controls[name];
            self.addControlItem(controlData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addDataSourceItem = function(dataSourceData) {
    var self = this;
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var itemDataSource = self.itemDataSources.addItem(caption);
    var dataSource = new DataSource(dataSourceData, self.model);
    itemDataSource.ctrl = new DataSourceController(dataSource, itemDataSource);
    itemDataSource.ctrl.createTree();
    return itemDataSource;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addFieldItem = function(fieldData) {
    var self = this;
    var caption = FieldController.prototype.getCaption(fieldData);
    var itemField = self.itemFields.addItem(caption);
    var field = new Field(fieldData, self.model);
    itemField.ctrl = new FieldController(field, itemField);
    return itemField;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.addControlItem = function(controlData) {
    var self = this;
    var caption = ControlController.prototype.getCaption(controlData);
    var itemControl = self.itemControls.addItem(caption);
    var control = new Control(controlData, self.model);
    itemControl.ctrl = new ControlController(control, itemControl);
    return itemControl;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'newDataSource', 'caption': 'New Data Source'},
        {'action': 'newField'     , 'caption': 'New Field'      },
        {'action': 'newControl'   , 'caption': 'New Control'    },
        {'action': ''             , 'caption': '-'              },
        {'action': 'moveUp'       , 'caption': 'Move Up'        },
        {'action': 'moveDown'     , 'caption': 'Move Down'      },
        {'action': ''             , 'caption': '-'              },
        {'action': 'delete'       , 'caption': 'Delete'         }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newDataSource':
            self.actionNewDataSource();
            break;
        case 'newField':
            self.actionNewField();
            break;
        case 'newControl':
            self.actionNewControl();
            break;
        case 'delete':
            self.delete();
            break;
        case 'moveUp':
            self.model.moveUp().then(function (data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            self.model.moveDown().then(function (data) {
                self.item.move(1);
            });
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.actionNewDataSource = function() {
    var self = this;
    DataSource.prototype.getView('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var dsName = $("#myModal input[id='dsName']").val();
            var dsClass = $("#myModal select[id='dsClass']").val();
            var params = {
                name:dsName,
                class:dsClass
            };
            self.model.newDataSource(params).then(function (dataSourceData) {
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
    Field.prototype.getView('new.html').then(function (result) {
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
            self.model.newField(params).then(function (fieldData) {
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
    Control.prototype.getView('new.html').then(function (result) {
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#modal button[name='create']").click(function() {
            var params = {
                name:$("#modal input[id='name']").val(),
                class:$("#modal select[id='class']").val(),
                caption:$("#modal input[id='caption']").val()
            };
            self.model.newControl(params).then(function (controlData) {
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
    var self = this;
    return {
        list   : self.model.data['@attributes'],
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
    self.model.setValue(name, value).then(function () {
        if (name === 'name') {
            self.item.text.innerHTML = self.getCaption(self.model.data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getCaption = function(data) {
    var self = this;
    var caption = "<span class='blue'>{class}:</span>  <span class='green'>{name}</span>"
        .replace('{name}' , data['@attributes'].name)
        .replace('{class}', data['@class']);
    return caption;
};