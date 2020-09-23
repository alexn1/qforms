'use strict';

class DataGridWidget extends GridWidget {
    constructor(el, formController) {
        super(el);
        this.formController = formController;
        this.keyToBodyRow   = {}; // to fast row search by key
    }

    init() {
        super.init();
        const dataSource = this.getDataSource();
        dataSource.on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        dataSource.on('newRow'   , this.listeners.newRow    = this.onNewRow.bind(this));
        dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        dataSource.on('moveRow'  , this.listeners.moveRow   = this.onMoveRow.bind(this));
        dataSource.on('newFrame' , this.listeners.newFrame  = this.onNewFrame.bind(this));
        dataSource.on('insert'   , this.listeners.insert    = this.onInsert.bind(this));
    }

    createColumn(fieldName, headerCell) {
        const fieldController = this.formController.fields[fieldName];
        const gridColumn = new DataGridColumn(this, fieldName, headerCell, fieldController);
        gridColumn.init();
        return gridColumn;
    }

    deinit() {
        super.deinit();
        const dataSource = this.getDataSource();
        dataSource.off('rowUpdate', this.listeners.rowUpdate);
        dataSource.off('newRow', this.listeners.newRow);
        dataSource.off('removeRow', this.listeners.removeRow);
        dataSource.off('moveRow', this.listeners.moveRow);
        dataSource.off('newFrame', this.listeners.newFrame);
        dataSource.off('insert', this.listeners.insert);
    }

    fill () {
        //console.log('DataGridWidget.fill');
        const rows = this.getDataSource().getRows();
        for (let i = 0; i < rows.length; i++) {
            //const row = this.getDataSource().childs['[null]'].rowsByIndex[i];
            const row = rows[i];
            const key = this.getDataSource().getRowKey(row);
            const bodyRow = this.createBodyRow(i);
            bodyRow.dbRow = row;
            for (const fieldName in this.gridColumns) {
                const bodyCell = bodyRow.bodyCells[fieldName];
                this.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
            }
            this.setRowStyle(bodyRow);
            this.keyToBodyRow[key] = bodyRow;
        }
    }

    clear() {
        this.removeBodyRows();
        this.keyToBodyRow = {};
    }

    setRowStyle(bodyRow) {
        this.formController.setRowStyle(bodyRow, bodyRow.dbRow);
    }

    save(bodyCell) {
        const field = this.formController.model.fields[bodyCell.qFieldName];
        const row = bodyCell.bodyRow.dbRow;
        const value = this.gridColumns[bodyCell.qFieldName].getValue(bodyCell.firstElementChild);
        this.getDataSource().setValue(
            row,
            field.data.column,
            value
        );
    }

    refillRow(bodyRow) {
        for (const fieldName in this.gridColumns) {
            const bodyCell = bodyRow.bodyCells[fieldName];
            this.gridColumns[fieldName].fieldController.refill(bodyRow.dbRow, bodyCell.firstElementChild);
        }
        this.setRowStyle(bodyRow);
    }

    onRowUpdate(event) {
        // console.log('DataGridWidget.onRowUpdate:', event);
        const key = event.key;
        const bodyRow = this.keyToBodyRow[key];
        if (!bodyRow) throw new Error(`no row with key: ${key}`);
        const row = bodyRow.dbRow;
        const newKey = this.getDataSource().getRowKey(row);
        // console.log('row:', row);
        // console.log(`key: ${key} to ${newKey}`);
        if (key !== newKey) {   // update index if needed
            delete this.keyToBodyRow[key];
            this.keyToBodyRow[newKey] = bodyRow;
        }
        this.refillRow(bodyRow);
    }

    onNewRow(ea) {
        const i = ea.i;
        //console.log('onNewRow: ' + i);
        const row = this.getDataSource().childs['[null]'].rowsByIndex[i];
        const key = this.getDataSource().getRowKey(row);
        const bodyRow = this.createBodyRow(i);
        bodyRow.dbRow = row;
        for (const fieldName in this.gridColumns) {
            const bodyCell = bodyRow.bodyCells[fieldName];
            this.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
        }
        this.setRowStyle(bodyRow);
        this.keyToBodyRow[key] = bodyRow;
    }

    onInsert(ea) {
        const bodyRow = this.keyToBodyRow[ea.key];
        this.selectBodyRow(bodyRow);
        bodyRow.scrollIntoView();
    }

    onRemoveRow(ea) {
        console.log('DataGridWidget.onRemoveRow:', ea);
        const key = ea.key;
        const bodyRow = this.keyToBodyRow[key];
        // console.log('bodyRow', bodyRow);
        if (!bodyRow) throw new Error(`no bodyRow with key ${key}`);
        if (this.selectedBodyRow === bodyRow) {
            this.selectedBodyRow  = null;
            this.selectedBodyCell = null;
            /*
            if (this.selectedBodyRow.nextSibling) {
                this.selectBodyRow(this.selectedBodyRow.nextSibling);
            } else if (bodyRow === this.bodyTable.lastElementChild && this.bodyTable.lastElementChild.previousSibling) {
                this.selectBodyRow(this.bodyTable.lastElementChild.previousSibling);
            } else {
                this.unselectBodyCellIfSelected();
                this.unselectBodyRowIfSelected();
            }
            */
        }
        this.bodyTable.removeChild(bodyRow);
        delete this.keyToBodyRow[key];
    }

    onMoveRow(ea) {
        if (ea.parentKey !== '[null]') {
            return;
        }
        const oldIndex = ea.oldIndex;
        const newIndex = ea.newIndex;
        const key      = ea.key;
        //console.log('onMoveRow: ' + key + ' ' + newIndex);
        const bodyRow = this.keyToBodyRow[key];
        QForms.moveNode(this.bodyTable, bodyRow, oldIndex, newIndex);
        this.refillRow(bodyRow);
    }

    onNewFrame(ea) {
        this.clear();
        this.fill();
    }

    getSelectedKey() {
        if (this.selectedBodyRow) {
            return this.getDataSource().getRowKey(this.selectedBodyRow.dbRow);
        }
        return null;
    }

    getDataSource() {
        return this.formController.model.getDataSource();
    }
}

