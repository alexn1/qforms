'use strict';

QForms.inherit(ApplicationController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model, view) {
    ApplicationController.super_.call(this, model);
    this.view  = view;
    this.appTC = null;
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
    this.appTC = new TabWidget(this.view.querySelector('#appTC'));
    this.appTC.init();
    //this.appTC.eventTabClosingByUser.subscribe(this, 'onTabClosingByUser');
    self.appTC.on('tabClosingByUser', self.listeners.tabClosingByUser = self.onTabClosingByUser.bind(self));
    //this.appTC.eventTabShow.subscribe(this, 'onTabShow');
    self.appTC.on('tabShow', self.listeners.tabShow = self.onTabShow.bind(self));
    //this.appTC.eventTabHide.subscribe(this, 'onTabHide');
    self.appTC.on('tabHide', self.listeners.tabHide = self.onTabHide.bind(self));
    // app
    //this.model.eventPageOpened.subscribe(this, 'onPageOpened');
    self.model.on('pageOpened', self.listeners.pageOpened = self.onPageOpened.bind(self));
    //this.model.eventPageClosed.subscribe(this, 'onPageClosed');
    self.model.on('pageClosed', self.listeners.pageClosed = self.onPageClosed.bind(self));
    //this.model.eventPageSelected.subscribe(this, 'onPageSelected');
    self.model.on('pageSelected', self.listeners.pageSelected = self.onPageSelected.bind(self));
    //this.model.eventLogout.subscribe(this, 'onLogout');
    self.model.on('logout', self.listeners.logout = self.onLogout.bind(self));

    // menu
    for (var name in self.model.data.menu) {
        var menu = self.model.data.menu[name];
        menu.forEach(function(submenu) {
            $(self.view).find('#' + self.model.data.name + '-' + submenu.page).click(function() {
                self.model.openPage({
                    name: submenu.page
                });
            });
        });
    }

    // logout
    $(this.view).find('#menu-logout').click(function() {
        self.model.logout();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.deinit = function() {
    var self = this;
    // app
    //this.model.eventPageOpened.unsubscribe(this, 'onPageOpened');
    self.model.off('pageOpened', self.listeners.pageOpened);
    //this.model.eventPageClosed.unsubscribe(this, 'onPageClosed');
    self.model.off('pageClosed', self.listeners.pageClosed);
    //this.model.eventPageSelected.unsubscribe(this, 'onPageSelected');
    self.model.off('pageSelected', self.listeners.pageSelected);
    self.model.off('logout', self.listeners.logout);

    // TabWidget
    //this.appTC.eventTabClosingByUser.unsubscribe(this, 'onTabClosingByUser');
    self.appTC.off('tabClosingByUser', self.listeners.tabClosingByUser);
    //this.appTC.eventTabShow.unsubscribe(this, 'onTabShow');
    self.appTC.off('tabShow', self.listeners.tabShow);
    //this.appTC.eventTabHide.unsubscribe(this, 'onTabHide');
    self.appTC.off('tabHide', self.listeners.tabHide);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageOpened = function(e) {
    var page = e.page;
    var html = QForms.render(page.data.view, {
        model  : page,
        newMode: e.newMode
    });
    var view = $(html).get(0);
    var tab = this.appTC.createTab(view);
    $(tab).children('span').get(0).className = '{id}_caption'.replace('{id}', view.id);
    if (e.select) {
        this.appTC.selectTab(tab, e.track);
    }
    tab.qPage = page;
    page.qTab = tab;
    tab.pageController = PageController.create(page, view, this);
    tab.pageController.init();
    tab.pageController.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageClosed = function(ea) {
    this.appTC.closeTab(ea.page.qTab);
    ea.page.qTab.pageController.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageSelected = function(ea) {
    this.appTC.selectTab(ea.page.qTab);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabClosingByUser = function(e) {
    e.tab.qPage.close();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabShow = function(e) {
    var self = this;
    if (e.tab.qPage) {
        //e.tab.qPage.eventShow.fire({source: this});
        e.tab.qPage.emit('show', {source: this});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabHide = function(e) {
    var self = this;
    if (e.tab.qPage) {
        //e.tab.qPage.eventHide.fire({source: this});
        e.tab.qPage.emit('hide', {source: this});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onLogout = function(ea) {
    location.reload();
};