"use strict"

QForms.inherit(ControlController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(model,item) {
    VisualController.call(this,model);
    this.item = item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getCaption = function(controlData) {
    var caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
        .replace("{name}",controlData["@attributes"].name)
        .replace("{class}",controlData["@class"]);
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getActions = function() {
    return [
        {"action":"delete","caption":"Delete"}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getPropList = function() {
    var list = this.model.data["@attributes"];
    var options = {};
    options["isVisible"] = ["true","false"];
    options["readOnly"] = ["true","false"];
    options["notNull"] = ["true","false"];
    return {list:list,options:options};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.doAction = function(action) {
    switch (action) {
        case "delete":
            this.delete();
            break;
    }
};