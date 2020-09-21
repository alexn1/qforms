'use strict';

class TreeForm extends Form {

    // tree form is updated immediately after the modification of the table cell
    //
    // onDataSourceChanged(e) {
    //     const dataSource = e.source;
    //     if (dataSource.getName() !== 'default') {
    //         return;
    //     }
    //     this.getDataSource().update();
    // }

    delete(row) {
        const key = this.getDataSource().getRowKey(row);
        this.dataSources['default'].delete(key);
    }
}
