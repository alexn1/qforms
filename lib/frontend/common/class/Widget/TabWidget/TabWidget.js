'use strict';

QForms.inherits(TabWidget, Widget);

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    //$("div[data-class='TabWidget']").each(function() {
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
    console.log('TabWidget.prototype.init', self.el);
    this.tabList    = $(this.el).children('ul').get(0);
    this.pageList   = $(this.el).children('div').get(0);
    this.activeTab  = $(this.tabList).children('li.active').get(0);
    this.activePage = $(this.pageList).children('div.active').get(0);
    // read child elements and init tabs
    var self = this;
    $(this.el).children('ul').children('li').each(function() {
        self.initTab(this);
    });
    // if active tab is not set then first tab is selected
    if ($(this.tabList).children('li').length > 0 && this.activeTab === undefined) {
        this.selectTab($(this.tabList).children('li').get(0));
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
    self.emit('tabClosingByUser', {source: this, tab: tab});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.createTab = function(el, caption, onCloseCallback) {
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
    this.tabList.appendChild(li);
    this.pageList.appendChild(div);
    // tab is done
    this.initTab(li);
    // if active tab is not defined then select this tab
    if (this.activeTab === undefined) {
        this.selectTab(li);
    }
    return li;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.selectTab = function(tab, track) {
    var self = this;
    if (this.activeTab === tab) {
        return;
    }
    var index = $(this.tabList).children('li').index(tab);
    if (index === -1 ) {
        throw new Error("Tab doesn't exists.");
    }
    var oldTab = this.activeTab;
    tab.classList.add('active');
    if (this.activeTab) {
        this.activeTab.classList.remove('active');
    }
    // track option is used to store prev tab during opening new one
    // if new tab is closed then select prev tab
    // this option is used during new tab creation
    if (track !== undefined && track && $(this.tabList).children('li').index(this.activeTab) !== -1) {
        this.prevActiveTab = this.activeTab;
    } else {
        this.prevActiveTab = null;
    }
    this.activeTab = tab;
    // page
    var page = $(this.pageList).children('div').get(index);
    page.classList.add('active');
    if (this.activePage) {
        this.activePage.classList.remove('active');
    }
    this.activePage = page;
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
    var index = $(this.tabList).children('li').index(tab);
    var page = $(this.pageList).children('div').get(index);
    this.tabList.removeChild(tab);
    if (tab === this.prevActiveTab) {
        this.prevActiveTab = null;
    }
    this.pageList.removeChild(page);
    if (tab.onCloseCallback) {
        tab.onCloseCallback(tab);
    }
    // if closed tab is selected, we need to make active another tab
    if (this.activeTab === tab) {
        if (this.prevActiveTab !== null) {
            this.selectTab(this.prevActiveTab);
        } else {
            if ($(this.tabList).children('li').length > 0) {
                this.selectTab($(this.tabList).children('li').last().get(0));
            }
        }
    }
};