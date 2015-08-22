'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data) {
    this.data              = data;
    this.dataSources       = {};
    this.tables            = {};        // db table models for exchanging by update info between forms
    this.pages             = {};        // opened pages
    this.lastPageId        = 0;
    this.eventPageOpened   = new QForms.Event(this);
    this.eventPageClosed   = new QForms.Event(this);
    this.eventPageSelected = new QForms.Event(this);
    this.eventLogout       = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.init = function() {
    // dataSources
    for (var dsName in this.data.dataSources) {
        this.dataSources[dsName] = new DataSource(dsName, this, this.data.dataSources[dsName]);
        this.dataSources[dsName].init();
    }
    // pages
    for (var name in this.data.pages) {
        this.lastPageId++;
        var page = new Page({
            app : this,
            data: this.data.pages[name]
        });

        page.init();
        page.id = 'p' + this.lastPageId;

        // notify subscribers (view), that page is opened
        var e = new QForms.EventArg(this);
        e.page = page;
        e.track = false;
        e.select = false;
        this.eventPageOpened.fire(e);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.deinit = function() {
    for (var name in this.dataSources) {
        this.dataSources[name].deinit();
    }
    // TODO: add deinit on opened pages
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getTable = function(fullTableName) {
    if (!(fullTableName in this.tables)) {
        this.tables[fullTableName] = new QForms.Table(fullTableName);
    }
    return this.tables[fullTableName];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.openPage = function(args) {
    var name            = args.name;
    var newMode         = (args.newMode === undefined) ? false : args.newMode;
    var key             = args.key;
    var parentPage      = args.parentPage;
    var parentPageName  = parentPage ? parentPage.name : undefined;
    var keyParams       = {};
    var params          = (params === undefined) ? {} : params;
    //console.log('open ' + name + ' with key: ' + key);
    if (key !== undefined) {
        keyParams = QForms.keyToParams(key);
        for (var keyName in keyParams) {
            params[keyName] = keyParams[keyName];
        }
    }
    // if this page with this key is already opened, then show it
    var page = this.getPage(name, key);
    if (page !== null) {
        // eventPageSelected
        var ea = new QForms.EventArg(this);
        ea.page = page;
        this.eventPageSelected.fire(ea);
    } else {
        // if page doesn't exist, create it
        var args = {
            action        : 'page',
            page          : name,
            newMode       : newMode,
            parentPageName: parentPageName,
            params        : params
        };
        QForms.doHttpRequest(this, args, function(response) {
            this.lastPageId++;
            // to make possible refer to parent page params
            if (parentPage !== undefined) {
                for (var name in parentPage.params) {
                    if (keyParams[name] === undefined) {
                        params[name] = parentPage.params[name];
                    }
                }
            }
            var page = new Page({
                app           : this,
                data          : response.data,
                key           : key,
                newMode       : newMode,
                params        : params,
                parentPageName: parentPageName
            });
            page.init();
            page.id = 'p' + this.lastPageId;
            // notify subscribers (controller), that page has been opened
            var ea = new QForms.EventArg(this);
            ea.page    = page;
            ea.track   = parentPage !== undefined;
            ea.select  = true;
            ea.newMode = newMode;
            this.eventPageOpened.fire(ea);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveAndClosePage = function(page) {
    // eventPageClosed
    var ea = new QForms.EventArg(this);
    ea.page = page;
    this.eventPageClosed.fire(ea);
    // deinit page
    page.deinit();
    page.save();	// saving page after deinit not to receive update notifications
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.closePage = function(page) {
    // eventPageClosed
    var ea = new QForms.EventArg(this);
    ea.page = page;
    this.eventPageClosed.fire(ea);
    // page deinit
    page.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.trackPage = function(page) {
    var pageName = page.name;
    var pageKey = page.key;
    //console.log('trackPage: ');console.log(page);
    if (pageKey === undefined) {
        pageKey = '';
    }
    if (this.pages[pageName] === undefined) {
        this.pages[pageName] = {};
    }
    this.pages[pageName][pageKey] = page;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.untrackPage = function(page) {
    //console.log('untrackPage: ');console.log(page);
    var found = false;
    for (var name in this.pages) {
        for (var key in this.pages[name]) {
            if (this.pages[name][key] === page) {
                delete this.pages[name][key];
                found = true;
                break;
            }
        }
        if (found) break;
    }
    // if page has been opened and has not been saved, then it should not be here
    if (page.newMode && page.key === undefined) {
    } else {
        if (!found) {
            throw new Error('The page is not in the list.');
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getPage = function(pageName, pageKey) {
    if (pageKey === undefined) pageKey = '';
    if (this.pages[pageName] !== undefined && this.pages[pageName][pageKey] !== undefined) {
        return this.pages[pageName][pageKey];
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.logout = function() {
    var args = {
        'action':'logout'
    };
    QForms.doHttpRequest(this, args, function(data) {
        this.eventLogout.fire(new QForms.EventArg(this));
    });
};