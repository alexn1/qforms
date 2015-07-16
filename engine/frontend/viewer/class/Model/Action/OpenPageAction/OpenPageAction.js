'use strict';

QForms.inherit(OpenPageAction,Action);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPageAction(parent,data) {
    Action.call(this,parent,data);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
OpenPageAction.prototype.exec = function(args,context) {
    context.form.openPage({
        name:this.data.pageName,
        newMode: this.data.rowMode === 'edit' ? false : true,
        key:args.key
    });
};