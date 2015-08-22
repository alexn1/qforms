'use strict';

QForms.inherit(TreeFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeFormController(model, view, parent) {
    FormController.call(this, model, view, parent);
    this.tree = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.init = function() {
    FormController.prototype.init.call(this);
    var self = this;
    $(this.view).find('button.newRoot').click(function() {self.onNewRootClick(this);});
    $(this.view).find('button.new').click(function() {self.onNewClick(this);});
    $(this.view).find('button.delete').click(function() {self.onDeleteClick(this);});
    var treeSelector = '#{pageId}_{formName}_TreeWidget'.replace('{pageId}', this.model.page.id).replace('{formName}', this.model.name);
    var tree = this.view.querySelector(treeSelector);
    this.tree = new DataTreeWidget(tree, this);
    this.tree.init();
    this.tree.eventSelect.subscribe(this, 'onTreeItemSelect');
    this.tree.eventDoubleClick.subscribe(this, 'onTreeItemDoubleClick');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.deinit = function() {
    FormController.prototype.deinit.call(this);
    this.tree.eventSelect.unsubscribe(this, 'onTreeItemSelect');
    this.tree.eventDoubleClick.unsubscribe(this, 'onTreeItemDoubleClick');
    this.tree.deinit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.fill = function() {
    FormController.prototype.fill.call(this);
    this.tree.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onTreeItemSelect = function(e) {
    //console.log(this.tree.active);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onTreeItemDoubleClick = function(e) {
    this.model.edit(e.item.qRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onNewRootClick = function(ctrl) {
    this.model.newRoot();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onNewClick = function(ctrl) {
    this.model.new(this.tree.active.qRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.prototype.onDeleteClick = function(ctrl) {
    this.model.delete(this.tree.active.qRow);
};