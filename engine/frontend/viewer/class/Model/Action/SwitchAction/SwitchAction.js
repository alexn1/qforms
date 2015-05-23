"use strict"

QForms.inherit(SwitchAction,Action);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SwitchAction(parent,data) {
    Action.call(this,parent,data);
    this.cases = {};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
SwitchAction.prototype.exec = function(args,context) {
    var row = context.form.dataSource.getRow(args.key);
    var value = row[this.data.field] === null ? "" : row[this.data.field];
    for (var name in this.data.cases) {
        var _case =  this.data.cases[name];
        if (value === context.form.getExpValue(_case.value)) {
            for (var an in _case.actions) {
                var action = _case.actions[an];
                var a = eval("new "+ action.class + "(this,action)");
                a.exec(args,context);
            }
        }
    }
}