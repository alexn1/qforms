'use strict';

const path    = require('path');
const Field   = require('../Field');

class CheckBoxField extends Field {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    static async create(data, parent) {
        return new CheckBoxField(data, parent);
    }

}

module.exports = CheckBoxField;
