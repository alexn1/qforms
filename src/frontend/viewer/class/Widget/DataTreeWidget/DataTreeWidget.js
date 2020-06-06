'use strict';

class DataTreeWidget extends TreeWidget {

    constructor(el, controller) {
        super(el);
        this.controller = controller;
        this.dataSource = null;
        this.keyToItem  = {};		// to fast item search by key
    }

    init() {
        super.init();
        this.dataSource = this.controller.model.dataSource;
        this.dataSource.on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        this.dataSource.on('newRow', this.listeners.newRow = this.onNewRow.bind(this));
        this.dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        this.dataSource.on('moveRow', this.listeners.moveRow = this.onMoveRow.bind(this));
        this.dataSource.on('goneRow', this.listeners.goneRow = this.onGoneRow.bind(this));
        this.dataSource.on('comeRow', this.listeners.comeRow = this.onComeRow.bind(this));
    }

    deinit() {
        this.dataSource.off('rowUpdate', this.listeners.rowUpdate);
        this.dataSource.off('newRow', this.listeners.newRow);
        this.dataSource.off('removeRow', this.listeners.removeRow);
        this.dataSource.off('moveRow', this.listeners.moveRow);
        this.dataSource.off('goneRow', this.listeners.goneRow);
        this.dataSource.off('comeRow', this.listeners.comeRow);
    }

    fill() {
        this.keyToItem['[null]'] = this.tree;
        const rows = this.dataSource.getRows();
        for (let i = 0; i < rows.length; i++) {
            this.addRow(this.tree, rows[i]);
        }
    }

    addRow(parent, row, i) {
        // adding row
        const caption = this.makeRowCaption(row);
        const item = parent.addItem(caption, undefined, i);
        item.qRow = row;
        // save to be able to find by key
        const key = this.dataSource.getRowKey(row);
        this.keyToItem[key] = item;
        // adding child rows
        const rows = this.dataSource.getRows(key);
        for (let i = 0; i < rows.length; i++) {
            this.addRow(item, rows[i]);
        }
        return item;
    }

    makeRowCaption(row) {
        let caption = '';
        for (const fieldName in this.controller.model.fields) {
            const field = this.controller.model.fields[fieldName];
            if (field.data.isVisible === 'false') continue;
            caption += row[field.data.column] + ' ';
        }
        return caption;
    }

    onRowUpdate(ea) {
        const item = this.keyToItem[ea.key];
        this.refillItem(item);
    }

    refillItem(item) {
        const caption = this.makeRowCaption(item.qRow);
        item.setCaption(caption);
    }

    onNewRow(ea) {
        const row = this.dataSource.getRow(ea.key);
        const parentItem = this.keyToItem[ea.parentKey];
        const item = this.addRow(parentItem, row, ea.i);
        item.select();
    }

    onRemoveRow(ea) {
        const item = this.keyToItem[ea.key];
        item.remove();
    }

    onMoveRow(ea) {
        const parentItem = this.keyToItem[ea.parentKey];
        const item = this.keyToItem[ea.key];
        QForms.moveNode(parentItem.ul, item.li, ea.oldIndex, ea.newIndex);
        this.refillItem(item);
    }

    onGoneRow(ea) {
        const item = this.keyToItem[ea.key];
        const newParent = this.keyToItem[ea.newParentKey];
        item.changeParent(newParent, ea.newIndex);
        item.select();
        this.refillItem(item);
    }

    onComeRow(ea) {
        const item = this.keyToItem[ea.key];
        const newParent = this.keyToItem[ea.parentKey];
        item.changeParent(newParent, ea.newIndex);
        item.select();
        this.refillItem(item);
    }

}
