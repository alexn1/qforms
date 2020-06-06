'use strict';

class TableForm extends Form {

    // table form updated immediately after cell modification
    // onDataSourceChanged(e) {
    //     const dataSource = e.source;
    //     if (dataSource.name !== 'default') return;
    //     this.dataSources.default.update();
    // }

    delete(key) {
        console.log('TableForm.delete:', key);
        this.dataSources.default.delete(key);
    }

    frame(frame) {
        this.dataSources.default.frame(this.page.params, frame);
    }

}
