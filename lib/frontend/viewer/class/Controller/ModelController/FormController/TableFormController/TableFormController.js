'use strict';

QForms.inherits(TableFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormController(model, view, parent) {
    var self = this;
    FormController.call(self, model, view, parent);
    self.grid        = null;
    self.framesCount = null;
    self.$goto       = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.init = function() {
    var self = this;
    TableFormController.super_.prototype.init.call(self);
    //this.model.eventRefilled.subscribe(this, 'onRefilled');
    self.model.on('refilled', self.listeners.refilled = self.onRefilled.bind(self));
    //this.model.eventRefreshed.subscribe(this, 'onRefreshed');
    self.model.on('refreshed', self.listeners.refreshed = self.onRefreshed.bind(self));
    $(self.view).find('button.refresh').click(function() {
        self.onRefreshClick(this);
    });
    $(self.view).find('button.new').click(function() {
        self.onNewClick(this);
    });
    $(self.view).find('button.delete').click(function() {
        self.onDeleteClick(this);
    });
    $(self.view).find('button.next').click(function() {
        self.onNextClick(this);
    });
    $(self.view).find('button.previous').click(function() {
        self.onPreviousClick(this);
    });
    self.$count = $(self.view).find('span.count');
    self.$goto = $(self.view).find('select.goto');
    self.$goto.change(function() {
        self.onGotoChange(this);
    });
    var gridSelector = '#{pageId}_{formName}_GridWidget'.template({
        pageId  : self.model.page.id,
        formName: self.model.name
    });
    self.grid = new DataGridWidget(self.view.querySelector(gridSelector), self);
    self.grid.init();
    //this.model.page.eventHide.subscribe(this, 'onHidePage');
    self.model.page.on('hide', self.listeners.hide = self.onHidePage.bind(self));
    //this.model.page.eventShow.subscribe(this, 'onShowPage');
    self.model.page.on('show', self.listeners.show = self.onShowPage.bind(self));
    //this.grid.eventBodyCellDblClick.subscribe(this, 'onGridCellDblClick');
    self.grid.on('bodyCellDblClick', self.listeners.bodyCellDblClick = self.onGridCellDblClick.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.deinit = function() {
    var self = this;
    //this.model.page.eventHide.unsubscribe(this, 'onHidePage');
    self.model.page.off('hide', self.listeners.hide);
    //this.model.page.eventShow.unsubscribe(this, 'onShowPage');
    self.model.page.off('show', self.listeners.show);
    //this.grid.eventBodyCellDblClick.unsubscribe(this, 'onGridCellDblClick');
    self.grid.off('bodyCellDblClick', self.listeners.bodyCellDblClick);
    self.grid.deinit();
    //this.model.eventRefilled.unsubscribe(this, 'onRefilled');
    self.model.off('refilled', self.listeners.refilled);
    //this.model.eventRefreshed.unsubscribe(this, 'onRefreshed');
    self.model.off('refreshed', self.listeners.refreshed);
    TableFormController.super_.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.fill = function() {
    var self = this;
    console.log('TableFormController.prototype.fill', self.model.name);
    TableFormController.super_.prototype.fill.call(self);
    if (self.model.dataSource.limit) {
        $(self.view).find('.paging').css('display', 'block');
        self.setCountText();
    }
    self.framesCount = self.model.dataSource.getFramesCount();
    if (self.framesCount) {
        for (var i = 1; i <= self.framesCount; i++) {
            var option = $('<option></option>');
            option.val(i);
            option.html(i);
            self.$goto.append(option);
        }
    }
    self.grid.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.setCountText = function() {
    var self = this;
    var count = '{rowsCount} of {count}'.template({
        rowsCount: self.model.dataSource.length,
        count    : self.model.dataSource.count
    });
    self.$count.text(count);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.updateCountAndGoTo = function () {
    var self = this;
    if (self.model.dataSource.limit) {
        self.setCountText();
    }
    self.framesCount = self.model.dataSource.getFramesCount();
    if (self.framesCount) {
        self.$goto.empty();
        for (var i = 1; i <= self.framesCount; i++) {
            var option = $('<option></option>');
            option.val(i);
            option.html(i);
            self.$goto.append(option);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onRefilled = function(ea) {
    var self = this;
    console.log('TableFormController.prototype.onRefilled', self.model.name);
    self.grid.clear();
    self.updateCountAndGoTo();
    self.grid.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onRefreshed = function (ea) {
    var self = this;
    console.log('TableFormController.prototype.onRefreshed', self.model.name);
    self.updateCountAndGoTo();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onNewClick = function(ctrl) {
    var self = this;
    self.model.new();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onRefreshClick = function(ctrl) {
    var self = this;
    //console.log('TableFormController.prototype.onRefreshClick', self.name);
    self.model.refresh().catch(function (err) {
        console.error('refresh error handler:', err.message);
        alert(err.message);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onDeleteClick = function(ctrl) {
    var self = this;
    if (confirm(self.model.page.app.data.text.form.areYouSure)) {
        var key = self.grid.getSelectedKey();
        if (key !== null) {
            self.model.delete(key);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onNextClick = function(ctrl) {
    var self = this;
    var frame = parseInt(self.$goto.val()) + 1;
    if (frame <= self.framesCount) {
        self.$goto.val(frame);
        self.model.frame(frame);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onPreviousClick = function(ctrl) {
    var self = this;
    var frame = parseInt(self.$goto.val()) - 1;
    if (frame > 0) {
        self.$goto.val(frame);
        self.model.frame(frame);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onGotoChange = function(ctrl) {
    var self = this;
    var frame = parseInt(ctrl.value);
    self.model.frame(frame);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onGridCellDblClick = function(ea) {
    var self = this;
    var bodyCell = ea.bodyCell;
    var key = bodyCell.bodyRow.qKey;
    switch (self.model.data.editMethod) {
        case 'table':
            if (self.model.dataSource.data.access.update === true) {
                self.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            }
        break;
        case 'form':
            self.model.edit(key);
        break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onHidePage = function() {
    var self = this;
    self.grid.saveScroll();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.prototype.onShowPage = function() {
    var self = this;
    self.grid.restoreScroll();
};