'use strict';

QForms.inherits(DataTreeWidget, TreeWidget);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataTreeWidget(el, controller) {
    var self = this;
    TreeWidget.call(self, el);
    self.controller = controller;
    self.dataSource = null;
    self.keyToItem  = {};		// to fast item search by key
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.init = function() {
    var self = this;
    TreeWidget.prototype.init.call(self);
    self.dataSource = self.controller.model.dataSource;
    self.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    self.dataSource.on('newRow', self.listeners.newRow = self.onNewRow.bind(self));
    self.dataSource.on('removeRow', self.listeners.removeRow = self.onRemoveRow.bind(self));
    self.dataSource.on('moveRow', self.listeners.moveRow = self.onMoveRow.bind(self));
    self.dataSource.on('goneRow', self.listeners.goneRow = self.onGoneRow.bind(self));
    self.dataSource.on('comeRow', self.listeners.comeRow = self.onComeRow.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.deinit = function() {
    var self = this;
    self.dataSource.off('refillRow', self.listeners.refillRow);
    self.dataSource.off('newRow', self.listeners.newRow);
    self.dataSource.off('removeRow', self.listeners.removeRow);
    self.dataSource.off('moveRow', self.listeners.moveRow);
    self.dataSource.off('goneRow', self.listeners.goneRow);
    self.dataSource.off('comeRow', self.listeners.comeRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.fill = function() {
    var self = this;
    self.keyToItem['[null]'] = self.tree;
    var rows = self.dataSource.getRows();
    for (var i = 0; i < rows.length; i++) {
        self.addRow(self.tree, rows[i]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.addRow = function(parent, row, i) {
    var self = this;
    // adding row
    var caption = self.makeRowCaption(row);
    var item = parent.addItem(caption, undefined, i);
    item.qRow = row;
    // save to be able to find by key
    var key = self.dataSource.getRowKey(row);
    self.keyToItem[key] = item;
    // adding child rows
    var rows = self.dataSource.getRows(key);
    for (var i = 0; i < rows.length; i++) {
        self.addRow(item, rows[i]);
    }
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.makeRowCaption = function(row) {
    var self = this;
    var caption = '';
    for (var fieldName in self.controller.model.fields) {
        var field = self.controller.model.fields[fieldName];
        if (field.data.isVisible === 'false') continue;
        caption += row[field.data.column] + ' ';
    }
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onRefillRow = function(ea) {
    var self = this;
    var item = self.keyToItem[ea.key];
    self.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.refillItem = function(item) {
    var self = this;
    var caption = self.makeRowCaption(item.qRow);
    item.setCaption(caption);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onNewRow = function(ea) {
    var self = this;
    var row = self.dataSource.getRow(ea.key);
    var parentItem = self.keyToItem[ea.parentKey];
    var item = self.addRow(parentItem, row, ea.i);
    item.select();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onRemoveRow = function(ea) {
    var self = this;
    var item = self.keyToItem[ea.key];
    item.remove();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onMoveRow = function(ea) {
    var self = this;
    var parentItem = self.keyToItem[ea.parentKey];
    var item = self.keyToItem[ea.key];
    QForms.moveNode(parentItem.ul, item.li, ea.oldIndex, ea.newIndex);
    self.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onGoneRow = function(ea) {
    var self = this;
    var item = self.keyToItem[ea.key];
    var newParent = self.keyToItem[ea.newParentKey];
    item.changeParent(newParent, ea.newIndex);
    item.select();
    self.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onComeRow = function(ea) {
    var self = this;
    var item = self.keyToItem[ea.key];
    var newParent = self.keyToItem[ea.parentKey];
    item.changeParent(newParent, ea.newIndex);
    item.select();
    self.refillItem(item);
};