"use strict"

QForms.inherit(RowFormController,FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormController(model,view) {
    FormController.call(this,model,view);
    this.row = null;
    this.key = null;
    this.fieldViews = {};
    this.controls = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.init = function() {
    FormController.prototype.init.call(this);
    this.row = this.model.dataSource.getRowByIndex(0);
    this.key = this.model.dataSource.getRowKey(this.row);
    this.model.dataSource.eventRefillRow.subscribe(this,"onRefillRow");
    // row field views
    for (var name in this.model.fields) {
        var selector = ".{page}_{form}_{field}"
                .replace("{page}",this.model.page.id)
                .replace("{form}",this.model.name)
                .replace("{field}",name);
        var view = this.view.querySelector(selector);
        if (view === null) {
            continue;
        }
        this.fieldViews[name] = view;
    }
    // controls
    for (var name in this.model.controls) {
        var selector = ".{page}_{form}_{control}"
            .replace("{page}",this.model.page.id)
            .replace("{form}",this.model.name)
            .replace("{control}",name);
        if (this.view.querySelector(selector) === null) {
            continue;
        }
        var control = this.model.controls[name];
        this.controls[name] = eval("new {class}Controller(control)".replace("{class}",control.data.class));
        this.controls[name].init();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.deinit = function() {
    FormController.prototype.deinit.call(this);
    this.model.dataSource.eventRefillRow.unsubscribe(this,"onRefillRow");
    for (var name in this.fields) {
        this.fields[name].deinit();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.fill = function() {
    FormController.prototype.fill.call(this);
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            this.fields[name].fill(this.row,view);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.onRefillRow = function (ea) {
    //var key = ea.key,i = ea.i;
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            this.fields[name].refill(this.row,view);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.isValid = function() {
    if (this.model.changed === false) {
        return true;// если форма не изменена, то не делаем валидацию
    }
    var isValid = true;
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            if (!this.fields[name].isValid(view)) {
                isValid = false;
            }
        }
    }
    return isValid;
}