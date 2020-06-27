'use strict';

class TreeForm extends Form {

    // tree form is updated immediately after the modification of the table cell
    //
    // onDataSourceChanged(e) {
    //     const dataSource = e.source;
    //     if (dataSource.name !== 'default') {
    //         return;
    //     }
    //     this.getDataSource().update();
    // }

    delete(row) {
        const key = this.dataSource.getRowKey(row);
        this.dataSources['default'].delete(key);
    }

    newRoot() {
        this.openPage({
            name   : this.data.itemEditPage,
            newMode: true,
            params : {'parentKey':''}
        });
    }
}
