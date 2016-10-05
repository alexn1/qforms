'use strict';

QForms.inherits(FieldController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(model, item) {
    var self = this;
    VisualController.call(self, model);
    self.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'changeClass', 'caption': 'Change Class'},
        {'action': ''           , 'caption': '-'           },
        {'action': 'moveUp'     , 'caption': 'Move Up'     },
        {'action': 'moveDown'   , 'caption': 'Move Down'   },
        {'action': ''           , 'caption': '-'           },
        {'action': 'delete'     , 'caption': 'Delete'      }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'changeClass':
            self.actionChangeClass();
            break;
        case 'delete':
            self.delete();
            break;
        case 'moveUp':
            self.model.moveUp(function(data) {
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
FieldController.prototype.actionChangeClass = function() {
    var self = this;
    Field.prototype.getView2('chnageClass.html').then(function (result) {
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
        $("#modal button[name='change']").click(function() {
            var fieldClass = $("#modal select[id='fieldClass']").val();
            if (self.model.data['@class'] !== fieldClass) {
                self.model.changeClass({class:fieldClass}, function(data) {
                    //console.log(data);
                    self.item.setCaption(FieldController.prototype.getCaption(self.model.data));
                    EditorController.editorController.fillGrid(self);
                });
            }
            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='fieldClass']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getCaption = function(fieldData) {
    var self = this;
    var caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
        .replace('{name}', fieldData['@attributes'].name)
        .replace('{class}', fieldData['@class']);
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getPropList = function() {
    var self = this;
    var list = self.model.data['@attributes'];
    var options = {};
    options['isVisible'] = ['true', 'false'];
    options['readOnly']  = ['true', 'false'];
    options['notNull']   = ['true', 'false'];
    options['align']     = ['left', 'right'];
    return {list: list, options: options};
};