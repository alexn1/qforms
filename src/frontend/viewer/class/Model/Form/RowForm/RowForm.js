'use strict';

class RowForm extends Form {
    init() {
        super.init();
        if (this.page.isNewMode()) {
            this.dataSource.newRow(this.createRow());
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

    getFullName() {
        return [this.page.name, this.name].join('.');
    }

    getFieldValue(name) {
        return this.fields[name].getValue(this.getRow());
    }

    getRow() {
        return this.dataSource.getSingleRow();
    }

    getKey() {
        // console.log('RowForm.getKey', this.getFullName());
        if (this.dataSource.getClassName() === 'SqlDataSource') {
            const row = this.getRow();
            if (this.getDataSource().data.rows.indexOf(row) !== -1) {
                return this.dataSource.getRowKey(row);
            }
        }
        return null;
    }

    createRow() {
        const row = {};
        this.fillDefaultValues(row);
        return row;
    }

}
