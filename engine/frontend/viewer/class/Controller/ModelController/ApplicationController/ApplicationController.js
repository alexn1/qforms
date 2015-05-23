"use strict"

QForms.inherit(ApplicationController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model,view) {
    ModelController.call(this,model);
    this.view = view;
    this.appTC = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.create = function(model,view) {
    var customClassName = "{app}Controller".replace("{app}",model.name);
    var typeOfCustomClass = "typeof({customClassName})".replace("{customClassName}",customClassName);
    var custom =  "new {customClassName}(model,view)".replace("{customClassName}",customClassName);
    var general = "new {class}Controller(model,view)".replace("{class}",model.data.class);
    var obj;
    if (model.data.js !== undefined) {
        if (eval(typeOfCustomClass) === "function") {
            obj = eval(custom);
        } else {
            $.globalEval(model.data.js);
            obj = (eval(typeOfCustomClass) === "function") ? eval(custom) : eval(general);
        }
    } else {
        obj = eval(general);
    }
    return obj;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.init = function() {
    // appTC
    this.appTC = new TabWidget(this.view.querySelector("#appTC"));
    this.appTC.init();
    this.appTC.eventTabClosingByUser.subscribe(this,"onTabClosingByUser");
    this.appTC.eventTabShow.subscribe(this,"onTabShow");
    this.appTC.eventTabHide.subscribe(this,"onTabHide");
    // app
    this.model.eventPageOpened.subscribe(this,"onPageOpened");
    this.model.eventPageClosed.subscribe(this,"onPageClosed");
    this.model.eventPageSelected.subscribe(this,"onPageSelected");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.deinit = function() {
    // app
    this.model.eventPageOpened.unsubscribe(this,"onPageOpened");
    this.model.eventPageClosed.unsubscribe(this,"onPageClosed");
    this.model.eventPageSelected.unsubscribe(this,"onPageSelected");
    // TabWidget
    this.appTC.eventTabClosingByUser.unsubscribe(this,"onTabClosingByUser");
    this.appTC.eventTabShow.unsubscribe(this,"onTabShow");
    this.appTC.eventTabHide.unsubscribe(this,"onTabHide");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageOpened = function(e) {
    // надо смотреть, есть ли таб старницы уже в документе, или нет
    // если есть, то просто инициализируем его, если нет, то надо добавить
    // новый таб
    var html = QForms.render(e.page.data.view,{model:e.page});
    var view = $(html).get(0);
    var tab = this.appTC.createTab(view);
    $(tab).children("span").get(0).className = "{id}_caption".replace("{id}",view.id);
    if (e.select) {
        this.appTC.selectTab(tab, e.track);
    }
    tab.qPage = e.page;
    e.page.qTab = tab;
    tab.pageController = PageController.create(e.page,view,this);
    tab.pageController.init();
    tab.pageController.fill();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageClosed = function(ea) {
    this.appTC.closeTab(ea.page.qTab);
    ea.page.qTab.pageController.deinit();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onPageSelected = function(ea) {
    this.appTC.selectTab(ea.page.qTab);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabClosingByUser = function(e) {
    e.tab.qPage.close();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabShow = function(e) {
    if (e.tab.qPage) e.tab.qPage.eventShow.fire(new QForms.EventArg(this));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.onTabHide = function(e) {
    if (e.tab.qPage) e.tab.qPage.eventHide.fire(new QForms.EventArg(this));
}