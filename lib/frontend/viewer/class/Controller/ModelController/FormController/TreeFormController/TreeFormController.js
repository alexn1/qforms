'use strict';

QForms.inherit(TreeFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeFormController(model, view, parent) {
    var self = this;
    FormController.call(self, model, view, parent);
    self.tree = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.init = function() {
    var self = this;
    FormController.prototype.init.call(self);
    $(self.view).find('button.newRoot').click(function() {self.onNewRootClick(this);});
    $(self.view).find('button.new').click(function()     {self.onNewClick(this);    });
    $(self.view).find('button.delete').click(function()  {self.onDeleteClick(this); });
    var treeSelector = '#{pageId}_{formName}_TreeWidget'.replace('{pageId}', self.model.page.id).replace('{formName}', self.model.name);
    var tree = self.view.querySelector(treeSelector);
    self.tree = new DataTreeWidget(tree, self);
    self.tree.init();
    //this.tree.eventSelect.subscribe(this, 'onTreeItemSelect');
    self.tree.on('select', self.listeners.select = self.onTreeItemSelect.bind(self));
    //this.tree.eventDoubleClick.subscribe(this, 'onTreeItemDoubleClick');
    self.tree.on('doubleClick', self.listeners.doubleClick = self.onTreeItemDoubleClick.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.deinit = function() {
    var self = this;
    FormController.prototype.deinit.call(this);
    //this.tree.eventSelect.unsubscribe(this, 'onTreeItemSelect');
    self.tree.off('select', self.listeners.select);
    //this.tree.eventDoubleClick.unsubscribe(this, 'onTreeItemDoubleClick');
    self.tree.off('doubleClick', self.listeners.doubleClick);
    self.tree.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.fill = function() {
    var self = this;
    FormController.prototype.fill.call(self);
    self.tree.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onTreeItemSelect = function(e) {
    var self = this;
    //console.log(this.tree.active);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onTreeItemDoubleClick = function(e) {
    var self = this;
    self.model.edit(e.item.qRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onNewRootClick = function(ctrl) {
    var self = this;
    self.model.newRoot();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onNewClick = function(ctrl) {
    var self = this;
    self.model.new(self.tree.active.qRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onDeleteClick = function(ctrl) {
    this.model.delete(this.tree.active.qRow);
};