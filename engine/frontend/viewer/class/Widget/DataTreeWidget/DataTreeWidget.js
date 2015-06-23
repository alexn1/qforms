'use strict';

QForms.inherit(DataTreeWidget,TreeWidget);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataTreeWidget(el,controller) {
    TreeWidget.call(this,el);
    this.controller = controller;
    this.dataSource = null;
    this.keyToItem = {};		// to fast item search by key
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.init = function() {
    TreeWidget.prototype.init.call(this);
    this.dataSource = this.controller.model.dataSource;
    this.dataSource.eventRefillRow.subscribe(this,"onRefillRow");
    this.dataSource.eventNewRow.subscribe(this,"onNewRow");
    this.dataSource.eventRemoveRow.subscribe(this,"onRemoveRow");
    this.dataSource.eventMoveRow.subscribe(this,"onMoveRow");
    this.dataSource.eventGoneRow.subscribe(this,"onGoneRow");
    this.dataSource.eventComeRow.subscribe(this,"onComeRow");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.deinit = function() {
    this.dataSource.eventRefillRow.unsubscribe(this,"onRefillRow");
    this.dataSource.eventNewRow.unsubscribe(this,"onNewRow");
    this.dataSource.eventRemoveRow.unsubscribe(this,"onRemoveRow");
    this.dataSource.eventMoveRow.unsubscribe(this,"onMoveRow");
    this.dataSource.eventGoneRow.unsubscribe(this,"onGoneRow");
    this.dataSource.eventComeRow.unsubscribe(this,"onComeRow");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.fill = function() {
    this.keyToItem["[null]"] = this.tree;
    var rows = this.dataSource.getRows();
    for (var i=0;i<rows.length;i++) {
        this.addRow(this.tree,rows[i]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.addRow = function(parent,row,i) {
    // adding row
    var caption = this.makeRowCaption(row);
    var item = parent.addItem(caption,undefined,i);
    item.qRow = row;
    // save to be able to find by key
    var key = this.dataSource.getRowKey(row);
    this.keyToItem[key] = item;
    // adding child rows
    var rows = this.dataSource.getRows(key);
    for (var i=0;i< rows.length;i++) {
        this.addRow(item,rows[i]);
    }
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.makeRowCaption = function(row) {
    var caption = "";
    for (var fieldName in this.controller.model.fields) {
        var field = this.controller.model.fields[fieldName];
        if (field.data.isVisible === "false") continue;
        caption += row[field.data.column] + " ";
    }
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onRefillRow = function(ea) {
    var item = this.keyToItem[ea.key];
    this.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.refillItem = function(item) {
    var caption = this.makeRowCaption(item.qRow);
    item.setCaption(caption);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onNewRow = function(ea) {
    var row = this.dataSource.getRow(ea.key);
    var parentItem = this.keyToItem[ea.parentKey];
    var item = this.addRow(parentItem,row,ea.i);
    item.select();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onRemoveRow = function(ea) {
    var item = this.keyToItem[ea.key];
    item.remove();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onMoveRow = function(ea) {
    var parentItem = this.keyToItem[ea.parentKey];
    var item = this.keyToItem[ea.key];
    QForms.moveNode(parentItem.ul,item.li,ea.oldIndex,ea.newIndex);
    this.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onGoneRow = function(ea) {
    var item = this.keyToItem[ea.key];
    var newParent = this.keyToItem[ea.newParentKey];
    item.changeParent(newParent,ea.newIndex);
    item.select();
    this.refillItem(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataTreeWidget.prototype.onComeRow = function(ea) {
    var item = this.keyToItem[ea.key];
    var newParent = this.keyToItem[ea.parentKey];
    item.changeParent(newParent,ea.newIndex);
    item.select();
    this.refillItem(item);
};