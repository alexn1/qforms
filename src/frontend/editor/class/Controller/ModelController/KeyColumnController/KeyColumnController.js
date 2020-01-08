'use strict';

QForms.inherits(KeyColumnController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumnController(model, item) {
    var self = this;
    ModelController.call(self, model);
    self.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.getActions = function() {
    var self = this;
    return [
        {'action':'delete', 'caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'delete':
            self.delete();
            break;
    }
};