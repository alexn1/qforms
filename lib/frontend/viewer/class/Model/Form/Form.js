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

    // event
    this.eventChanged   = new QForms.Event(this);
    this.eventUpdated   = new QForms.Event(this);
    this.eventRefilled  = new QForms.Event(this);
    this.eventRefreshed = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.init = function() {
    // dataSources
    for (var dsName in this.data.dataSources) {
        this.dataSources[dsName] = new DataSource(dsName, this, this.data.dataSources[dsName]);
        this.dataSources[dsName].init();
    }
    // fields
    for (var name in this.data.fields) {
        var field = this.data.fields[name];
        this.fields[name] = eval('new {class}(name, this, field)'.replace('{class}', field.class));
        this.fields[name].init();
    }
    // controls
    for (var name in this.data.controls) {
        var data = this.data.controls[name];
        this.controls[name] = eval('new {class}(data, this)'.replace('{class}', data.class));
        this.controls[name].init();
    }

    this.dataSource = this.dataSources.default;
    this.dataSource.eventChanged.subscribe(this, 'onDataSourceChanged');
    this.dataSource.eventUpdated.subscribe(this, 'onDataSourceUpdated');
    this.dataSource.eventInsert.subscribe(this, 'onDataSourceUpdated');
    this.dataSource.eventRefreshed.subscribe(this, 'onDataSourceRefreshed');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.deinit = function() {
    //console.log('Form.prototype.deinit: ' + this.name);
    this.dataSource.eventChanged.unsubscribe(this, 'onDataSourceChanged');
    this.dataSource.eventUpdated.unsubscribe(this, 'onDataSourceUpdated');
    this.dataSource.eventInsert.unsubscribe(this, 'onDataSourceUpdated');
    this.dataSource.eventRefreshed.unsubscribe(this, 'onDataSourceRefreshed');

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
        this.fields[name].fillDefaultValue(row);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceChanged = function(eventArgs) {
    var dataSource = eventArgs.object;
    if (dataSource.name === 'default') {
        this.changed = true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceUpdated = function(eventArgs) {
    var self = this;
    console.log('Form.prototype.onDataSourceUpdated', self.name);
    var dataSource = eventArgs.object;
    if (dataSource.name === 'default') {
        this.changed = false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceRefreshed = function(eventArgs) {
    var self = this;
    console.log('Form.prototype.onDataSourceRefreshed', self.name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.update = function() {
    var self = this;
    // during new row creation, set row key to page if is not opened yet
    self.dataSources.default.update2().then(function (newKey) {
        if (!self.page.deinited) {
            self.page.setKey(newKey);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.refill = function() {
    var self = this;
    console.log('Form.prototype.refill', self.name);
    this.dataSources.default.refill2(this.page.params).then(function () {
        self.eventRefilled.fire(new QForms.EventArg(self));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.executeAction = function(action, args) {
    action.exec(args, {'form':this});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.openPage = function(args) {
    this.page.openPage(args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getFullName = function () {
    return [
        this.page.name,
        this.name
    ].join('.');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.refresh = function() {
    var self = this;
    console.log('Form.prototype.refresh', self.name);
    self.dataSource.refresh().then(function () {
        self.eventRefreshed.fire(new QForms.EventArg(self));
    });
};