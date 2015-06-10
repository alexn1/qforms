"use strict"

QForms.inherit(ComboBoxFieldController,FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxFieldController(model,parent) {
    FieldController.call(this,model,parent);
    this.dataSource = null;
    this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.init = function() {
    FieldController.prototype.init.call(this);
    this.dataSource = this.getDataSource(this.model.data.dataSourceName);
    this.dataSource.eventRefillRow.subscribe(this,"onRefillRow");
    this.dataSource.eventRemoveRow.subscribe(this,"onRemoveRow");
    this.dataSource.eventNewRow.subscribe(this,"onNewRow");
    this.dataSource.eventMoveRow.subscribe(this,"onMoveRow");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.deinit = function() {
    FieldController.prototype.deinit.call(this);
    this.dataSource.eventRefillRow.unsubscribe(this,"onRefillRow");
    this.dataSource.eventRemoveRow.unsubscribe(this,"onRemoveRow");
    this.dataSource.eventNewRow.unsubscribe(this,"onNewRow");
    this.dataSource.eventMoveRow.unsubscribe(this,"onMoveRow");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.fill = function(row, view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            view.keyToOption = {};
            this._fillSelectOptions(view);
            ComboBoxFieldController.super_.prototype.fill.call(this, row, view);
            var self = this;
            $(view).children().change(function() {
                self.onChange(this);
            });
            break;
        case 'TableForm':
            ComboBoxFieldController.super_.prototype.fill.call(this, row, view);
            break;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.getValue = function (view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            return view.firstElementChild.value;
            break;
        case 'TableForm':
            return view.firstElementChild.value;
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.setValue = function (value, view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            view.firstElementChild.value = value;
            break;
        case 'TableForm':
            view.firstElementChild.value = value;
            if (value !== "" && value !== null) {
                var key = JSON.stringify([value]);
                var row = this.dataSource.getRow(key);
                view.firstElementChild.innerHTML = this.model.templateValue(row);
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._fillSelectOptions = function(view) {
    var nullOption = document.createElement("option");
    nullOption.selected = true;
    view.firstElementChild.appendChild(nullOption);
    var rows = this.dataSource.getRows();
    for (var i=0; i<rows.length; i++) {
        this.createOption(view, i);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.createOption = function(view,i) {
    var row =  this.dataSource.getRowByIndex(i);
    var key = this.dataSource.getRowKey(row);
    var option = document.createElement("option");
    option.innerHTML = this.model.templateValue(row);
    option.dbRow     = row;
    option.value     = JSON.parse(key)[0];
    QForms.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
    view.keyToOption[key] = option;
    return option;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRefillRow = function(ea) {
    var key = ea.key;
    //i = ea.i;
    for (var k in this.views) {
        var view = this.views[k];
        var option = view.keyToOption[key];
        this.refillRow(option);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.refillRow = function(option) {
    option.innerHTML = option.dbRow[this.model.data.displayColumn];
}
////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRemoveRow = function(ea) {
    var key = ea.key;
    for (var k in this.views) {
        var view = this.views[k];
        var option = view.keyToOption[key];
        view.firstElementChild.removeChild(option);
        delete view.keyToOption[key];
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onNewRow = function(ea) {
    //console.log("ComboBoxFieldController.prototype.onNewRow");
    //console.log(ea);
    this.createOption(ea.i);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onMoveRow = function(ea) {
    var newIndex = ea.newIndex;
    var oldIndex = ea.oldIndex;
    var key = ea.key;
    for (var k in this.views) {
        var view = this.views[k];
        var option = view.keyToOption[key];
        QForms.moveNode(view.firstElementChild,option,oldIndex,newIndex+1);
        this.refillRow(option);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.getDataSource = function(name) {
    if (this.model.form.dataSources[name]) {
        return this.model.form.dataSources[name];
    } else if (this.model.form.page.dataSources[name]) {
        return this.model.form.page.dataSources[name];
    } else if (this.model.form.page.app.dataSources[name]) {
        return this.model.form.page.app.dataSources[name];
    }
    return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onChange = function (el) {
    var view = el.parentNode;
    if (this.isValid(view)) {
        this.model.save(view.dbRow,this.getValue(view));
        // event
        var ea = new QForms.EventArg(this);
        ea.view = view;
        ea.row = view.dbRow;
        ea.el = el;
        ea.field = this;
        this.eventChange.fire(ea);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === "true") {
        isValid = view.firstElementChild.selectedOptions[0].value !== "";
    }
    if (!isValid) {
        view.firstElementChild.classList.add("error");
    } else {
        view.firstElementChild.classList.remove("error");
    }
    return isValid;
}