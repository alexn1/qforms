'use strict';

QForms.inherit(KeyColumnController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumnController(model,item) {
    ModelController.call(this,model);
    this.item = item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.getActions = function() {
    return [
        {'action':'delete','caption':'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumnController.prototype.doAction = function(action) {
    switch (action) {
        case 'delete':
            this.delete();
            break;
    }
};