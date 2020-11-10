class RowForm extends Form {
    init() {
        super.init();
        if (this.getPage().isNewMode()) {
            this.getDataSource().newRow(this.createRow());
        }
        this.fillParams(this.getRow()); // dump row values to page params
    }

    fillParams(row) {
        for (const name in this.fields) {
            this.fields[name].valueToPageParams(row);
        }
    }

    onDataSourceUpdate(e) {
        this.fillParams(this.getRow());
        super.onDataSourceUpdate(e);
    }

    onDataSourceInsert(e) {
        this.fillParams(this.getRow());
        super.onDataSourceInsert(e);
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
        return row;
    }

    discard(fields) {
        console.log('RowForm.discard', fields);
        if (this.getDataSource().isChanged()) {
            this.getDataSource().discard();
            fields.forEach(name => {
                this.fields[name].valueToPageParams(this.getRow())
            });
        }
    }

}
