'use strict';

QForms.inherits(Form, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(name, parent, data) {
    var self = this;
    Form.super_.call(self);
    self.name          = name;
    self.page          = parent;
    self.data          = data;
    self.parent        = parent;
    self.dataSource    = null;
    self.changed       = false;
    self.dataSources   = {};
    self.fields        = {};
    self.controls      = {};

    // event
    //self.eventChanged   = new QForms.Event(this);
    //self.eventUpdated   = new QForms.Event(this);
    //self.eventRefilled  = new QForms.Event(this);
    //self.eventRefreshed = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.init = function() {
    var self = this;
    // dataSources
    for (var dsName in this.data.dataSources) {
        self.dataSources[dsName] = new DataSource(dsName, self, self.data.dataSources[dsName]);
        self.dataSources[dsName].init();
    }
    // fields
    for (var name in self.data.fields) {
        var field = self.data.fields[name];
        self.fields[name] = eval('new {class}(name, this, field)'.replace('{class}', field.class));
        self.fields[name].init();
    }
    // controls
    for (var name in self.data.controls) {
        var data = self.data.controls[name];
        self.controls[name] = eval('new {class}(data, this)'.replace('{class}', data.class));
        self.controls[name].init();
    }

    self.dataSource = self.dataSources.default;
    //self.dataSource.eventChanged.subscribe(self, 'onDataSourceChanged');
    self.dataSource.on('changed', self.listeners.changed = self.onDataSourceChanged.bind(self));
    //self.dataSource.eventUpdated.subscribe(self, 'onDataSourceUpdated');
    self.dataSource.on('updated', self.listeners.updated = self.onDataSourceUpdated.bind(self));
    //self.dataSource.eventInsert.subscribe(self, 'onDataSourceUpdated');
    self.dataSource.on('insert', self.listeners.insert = self.onDataSourceUpdated.bind(self));
    //self.dataSource.eventRefreshed.subscribe(self, 'onDataSourceRefreshed');
    self.dataSource.on('refreshed', self.listeners.refreshed = self.onDataSourceRefreshed.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.deinit = function() {
    var self = this;
    //console.log('Form.prototype.deinit: ' + this.name);
    //self.dataSource.eventChanged.unsubscribe(self, 'onDataSourceChanged');
    self.dataSource.off('changed', self.listeners.changed);
    //self.dataSource.eventUpdated.unsubscribe(self, 'onDataSourceUpdated');
    self.dataSource.off('updated', self.listeners.updated);
    //this.dataSource.eventInsert.unsubscribe(this, 'onDataSourceUpdated');
    self.dataSource.removeListener('insert', self.listeners.insert);
    //self.dataSource.eventRefreshed.unsubscribe(self, 'onDataSourceRefreshed');
    self.dataSource.off('refreshed', self.listeners.refreshed);

    for (var dsName in self.dataSources) {
        self.dataSources[dsName].deinit();
    }
    for (var name in self.fields) {
        self.fields[name].deinit();
    }
    for (var name in self.controls) {
        self.controls[name].deinit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.defaultValuesToRow = function(row) {
    for (var name in this.fields) {
        this.fields[name].fillDefaultValue(row);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceChanged = function(e) {
    var dataSource = e.source;
    if (dataSource.name === 'default') {
        this.changed = true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceUpdated = function(e) {
    var self = this;
    console.log('Form.prototype.onDataSourceUpdated', self.name);
    var dataSource = e.source;
    if (dataSource.name === 'default') {
        this.changed = false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.onDataSourceRefreshed = function(e) {
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
        //self.eventRefilled.fire({source: self});
        self.emit('refilled', {source: self});
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.executeAction = function(action, args) {
    action.exec(args, {'form':this});
};
*/

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
        //self.eventRefreshed.fire({source: self});
        self.emit('refreshed', {source: self});
    });
};