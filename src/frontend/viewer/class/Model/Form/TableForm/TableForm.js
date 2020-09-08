'use strict';

class TableForm extends Form {

    // table form updated immediately after cell modification
    // onDataSourceChanged(e) {
    //     const dataSource = e.source;
    //     if (dataSource.getName() !== 'default') return;
    //     this.getDataSource().update();
    // }

    delete(key) {
        console.log('TableForm.delete:', key);
        this.getDataSource().delete(key);
    }

    frame(frame) {
        this.getDataSource().frame(this.getPage().params, frame);
    }

}
