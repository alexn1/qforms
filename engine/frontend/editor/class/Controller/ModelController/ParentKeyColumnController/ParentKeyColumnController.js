'use strict';

QForms.inherit(ParentKeyColumnController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumnController(model,item) {
    ModelController.call(this,model);
    this.item = item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.getActions = function() {
    return [
        {'action':'delete','caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumnController.prototype.doAction = function(action) {
    switch (action) {
        case 'delete':
            this.delete();
            break;
    }
};