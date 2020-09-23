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

    getFieldValue(name) {
        return this.fields[name].getValue(this.getRow());
    }

    getRow() {
        return this.getDataSource().getSingleRow();
    }

    getKey() {
        // console.log('RowForm.getKey', this.getFullName());
        const dataSource = this.getDataSource();
        if (dataSource.getClassName() === 'SqlDataSource') {
            const row = this.getRow();
            // if (dataSource.data.rows.indexOf(row) !== -1) {
                return dataSource.getRowKey(row);
            // }
        }
        return null;
    }

    createRow() {
        const row = {};
        this.fillDefaultValues(row);
        return row;
    }

}
