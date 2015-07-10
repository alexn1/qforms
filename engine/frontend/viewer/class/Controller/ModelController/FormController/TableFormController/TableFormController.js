'use strict';

QForms.inherit(TableFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormController(model, view, parent) {
    FormController.call(this, model, view, parent);
    this.grid        = null;
    this.framesCount = null;
    this.$goto       = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.init = function() {
    FormController.prototype.init.call(this);
    var self = this;
    $(this.view).find("button.new").click(function() {
        self.onNewClick(this);
    });
    $(this.view).find("button.delete").click(function() {
        self.onDeleteClick(this);
    });
    this.framesCount = this.model.dataSource.getFramesCount();
    if (this.framesCount) {
        $(this.view).find("button.next").click(function() {
            self.onNextClick(this);
        });
        $(this.view).find("button.previous").click(function() {
            self.onPreviousClick(this);
        });
        this.$goto = $(this.view).find("select.goto");
        this.$goto.change(function() {
            self.onGotoChange(this);
        });
        for (var i = 1; i <= this.framesCount; i++) {
            var option = $('<option></option>');
            option.val(i);
            option.html(i);
            this.$goto.append(option);
        }
        $(this.view).find(".paging").css('display', 'block');
    }

    var gridSelector = '#{pageId}_{formName}_GridWidget'.template({
        pageId  : this.model.page.id,
        formName: this.model.name
    });
    this.grid = new DataGridWidget(this.view.querySelector(gridSelector), this);
    this.grid.init();
    this.model.page.eventHide.subscribe(this,"onHidePage");
    this.model.page.eventShow.subscribe(this,"onShowPage");
    this.grid.eventBodyCellDblClick.subscribe(this,"onGridCellDblClick");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.deinit = function() {
    this.model.page.eventHide.unsubscribe(this,"onHidePage");
    this.model.page.eventShow.unsubscribe(this,"onShowPage");
    this.grid.eventBodyCellDblClick.unsubscribe(this,"onGridCellDblClick");
    this.grid.deinit();
    FormController.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.fill = function() {
    FormController.prototype.fill.call(this);
    this.grid.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onNewClick = function(ctrl) {
    this.model.new();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onDeleteClick = function(ctrl) {
    if (confirm('Are you sure?')) {
        var key = this.grid.getSelectedKey();
        if (key !== null) {
            this.model.delete(key);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onNextClick = function(ctrl) {
    var frame = parseInt(this.$goto.val()) + 1;
    if (frame <= this.framesCount) {
        this.$goto.val(frame);
        this.model.frame(frame);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onPreviousClick = function(ctrl) {
    var frame = parseInt(this.$goto.val()) - 1;
    if (frame > 0) {
        this.$goto.val(frame);
        this.model.frame(frame);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onGotoChange = function(ctrl) {
    var frame = parseInt(ctrl.value)
    this.model.frame(frame);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onGridCellDblClick = function(ea) {
    var bodyCell = ea.bodyCell
    var key = bodyCell.bodyRow.qKey;
    switch (this.model.data.editMethod) {
        case "table":
            this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
        break;
        case "form":
            this.model.edit(key);
        break;
    }
    this.model.handleEvent("DoubleClick",{"key":key});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onHidePage = function() {
    this.grid.saveScroll();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onShowPage = function() {
    this.grid.restoreScroll();
};