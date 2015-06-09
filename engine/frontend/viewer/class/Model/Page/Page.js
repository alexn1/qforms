"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(args) {
    this.parent      = args.app;
    this.app         = args.app;
    this.data        = args.data;
    this.key         = args.key;
    this.newMode     = args.newMode === undefined ? false : args.newMode;
    this.parentPage  = args.parentPage;
    this.name        = args.data.name;
    this.dataSources = {};
    this.forms       = {};
    this.params      = (args.params !== undefined) ? args.params : {};
    // events
    this.eventShow    = new QForms.Event(this);
    this.eventHide    = new QForms.Event(this);
    this.eventChanged = new QForms.Event(this);
    this.eventUpdated = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.init = function() {
    // in new mode key is unknown so we can't track it in app pages list
    if (!this.newMode) {
        this.app.trackPage(this);
    }
    this.initParams();
    for (var dsName in this.data.dataSources) {
        this.dataSources[dsName] = new DataSource(dsName,this,this.data.dataSources[dsName]);
        this.dataSources[dsName].init();
    }
    for (var formName in this.data.forms) {
        var form = this.data.forms[formName];
        this.forms[formName] = eval("new " + form.class + "(formName,this,form)");
        this.forms[formName].init();
        this.forms[formName].eventChanged.subscribe(this,"onFormChanged");
        this.forms[formName].eventUpdated.subscribe(this,"onFormUpdated");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.deinit = function() {
    //console.log("deinit: " + this.name);
    if (this.deinited) return;
    for (var dsName in this.dataSources) this.dataSources[dsName].deinit();
    for (var formName in this.forms) {
        this.forms[formName].eventChanged.unsubscribe(this,"onFormChanged");
        this.forms[formName].eventUpdated.unsubscribe(this,"onFormUpdated");
        this.forms[formName].deinit();
    }
    this.app.untrackPage(this);
    this.deinited = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.initParams = function() {
    // params defined during data source filling on the server
    if (this.data.params !== undefined) for (var name in this.data.params) this.params[name] = this.data.params[name];
    // to make possible refer to parent page params
    if (this.parentPage !== undefined) for (var name in this.parentPage.params) this.params[name] = this.parentPage.params[name];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.update = function() {
    for (var formName in this.forms) this.forms[formName].update();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.save = function() {
    this.update();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveAndClose = function() {
    this.app.saveAndClosePage(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.close = function() {
    this.app.closePage(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.onFormChanged = function(ea) {
    var changedEventArgs = new QForms.EventArg(this);
    changedEventArgs.inner = ea;
    this.eventChanged.fire(changedEventArgs);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.onFormUpdated = function(ea) {
    var updatedEventArgs = new QForms.EventArg(this);
    updatedEventArgs.inner = ea;
    this.eventUpdated.fire(updatedEventArgs);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.setKey = function(key) {
    if (this.deinited) return;
    this.key = key;
    this.app.trackPage(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.openPage = function(params) {
    params.parentPage = this;
    this.app.openPage(params);
}