'use strict';

class RowForm extends Form {
    init() {
        super.init();
        if (this.getPage().isNewMode()) {
            this.getDataSource().newRow(this.createRow());
        }

        // dump row values to page params
        this.fillParams(this.getRow());
    }

    fillParams(row) {
        for (const name in this.fields) {
            this.fields[name].valueToParams(row);
        }
    }

    onDataSourceUpdate(e) {
        super.onDataSourceUpdate(e);
        this.fillParams(this.getRow());
    }

    getRow() {
        return this.getDataSource().getSingleRow();
    }

    getKey() {
        // console.log('RowForm.getKey', this.getFullName());
        const dataSource = this.getDataSource();
        if (dataSource.getClassName() === 'SqlDataSource') {
            const row = this.getRow();
            return dataSource.getRowKey(row);
        }
        return null;
    }

    createRow() {
        const row = {};
        this.fillDefaultValues(row);
        console.log('row:', row);
        return row;
    }

}
