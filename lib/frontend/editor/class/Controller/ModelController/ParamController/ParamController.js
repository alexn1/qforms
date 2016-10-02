'use strict';

QForms.inherit(ParamController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParamController(model, item) {
    var self = this;
    ModelController.call(self, model);
    self.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'delete', 'caption': 'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'delete':
            self.delete();
            break;
    }
};