'use strict';

QForms.inherits(Page, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(args) {
    var self = this;
    Page.super_.call(self);
    self.data           = args.data;
    self.name           = self.data.name;
    self.parent         = args.app;
    self.app            = args.app;
    self.key            = args.key;
    self.parentPageName = args.parentPageName;
    self.newMode        = (args.newMode === undefined) ? false       : args.newMode;
    self.params         = (args.params  !== undefined) ? args.params : {};
    self.dataSources    = {};
    self.forms          = {};
    //self.eventShow      = new QForms.Event(self);
    //self.eventHide      = new QForms.Event(self);
    //self.eventChanged   = new QForms.Event(self);
    //self.eventUpdated   = new QForms.Event(self);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.init = function() {
    var self = this;
    // in new mode key is unknown so we can't track it in app pages list
    if (!self.newMode) {
        self.app.trackPage(self);
    }
    self.initParams();
    for (var dsName in self.data.dataSources) {
        self.dataSources[dsName] = new DataSource(dsName, self, self.data.dataSources[dsName]);
        self.dataSources[dsName].init();
    }
    for (var formName in self.data.forms) {
        var form = self.data.forms[formName];
        self.forms[formName] = eval('new ' + form.class + '(formName, this, form)');
        self.forms[formName].init();
        self.forms[formName].on('changed', self.listeners.changed = self.onFormChanged.bind(self));
        self.forms[formName].on('updated', self.listeners.updated = self.onFormUpdated.bind(self));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.deinit = function() {
    var self = this;
    //console.log('Page.prototype.deinit: ' + this.name);
    if (self.deinited) {
        return;
    }
    for (var dsName in self.dataSources) {
        self.dataSources[dsName].deinit();
    }
    for (var formName in self.forms) {
        self.forms[formName].off('changed', self.listeners.changed);
        self.forms[formName].off('updated', self.listeners.updated);
        self.forms[formName].deinit();
    }
    self.app.untrackPage(self);
    self.deinited = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.initParams = function() {
    var self = this;
    // params defined during data source filling on the server
    if (self.data.params !== undefined) {
        for (var name in self.data.params) {
            self.params[name] = self.data.params[name];
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.update = function() {
    var self = this;
    for (var name in self.forms) {
        self.forms[name].update();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.save = function() {
    var self = this;
    self.update();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveAndClose = function() {
    var self = this;
    self.app.saveAndClosePage(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.close = function() {
    var self = this;
    self.app.closePage(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.onFormChanged = function(ea) {
    var self = this;
    self.emit('changed', {source: self, inner: ea});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.onFormUpdated = function(ea) {
    var self = this;
    self.emit('updated', {source: self, inner: ea});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.setKey = function(key) {
    var self = this;
    if (self.deinited) {
        return;
    }
    self.key = key;
    self.app.trackPage(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.openPage = function(args) {
    var self = this;
    args.parentPage = self;
    return self.app.openPage(args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.isThereARowFormWithDefaultDs = function() {
    var self = this;
    var result = false;
    for (var formName in self.forms) {
        var form = self.forms[formName].data;
        if (form.class === 'RowForm') {
            if (form.dataSources['default']['table'] !== '') {
                result = true;
                break;
            }
        }
    }
    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.isThereARowForm = function() {
    var self = this;
    var result = false;
    for (var formName in self.forms) {
        var form = self.forms[formName].data;
        if (form.class === 'RowForm') {
            result = true;
            break;
        }
    }
    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.isThereATableFormOrTreeForm = function() {
    var self = this;
    var result = false;
    for (var formName in self.forms) {
        var form = self.forms[formName].data;
        if (form.class === 'TableForm' || form.class === 'TreeForm') {
            result = true;
            break;
        }
    }
    return result;
};