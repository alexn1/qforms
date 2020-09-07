'use strict';

const path    = require('path');
const Field  = require('../Field');

class DatePickerField extends Field {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = this.getViewFilePath();
    }

    static async create(data, parent) {
        return new DatePickerField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = DatePickerField;
