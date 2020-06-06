'use strict';

class RowForm extends Form {
    init() {
        super.init();
        if (this.page.newMode) {
            const row = {};
            this.defaultValuesToRow(row);
            this.dataSource.newRow(row);
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
            return this.dataSource.getRowKey(this.getRow());
        }
        return null;
    }
}
