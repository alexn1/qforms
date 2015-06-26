'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(name, parent, data) {
    this.name          = name;
    this.page          = parent;
    this.data          = data;
    this.parent        = parent;
    this.dataSource    = null;
    this.changed       = false;
    this.dataSources   = {};
    this.fields        = {};
    this.controls      = {};
    //this.eventHandlers = {};
    // event
    this.eventChanged  = new QForms.Event(this);
    this.eventUpdated  = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.init = function() {
    // dataSources
    for (var dsName in this.data.dataSources) {
        this.dataSources[dsName] = new DataSource(dsName,this,this.data.dataSources[dsName]);
        this.dataSources[dsName].init();
    }
    // fields
    for (var name in this.data.fields) {
        var field = this.data.fields[name];
        this.fields[name] = eval("new {class}(name,this,field)".replace("{class}",field.class));
        this.fields[name].init();
    }
    // controls
    for (var name in this.data.controls) {
        var data = this.data.controls[name];
        this.controls[name] = eval("new {class}(data,this)".replace("{class}",data.class));
        this.controls[name].init();
    }
    /*
    // eventHandlers
    for (var name in this.data.eventHandlers) {
        this.eventHandlers[name] = new EventHandler(this,this.data.eventHandlers[name]);
        this.eventHandlers[name].init();
    }
    */
    this.dataSource = this.dataSources["default"];
    this.dataSource.eventChanged.subscribe(this,"onDataSourceChanged");
    this.dataSource.eventUpdated.subscribe(this,"onDataSourceUpdated");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.deinit = function() {
    //console.log('Form.prototype.deinit: ' + this.name);
    this.dataSource.eventChanged.unsubscribe(this,"onDataSourceChanged");
    this.dataSource.eventUpdated.unsubscribe(this,"onDataSourceUpdated");
    for (var dsName in this.dataSources) {
        this.dataSources[dsName].deinit();
    }
    for (var name in this.fields) {
        this.fields[name].deinit();
    }
    for (var name in this.controls) {
        this.controls[name].deinit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.defaultValuesToRow = function(row) {
    for (var name in this.fields) {
        var field = this.fields[name];
        if (field.data.column !== undefined) {
            row[field.data.column] = field.getDefaultValue();
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceChanged = function(eventArgs) {
    var dataSource = eventArgs.object;
    if (dataSource.name === "default") {
        this.changed = true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceUpdated = function(eventArgs) {
    var dataSource = eventArgs.object;
    if (dataSource.name === "default") {
        this.changed = false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.update = function() {
    var self = this;
    // during new row creation, set row key to page if is not opened yet
    this.dataSources["default"].update(function(newKey) {
        if (!self.page.deinited) self.page.setKey(newKey);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.refill = function() {
    this.dataSources["default"].refill(this.page.params);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.executeAction = function(action,args) {
    action.exec(args,{"form":this});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.handleEvent = function(event,args) {
    //console.log(event);
    if (this.eventHandlers && this.eventHandlers[event]) {
        this.eventHandlers[event].handleEvent(args);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getExpValue = function(exp) {
    //console.log(exp);
    var value = exp;
    if (value === "CurrentDate()") {
        value = QForms.currentDate();
    } else if (value === "CurrentTime()") {
        value = QForms.currentTime();
    } else if (value.substr(0,1) === "@") {
        var name = value.substr(1,value.length-1);
        var arr = name.split(".");
        if (arr[0] === "this") arr[0] = this.page.name;
        if (arr[1] === "this") arr[1] = this.name;
        name = arr.join(".");
        if (this.page.params[name] !== undefined) {
            value = this.page.params[name];
        }
    } else if (value === '') {
        value = null;
    }
    return value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.openPage = function(params) {
    this.page.openPage(params);
};