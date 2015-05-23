"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $("div[data-class='TabWidget']").each(function() {
        this._obj = new TabWidget(this);
        this._obj.init();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function TabWidget(el) {
    this.el = el;
    this.activeTab = null;
    this.activePage = null;
    this.tabList = null;
    this.pageList = null;

    this.prevActiveTab = null;
    this.eventTabShow = new QForms.Event(this);
    this.eventTabHide = new QForms.Event(this);
    this.eventTabClosingByUser = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.init = function() {
    this.tabList    = $(this.el).children("ul").get(0);
    this.pageList   = $(this.el).children("div").get(0);
    this.activeTab  = $(this.tabList).children("li.active").get(0);
    this.activePage = $(this.pageList).children("div.active").get(0);
    // читаем дочерние элементы и добавляет табы
    var self = this;
    $(this.el).children("ul").children("li").each(function() {
        self.initTab(this);
    });
    // если активный таб не назначен, то выбираем первый
    if ($(this.tabList).children("li").length > 0 && this.activeTab === undefined) {
        this.selectTab($(this.tabList).children("li").get(0))
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// добавляет таб по существующему элементу
TabWidget.prototype.initTab = function(li) {
    var self = this;
    $(li).mousedown(function() {
        if (self.activeTab !== this) {
            self.selectTab(this);
        }
    });
    $(li).children("span.close").each(function() {
        $(this).click(function(e) {
            self.onTabClosing(this.parentNode);
            e.stopPropagation();
        });
        $(this).mousedown(function(e) {
            e.stopPropagation();
        });
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.onTabClosing = function(tab) {
    var ea = new QForms.EventArg(this);
    ea.tab = tab;
    this.eventTabClosingByUser.fire(ea);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.createTab = function(el,caption,onCloseCallback) {
    caption = caption !== undefined ? caption : "";
    // li
    var li = $("<li><span>{caption}</span> <span class='close'>&times;</span></li>".replace("{caption}",caption)).get(0);
    li.onCloseCallback = onCloseCallback;
    // div
    var div = document.createElement("div");
    div.appendChild(el);
    // добавляем
    this.tabList.appendChild(li);
    this.pageList.appendChild(div);
    // готовый таб
    this.initTab(li);
    // если активного таба нет, то первый сразу становится активным
    if (this.activeTab === undefined) {
        this.selectTab(li);
    }
    return li;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.selectTab = function(tab,track) {
    if (this.activeTab === tab) {
        return;
    }
    var index = $(this.tabList).children("li").index(tab);
    if (index === -1 ) {
        throw new Error("Такого таба нет.");
    }
    var oldTab = this.activeTab;
    tab.classList.add("active");
    if (this.activeTab) {
        this.activeTab.classList.remove("active");
    }
    // опция track чтобы помнить предыдущий таб во время открытия нового, и переключится
    // на старый, если новый закрыли, в остальных случаях предыдущий не помним
    // данная опция используется только при создании нового таба
    if (track !== undefined && track && $(this.tabList).children("li").index(this.activeTab) !== -1) {
        this.prevActiveTab = this.activeTab;
    } else {
        this.prevActiveTab = null;
    }
    this.activeTab = tab;
    // page
    var page = $(this.pageList).children("div").get(index);
    page.classList.add("active");
    if (this.activePage) {
        this.activePage.classList.remove("active");
    }
    this.activePage = page;
    // events
    if (oldTab) {
        var ea = new QForms.EventArg(this);
        ea.tab = oldTab;
        this.eventTabHide.fire(ea);
    }
    var ea = new QForms.EventArg(this);
    ea.tab = tab;
    this.eventTabShow.fire(ea);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TabWidget.prototype.closeTab = function(tab) {
    var index = $(this.tabList).children("li").index(tab);
    var page = $(this.pageList).children("div").get(index);
    this.tabList.removeChild(tab);
    if (tab === this.prevActiveTab) {
        this.prevActiveTab = null;
    }
    this.pageList.removeChild(page);
    if (tab.onCloseCallback) {
        tab.onCloseCallback(tab);
    }
    // если закрытый таб был выделеным, значит надо выделить другой
    if (this.activeTab === tab) {
        if (this.prevActiveTab !== null) {
            this.selectTab(this.prevActiveTab);
        } else {
            if ($(this.tabList).children("li").length > 0) {
                this.selectTab($(this.tabList).children("li").last().get(0));
            }
        }
    }
}