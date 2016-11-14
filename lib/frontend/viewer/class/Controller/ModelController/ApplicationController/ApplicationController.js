'use strict';

QForms.inherits(ApplicationController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model, view) {
    var self = this;
    ApplicationController.super_.call(self, model);
    self.view  = view;
    self.appTC = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.create = function(model, view) {
    var customClassName   = '{app}Controller'.replace('{app}', model.name);
    var typeOfCustomClass = 'typeof({customClassName})'.replace('{customClassName}', customClassName);
    var custom            = 'new {customClassName}(model, view)'.replace('{customClassName}', customClassName);
    var general           = 'new {class}Controller(model, view)'.replace('{class}', model.data.class);
    var obj;
    if (model.data.js !== undefined) {
        if (eval(typeOfCustomClass) === 'function') {
            obj = eval(custom);
        } else {
            $.globalEval(model.data.js);
            obj = (eval(typeOfCustomClass) === 'function') ? eval(custom) : eval(general);
        }
    } else {
        obj = eval(general);
    }
    return obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.init = function() {
    var self = this;

    // appTC
    self.appTC = new TabWidget(self.view.querySelector('#appTC'));
    self.appTC.init();
    self.appTC.on('tabClosingByUser', self.listeners.tabClosingByUser = self.onTabClosingByUser.bind(self));
    self.appTC.on('tabShow', self.listeners.tabShow = self.onTabShow.bind(self));
    self.appTC.on('tabHide', self.listeners.tabHide = self.onTabHide.bind(self));
    // app
    self.model.on('pageOpened', self.listeners.pageOpened = self.onPageOpened.bind(self));
    self.model.on('pageClosed', self.listeners.pageClosed = self.onPageClosed.bind(self));
    self.model.on('pageSelected', self.listeners.pageSelected = self.onPageSelected.bind(self));
    self.model.on('logout', self.listeners.logout = self.onLogout.bind(self));

    // menu
    for (var name in self.model.data.menu) {
        var menu = self.model.data.menu[name];
        menu.forEach(function(submenu) {
            $(self.view).find('#' + self.model.data.name + '-' + submenu.page).click(function() {
                self.model.openPage({
                    name: submenu.page
                }).catch(function (err) {
                    alert(err.message);
                });
            });
        });
    }

    // logout
    $(self.view).find('#menu-logout').click(function() {
        self.model.logout();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.deinit = function() {
    var self = this;
    // app
    self.model.off('pageOpened', self.listeners.pageOpened);
    self.model.off('pageClosed', self.listeners.pageClosed);
    self.model.off('pageSelected', self.listeners.pageSelected);
    self.model.off('logout', self.listeners.logout);

    // TabWidget
    self.appTC.off('tabClosingByUser', self.listeners.tabClosingByUser);
    self.appTC.off('tabShow', self.listeners.tabShow);
    self.appTC.off('tabHide', self.listeners.tabHide);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageOpened = function(e) {
    var self = this;
    var page = e.page;
    var html = QForms.render(page.data.view, {
        model  : page,
        newMode: e.newMode
    });
    var view = $(html).get(0);
    var tab = self.appTC.createTab(view);
    $(tab).children('span').get(0).className = '{id}_caption'.replace('{id}', view.id);
    if (e.select) {
        self.appTC.selectTab(tab, e.track);
    }
    tab.qPage = page;
    page.qTab = tab;
    tab.pageController = PageController.create(page, view, self);
    tab.pageController.init();
    tab.pageController.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageClosed = function(ea) {
    var self = this;
    self.appTC.closeTab(ea.page.qTab);
    ea.page.qTab.pageController.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageSelected = function(ea) {
    var self = this;
    self.appTC.selectTab(ea.page.qTab);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabClosingByUser = function(e) {
    var self = this;
    e.tab.qPage.close();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabShow = function(e) {
    var self = this;
    if (e.tab.qPage) {
        e.tab.qPage.emit('show', {source: this});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabHide = function(e) {
    var self = this;
    if (e.tab.qPage) {
        e.tab.qPage.emit('hide', {source: this});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onLogout = function(ea) {
    var self = this;
    location.reload();
};