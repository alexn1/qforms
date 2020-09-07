'use strict';

const path    = require('path');
const Field   = require('../Field');

class CheckBoxField extends Field {

    static async create(data, parent) {
        return new CheckBoxField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = CheckBoxField;
