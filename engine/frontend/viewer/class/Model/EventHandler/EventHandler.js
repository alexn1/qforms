"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function EventHandler(parent,data) {
    this.parent = parent;
    this.data = data;
    this.actions = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EventHandler.prototype.init = function() {
    for (var name in this.data.actions) {
        var action = this.data.actions[name];
        this.actions[name] = eval("new "+ action.class + "(this,action)");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EventHandler.prototype.handleEvent = function(args) {
    for (var name in this.actions) {
        this.getForm().executeAction(this.actions[name],args);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EventHandler.prototype.getForm = function() {
    if (this.parent instanceof Form) {
        return this.parent;
    } else  {
        return this.parent.form;
    }
}
