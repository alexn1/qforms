'use strict';

const path    = require('path');
const Form   = require('../Form');

class TableForm extends Form {

    static async create(data, parent) {
        return new TableForm(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TableFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    // async fill(context) {
    //     console.log('TableForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }

}

module.exports = TableForm;
