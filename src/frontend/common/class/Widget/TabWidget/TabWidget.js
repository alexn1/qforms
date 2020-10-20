'use strict';

document.addEventListener('DOMContentLoaded', () => {
    console.log('TabWidget DOMContentLoaded');
    document.querySelectorAll('div.TabWidget').forEach(el => {
        el._obj = new TabWidget(el);
        el._obj.init();
    });
});

class TabWidget extends Widget {

    constructor(el) {
        super(el);
        this.activeTab             = null;
        this.activePage            = null;
        this.tabList               = null;
        this.pageList              = null;
        this.prevActiveTab         = null;
    }

    init() {
        const self = this;
        //console.log('TabWidget.init', self.el);
        this.tabList    = $(this.el).children('ul').get(0);
        this.pageList   = $(this.el).children('div').get(0);
        this.activeTab  = $(this.tabList).children('li.active').get(0);
        this.activePage = $(this.pageList).children('div.active').get(0);
        // read child elements and init tabs
        $(self.el).children('ul').children('li').each(function() {
            self.initTab(this);
        });
        // if active tab is not set then first tab is selected
        if ($(this.tabList).children('li').length > 0 && this.activeTab === undefined) {
            self.selectTab($(self.tabList).children('li').get(0));
        }
    }

    // add tab based on existing element
    initTab(li) {
        const self = this;
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
    }

    onTabClosing(tab) {
        this.emit('tabClosingByUser', {source: this, tab: tab});
    }

    createTab(el, caption, onCloseCallback, id) {
        if (caption === undefined) {
            caption = '';
        }
        // li
        const li = $("<li><span>{caption}</span> <span class='close'>&times;</span></li>".replace('{caption}', caption)).get(0);
        li.onCloseCallback = onCloseCallback;
        // div
        const div = document.createElement('div');
        if (id) div.id = id;

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
    }

    createTab2(el, caption, onCloseCallback, id) {
        if (caption === undefined) {
            caption = '';
        }
        // li
        const li = $("<li><span>{caption}</span> <span class='close'>&times;</span></li>".replace('{caption}', caption)).get(0);
        li.onCloseCallback = onCloseCallback;
        // div
        const div = document.createElement('div');
        if (id) div.id = id;

        if (el) {
            div.appendChild(el);
        }

        // append
        this.tabList.appendChild(li);
        this.pageList.appendChild(div);
        // tab is done
        this.initTab(li);
        // if active tab is not defined then select this tab
        if (this.activeTab === undefined) {
            this.selectTab(li);
        }
        return [li, div];
    }

    selectTab(tab, track) {
        // console.log('TabWidget.selectTab', tab, track);
        if (this.activeTab === tab) {
            return;
        }
        const index = $(this.tabList).children('li').index(tab);
        if (index === -1 ) {
            throw new Error("Tab doesn't exists.");
        }
        const oldTab = this.activeTab;
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
        const page = $(this.pageList).children('div').get(index);
        page.classList.add('active');
        if (this.activePage) {
            this.activePage.classList.remove('active');
        }
        this.activePage = page;
        // console.log('activePage:', self.activePage);
        // events
        if (oldTab) {
            this.emit('tabHide', {source: this, tab: oldTab});
        }
        this.emit('tabShow', {source: this, tab: tab});
    }

    closeTab(tab) {
        console.log('TabWidget.closeTab');
        if (!tab) throw new Error('no tab');
        const index = $(this.tabList).children('li').index(tab);
        const page = $(this.pageList).children('div').get(index);
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
    }

    static setTabCaption(tab, caption) {
        // console.log('TabWidget.setTabCaption', caption);
        $(tab).children('span').get(0).innerHTML = caption;
    }

}
