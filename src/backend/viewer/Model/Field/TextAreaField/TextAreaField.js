const path    = require('path');
const Field  = require('../Field');

class TextAreaField extends Field {

    static async create(data, parent) {
        return new TextAreaField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = TextAreaField;
