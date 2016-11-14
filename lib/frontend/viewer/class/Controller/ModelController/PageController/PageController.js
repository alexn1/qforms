'use strict';

QForms.inherits(PageController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(model, view, parent) {
    var self = this;
    //console.log(model);
    ModelController.call(self, model);
    self.view       = view;
    self.parent     = parent;
    self.captionEls = null;
    self.forms      = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.create = function(model, view, parent) {
    var customClassName = '{page}Controller'.replace('{page}', model.name);
    var typeOfCustomClass = 'typeof({customClassName})'.replace('{customClassName}', customClassName);
    var custom =  'new {customClassName}(model, view, parent)'.replace('{customClassName}', customClassName);
    var general = 'new {class}Controller(model, view, parent)'.replace('{class}', model.data.class);
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
PageController.prototype.init = function() {
    var self = this;
    self.captionEls = self.parent.view.querySelectorAll('.{pageId}_caption'.replace('{pageId}', self.model.id));
    $(self.view).find('#{pageId}_TabWidget'.replace('{pageId}', self.model.id)).each(function() {
        new TabWidget(this).init();
    });
    $(self.view).find('button.save').click(function() {
        self.onSaveClick(this);
    });
    $(self.view).find('button.saveAndClose').click(function() {
        self.onSaveAndCloseClick(this);
    });
    $(self.view).find('button.closePage').click(function() {
        self.onClosePageClick(this);
    });
    self.model.on('changed', self.listeners.changed = self.onPageChanged.bind(self));
    self.model.on('updated', self.listeners.updated = self.onPageUpdated.bind(self));
    for (var name in self.model.forms) {
        var form = self.model.forms[name];
        var viewId = '#{pageId}_{name}'.template({
            pageId: self.model.id,
            name  : name
        });
        var view = $(self.view).find(viewId).get(0);
        self.forms[name] = FormController.create(form, view, self);
        self.forms[name].init();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.deinit = function() {
    var self = this;
    //console.log('PageController.prototype.deinit: ' + this.model.name);
    for (var formName in self.forms) {
        self.forms[formName].deinit();
    }
    self.model.off('changed', self.listeners.changed);
    self.model.off('updated', self.listeners.updated);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.fill = function() {
    var self = this;
    self.setCaption(self.getCaption());
    for (var formName in self.forms) {
        self.forms[formName].fill();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onSaveClick = function(el) {
    var self = this;
    if (self.isValid()) {
        self.model.update();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onSaveAndCloseClick = function(el) {
    var self = this;
    if (self.isValid()) {
        self.model.saveAndClose();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onClosePageClick = function(e) {
    var self = this;
    self.model.close();
};


////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.changedCaption = function() {
    var self = this;
    self.setCaption(self.getCaption() + ' *');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.unchangedCaption = function() {
    var self = this;
    self.setCaption(self.getCaption());
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.setCaption = function(caption) {
    var self = this;
    for (var i = 0; i < self.captionEls.length; i++) {
        self.captionEls[i].innerHTML = caption;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getCaption = function() {
    var self = this;
    return self.model.data.caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.isValid = function() {
    var self = this;
    var isValid = true;
    for (var name in self.forms) {
        if (!self.forms[name].isValid()) {
            isValid = false;
        }
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onPageChanged = function(ea) {
    var self = this;
    self.changedCaption();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.onPageUpdated = function(ea) {
    var self = this;
    //console.log('PageController.prototype.onPageUpdated');
    self.unchangedCaption();
};