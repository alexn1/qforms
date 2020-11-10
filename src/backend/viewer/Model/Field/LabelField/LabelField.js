const path    = require('path');
const Field  = require('../Field');

class LabelField extends Field {

    static async create(data, parent) {
        return new LabelField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = LabelField;
