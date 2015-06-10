"use strict"

QForms.inherit(ParamController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParamController(model,item) {
    ModelController.call(this,model);
    this.item = item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.getActions = function() {
    return [
        {"action":"delete","caption":"Delete"}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.doAction = function(action) {
    switch (action) {
        case "delete":
            this.delete();
            break;
    }
};