'use strict';

QForms.inherits(TabWidget, Widget);

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('div.TabWidget').each(function() {
        this._obj = new TabWidget(this);
        this._obj.init();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function TabWidget(el) {
    var self = this;
    TabWidget.super_.call(self, el);
    self.activeTab             = null;
    self.activePage            = null;
    self.tabList               = null;
    self.pageList              = null;
    self.prevActiveTab         = null;
    //this.eventTabShow          = new QForms.Event(this);
    //this.eventTabHide          = new QForms.Event(this);
    //this.eventTabClosingByUser = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.init = function() {
    var self = this;
    //console.log('TabWidget.prototype.init', self.el);
    self.tabList    = $(self.el).children('ul').get(0);
    self.pageList   = $(self.el).children('div').get(0);
    self.activeTab  = $(self.tabList).children('li.active').get(0);
    self.activePage = $(self.pageList).children('div.active').get(0);
    // read child elements and init tabs
    $(self.el).children('ul').children('li').each(function() {
        self.initTab(this);
    });
    // if active tab is not set then first tab is selected
    if ($(self.tabList).children('li').length > 0 && self.activeTab === undefined) {
        self.selectTab($(self.tabList).children('li').get(0));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// add tab based on existing element
TabWidget.prototype.initTab = function(li) {
    var self = this;
    $(li).mousedown(function() {
        if (self.activeTab !== this) {
            self.selectTab(this);
        }
    });
    $(li).children('span.close').each(function() {
        $(this).click(function(e) {
            self.onTabClosing(this.parentNode);
            e.stopPropagation();
        });
        $(this).mousedown(function(e) {
            e.stopPropagation();
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.onTabClosing = function(tab) {
    var self = this;
    //var ea = new QForms.EventArg(this);
    //ea.tab = tab;
    //this.eventTabClosingByUser.fire({source: this, tab: tab});
    self.emit('tabClosingByUser', {source: self, tab: tab});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.createTab = function(el, caption, onCloseCallback) {
    var self = this;
    if (caption === undefined) {
        caption = '';
    }
    // li
    var li = $("<li><span>{caption}</span> <span class='close'>&times;</span></li>".replace('{caption}', caption)).get(0);
    li.onCloseCallback = onCloseCallback;
    // div
    var div = document.createElement('div');
    div.appendChild(el);
    // append
    self.tabList.appendChild(li);
    self.pageList.appendChild(div);
    // tab is done
    self.initTab(li);
    // if active tab is not defined then select this tab
    if (self.activeTab === undefined) {
        self.selectTab(li);
    }
    return li;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.selectTab = function(tab, track) {
    var self = this;
    if (self.activeTab === tab) {
        return;
    }
    var index = $(self.tabList).children('li').index(tab);
    if (index === -1 ) {
        throw new Error("Tab doesn't exists.");
    }
    var oldTab = self.activeTab;
    tab.classList.add('active');
    if (self.activeTab) {
        self.activeTab.classList.remove('active');
    }
    // track option is used to store prev tab during opening new one
    // if new tab is closed then select prev tab
    // this option is used during new tab creation
    if (track !== undefined && track && $(self.tabList).children('li').index(self.activeTab) !== -1) {
        self.prevActiveTab = self.activeTab;
    } else {
        self.prevActiveTab = null;
    }
    self.activeTab = tab;
    // page
    var page = $(self.pageList).children('div').get(index);
    page.classList.add('active');
    if (self.activePage) {
        self.activePage.classList.remove('active');
    }
    self.activePage = page;
    // events
    if (oldTab) {
        //var ea = new QForms.EventArg(this);
        //ea.tab = oldTab;
        //this.eventTabHide.fire({source: this, tab: oldTab});
        self.emit('tabHide', {source: self, tab: oldTab});
    }
    //var ea = new QForms.EventArg(this);
    //ea.tab = tab;
    //this.eventTabShow.fire({source: this, tab: tab});
    self.emit('tabShow', {source: self, tab: tab});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.closeTab = function(tab) {
    var self = this;
    var index = $(self.tabList).children('li').index(tab);
    var page = $(self.pageList).children('div').get(index);
    self.tabList.removeChild(tab);
    if (tab === self.prevActiveTab) {
        self.prevActiveTab = null;
    }
    self.pageList.removeChild(page);
    if (tab.onCloseCallback) {
        tab.onCloseCallback(tab);
    }
    // if closed tab is selected, we need to make active another tab
    if (self.activeTab === tab) {
        if (self.prevActiveTab !== null) {
            self.selectTab(self.prevActiveTab);
        } else {
            if ($(self.tabList).children('li').length > 0) {
                self.selectTab($(self.tabList).children('li').last().get(0));
            }
        }
    }
};