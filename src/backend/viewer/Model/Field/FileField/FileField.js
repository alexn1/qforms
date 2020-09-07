'use strict';

const path    = require('path');
const Field  = require('../Field');

class FileField extends Field {

    static async create(data, parent) {
        return new FileField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/FileFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }
}

module.exports = FileField;
