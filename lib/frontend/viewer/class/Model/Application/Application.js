'use strict';

QForms.inherits(Application, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data) {
    var self = this;
    Application.super_.call(self);
    self.data              = data;
    self.name              = self.data.name;
    self.dataSources       = {};
    self.tables            = {};        // db table models for exchanging by update info between forms
    self.pages             = {};        // opened pages
    self.lastPageId        = 0;
    //self.eventPageOpened   = new QForms.Event(self);
    //self.eventPageClosed   = new QForms.Event(self);
    //self.eventPageSelected = new QForms.Event(self);
    //self.eventLogout       = new QForms.Event(self);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.init = function() {
    var self = this;
    // dataSources
    for (var dsName in self.data.dataSources) {
        self.dataSources[dsName] = new DataSource(dsName, self, self.data.dataSources[dsName]);
        self.dataSources[dsName].init();
    }
    // pages
    for (var name in self.data.pages) {
        self.lastPageId++;
        var page = new Page({
            app : self,
            data: self.data.pages[name]
        });

        page.init();
        page.id = 'p' + self.lastPageId;

        // notify subscribers (view), that page is opened
        self.emit('pageOpened', {source: self, page: page, track: false, select: false});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.deinit = function() {
    var self = this;
    for (var name in self.dataSources) {
        self.dataSources[name].deinit();
    }
    // TODO: add deinit on opened pages
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getTable = function(fullTableName) {
    var self = this;
    if (!(fullTableName in self.tables)) {
        var table = new EventEmitter();
            table.name = fullTableName;
        self.tables[fullTableName] = table;
    }
    return self.tables[fullTableName];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.openPage = function(args) {
    var self = this;
    console.log('Application.prototype.openPage', args.name);
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
    var page = self.getPage(name, key);
    if (page !== null) {
        // eventPageSelected
        self.emit('pageSelected', {source: self, page: page});
        return Promise.resolve();
    } else {
        // if page doesn't exist, create it
        var args = {
            action        : 'page',
            page          : name,
            newMode       : newMode,
            parentPageName: parentPageName,
            params        : params
        };
        return QForms.doHttpRequest(args).then(function (response) {
            console.log('response:', response);
            self.lastPageId++;
            // to make possible refer to parent page params
            if (parentPage !== undefined) {
                for (var name in parentPage.params) {
                    if (keyParams[name] === undefined) {
                        params[name] = parentPage.params[name];
                    }
                }
            }
            var page = new Page({
                app           : self,
                data          : response.data,
                key           : key,
                newMode       : newMode,
                params        : params,
                parentPageName: parentPageName
            });
            page.init();
            page.id = 'p' + self.lastPageId;
            // notify subscribers (controller), that page has been opened
            self.emit('pageOpened', {
                source : self,
                page   : page,
                track  : parentPage !== undefined,
                select : true,
                newMode: newMode
            });
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveAndClosePage = function(page) {
    var self = this;
    // eventPageClosed
    self.emit('pageClosed', {source: self, page: page});

    // deinit page
    page.deinit();
    page.save();	// saving page after deinit not to receive update notifications
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.closePage = function(page) {
    var self = this;
    // eventPageClosed
    self.emit('pageClosed', {source: self, page: page});

    // page deinit
    page.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.trackPage = function(page) {
    var self = this;
    var pageName = page.name;
    var pageKey = page.key;
    //console.log('trackPage: ');console.log(page);
    if (pageKey === undefined) {
        pageKey = '';
    }
    if (self.pages[pageName] === undefined) {
        self.pages[pageName] = {};
    }
    self.pages[pageName][pageKey] = page;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.untrackPage = function(page) {
    var self = this;
    //console.log('untrackPage: ');console.log(page);
    var found = false;
    for (var name in self.pages) {
        for (var key in self.pages[name]) {
            if (self.pages[name][key] === page) {
                delete self.pages[name][key];
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
    var self = this;
    if (pageKey === undefined) pageKey = '';
    if (self.pages[pageName] !== undefined && self.pages[pageName][pageKey] !== undefined) {
        return self.pages[pageName][pageKey];
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.logout = function() {
    var self = this;
    var args = {
        'action':'logout'
    };
    return QForms.doHttpRequest(args).then(function (data) {
        //self.eventLogout.fire({source: self});
        self.emit('logout', {source: self});
    });
};