'use strict';

QForms.inherit(PageController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(model, view, parent) {
    //console.log(model);
    ModelController.call(this,model);
    this.view       = view;
    this.parent     = parent;
    this.captionEls = null;
    this.forms      = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.create = function(model,view,parent) {
    var customClassName = "{page}Controller".replace("{page}",model.name);
    var typeOfCustomClass = "typeof({customClassName})".replace("{customClassName}",customClassName);
    var custom =  "new {customClassName}(model,view,parent)".replace("{customClassName}",customClassName);
    var general = "new {class}Controller(model,view,parent)".replace("{class}",model.data.class);
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.init = function() {
    var self = this;
    this.captionEls = this.parent.view.querySelectorAll(".{pageId}_caption".replace("{pageId}",this.model.id));
    $(this.view).find("#{pageId}_TabWidget".replace("{pageId}",this.model.id)).each(function() {new TabWidget(this).init();});
    $(this.view).find("button.save").click(function() {self.onSaveClick(this);});
    $(this.view).find("button.saveAndClose").click(function() {self.onSaveAndCloseClick(this);});
    $(this.view).find("button.closePage").click(function() {self.onClosePageClick(this);});
    this.model.eventChanged.subscribe(this,"onPageChanged");
    this.model.eventUpdated.subscribe(this,"onPageUpdated");
    for (var formName in this.model.forms) {
        var view = this.view.querySelector("#{pageId}_{formName}".replace("{pageId}",this.model.id).replace("{formName}",formName));
        this.forms[formName] = FormController.create(this.model.forms[formName], view, this);
        this.forms[formName].init();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.deinit = function() {
    for (var formName in this.forms) {
        this.forms[formName].deinit();
    }
    this.model.eventChanged.unsubscribe(this,"onPageChanged");
    this.model.eventUpdated.unsubscribe(this,"onPageUpdated");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.fill = function() {
    this.setCaption(this.getCaption());
    for (var formName in this.forms) {
        this.forms[formName].fill();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onSaveClick = function(el) {
    if (this.isValid()) this.model.update();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onSaveAndCloseClick = function(el) {
    if (this.isValid()) this.model.saveAndClose();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onClosePageClick = function(e) {
    this.model.close();
};


////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.changedCaption = function() {
    this.setCaption(this.getCaption() + " *");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.unchangedCaption = function() {
    this.setCaption(this.getCaption());
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.setCaption = function(caption) {
    for (var i=0;i<this.captionEls.length;i++) {
        this.captionEls[i].innerHTML = caption;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getCaption = function() {
    return this.model.data.caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.isValid = function() {
    var isValid = true;
    for (var name in this.forms) if (!this.forms[name].isValid()) isValid = false;
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onPageChanged = function(ea) {
    this.changedCaption();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onPageUpdated = function(ea) {
    this.unchangedCaption();
};