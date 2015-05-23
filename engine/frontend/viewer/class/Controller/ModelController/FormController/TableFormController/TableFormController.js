"use strict"

QForms.inherit(TableFormController,FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormController(model,view) {
    FormController.call(this,model,view);
    this.grid = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.init = function() {
    FormController.prototype.init.call(this);
    var self = this;
    $(this.view).find("button.new").click(function() {self.onNewClick(this);});
    $(this.view).find("button.delete").click(function() {self.onDeleteClick(this);});
    var gridSelector = "#{pageId}_{formName}_GridWidget".replace("{pageId}",this.model.page.id).replace("{formName}",this.model.name);
    this.grid = new DataGridWidget(this.view.querySelector(gridSelector),this);
    this.grid.init();
    this.model.page.eventHide.subscribe(this,"onHidePage");
    this.model.page.eventShow.subscribe(this,"onShowPage");
    this.grid.eventBodyCellDblClick.subscribe(this,"onGridCellDblClick");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.deinit = function() {
    FormController.prototype.deinit.call(this);
    this.model.page.eventHide.unsubscribe(this,"onHidePage");
    this.model.page.eventShow.unsubscribe(this,"onShowPage");
    this.grid.eventBodyCellDblClick.unsubscribe(this,"onGridCellDblClick");
    this.grid.deinit();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.fill = function() {
    FormController.prototype.fill.call(this);
    this.grid.fill();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onNewClick = function(ctrl) {
    this.model.new();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onDeleteClick = function(ctrl) {
    var key = this.grid.getSelectedKey();
    if (key !== null) this.model.delete(key);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onGridCellDblClick = function(ea) {
    var bodyCell = ea.bodyCell
    var key = bodyCell.bodyRow.qKey;
    switch (this.model.data.editMethod) {
        case "table":
            this.grid.controls[bodyCell.qFieldName].doubleClick(bodyCell);
        break;
        case "form":
            this.model.edit(key);
        break;
    }
    this.model.handleEvent("DoubleClick",{"key":key});
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onHidePage = function() {
    this.grid.saveScroll();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onShowPage = function() {
    this.grid.restoreScroll();
}