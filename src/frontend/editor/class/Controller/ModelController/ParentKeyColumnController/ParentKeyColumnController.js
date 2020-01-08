'use strict';

QForms.inherits(ParentKeyColumnController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumnController(model, item) {
    var self = this;
    ModelController.call(self, model);
    self.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'delete', 'caption': 'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'delete':
            self.delete();
            break;
    }
};