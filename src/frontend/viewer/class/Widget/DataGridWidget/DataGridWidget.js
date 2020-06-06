'use strict';

class DataGridWidget extends GridWidget {
    constructor(el, formController) {
        super(el);
        this.formController = formController;
        // this.dataSource     = null;
        this.keyToBodyRow   = {}; // to fast row search by key
    }

    init() {
        super.init();
        // self.dataSource = self.formController.model.dataSource;
        this.getDataSource().on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        this.getDataSource().on('newRow'   , this.listeners.newRow    = this.onNewRow.bind(this));
        this.getDataSource().on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        this.getDataSource().on('moveRow'  , this.listeners.moveRow   = this.onMoveRow.bind(this));
        this.getDataSource().on('newFrame' , this.listeners.newFrame  = this.onNewFrame.bind(this));
        this.getDataSource().on('insert'   , this.listeners.insert    = this.onInsert.bind(this));
    }

    createColumn(fieldName, headerCell) {
        const fieldController = this.formController.fields[fieldName];
        const gridColumn = new DataGridColumn(this, fieldName, headerCell, fieldController);
        gridColumn.init();
        return gridColumn;
    }

    deinit() {
        super.deinit();
        this.getDataSource().off('rowUpdate', this.listeners.rowUpdate);
        this.getDataSource().off('newRow', this.listeners.newRow);
        this.getDataSource().off('removeRow', this.listeners.removeRow);
        this.getDataSource().off('moveRow', this.listeners.moveRow);
        this.getDataSource().off('newFrame', this.listeners.newFrame);
        this.getDataSource().off('insert', this.listeners.insert);
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
            bodyRow.qKey  = key;
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

    refillRow(bodyRow, newIndex) {
        bodyRow.qI = newIndex;
        for (const fieldName in this.gridColumns) {
            const bodyCell = bodyRow.bodyCells[fieldName];
            this.gridColumns[fieldName].fieldController.refill(bodyRow.dbRow, bodyCell.firstElementChild);
        }
        this.setRowStyle(bodyRow);
    }

    onRowUpdate(event) {
        console.log('DataGridWidget.onRowUpdate:', event);
        const key = event.key;
        const i   = event.i;
        const bodyRow = this.keyToBodyRow[key];
        if (!bodyRow) throw new Error(`no row with key: ${key}`);
        const row = bodyRow.dbRow;
        const newKey = this.getDataSource().getRowKey(row);
        console.log('row:', row);
        console.log(`key: ${key} to ${newKey}`);
        if (key !== newKey) {   // update index if needed
            delete this.keyToBodyRow[key];
            this.keyToBodyRow[newKey] = bodyRow;
        }
        this.refillRow(bodyRow, i);
    }

    onNewRow(ea) {
        const i = ea.i;
        //console.log('onNewRow: ' + i);
        const row = this.getDataSource().childs['[null]'].rowsByIndex[i];
        const key = this.getDataSource().getRowKey(row);
        const bodyRow = this.createBodyRow(i);
        bodyRow.dbRow = row;
        bodyRow.qKey = key;
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
        const key = ea.key;
        const bodyRow = this.keyToBodyRow[key];
        //console.log('onRemoveRow: ' + key);
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
        this.refillRow(bodyRow, newIndex);
    }

    onNewFrame(ea) {
        this.clear();
        this.fill();
    }

    getSelectedKey() {
        return (this.selectedBodyRow !== null) ? this.selectedBodyRow.qKey : null;
    }

    getDataSource() {
        return this.formController.model.dataSource;
    }
}

