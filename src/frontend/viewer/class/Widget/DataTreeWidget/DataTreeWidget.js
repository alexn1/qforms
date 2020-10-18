'use strict';

class DataTreeWidget extends TreeWidget {

    constructor(el, controller) {
        super(el);
        this.controller = controller;
        this.keyToItem  = {};		// to fast item search by key
    }

    init() {
        super.init();
        const dataSource = this.controller.model.getDataSource();
        dataSource.on('update', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        dataSource.on('newRow', this.listeners.newRow = this.onNewRow.bind(this));
        dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        dataSource.on('moveRow', this.listeners.moveRow = this.onMoveRow.bind(this));
        dataSource.on('goneRow', this.listeners.goneRow = this.onGoneRow.bind(this));
        dataSource.on('comeRow', this.listeners.comeRow = this.onComeRow.bind(this));
    }

    deinit() {
        const dataSource = this.controller.model.getDataSource();
        dataSource.off('update', this.listeners.rowUpdate);
        dataSource.off('newRow', this.listeners.newRow);
        dataSource.off('removeRow', this.listeners.removeRow);
        dataSource.off('moveRow', this.listeners.moveRow);
        dataSource.off('goneRow', this.listeners.goneRow);
        dataSource.off('comeRow', this.listeners.comeRow);
    }

    fill() {
        this.keyToItem['[null]'] = this.tree;
        const rows = this.controller.model.getDataSource().getRows();
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
        const key = this.controller.model.getDataSource().getRowKey(row);
        this.keyToItem[key] = item;
        // adding child rows
        const rows = this.controller.model.getDataSource().getRows(key);
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
        const row = this.controller.model.getDataSource().getRow(ea.key);
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
