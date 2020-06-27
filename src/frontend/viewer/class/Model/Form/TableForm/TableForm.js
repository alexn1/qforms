'use strict';

class TableForm extends Form {

    // table form updated immediately after cell modification
    // onDataSourceChanged(e) {
    //     const dataSource = e.source;
    //     if (dataSource.name !== 'default') return;
    //     this.getDataSource().update();
    // }

    delete(key) {
        console.log('TableForm.delete:', key);
        this.getDataSource().delete(key);
    }

    frame(frame) {
        this.getDataSource().frame(this.page.params, frame);
    }

}
