const path   = require('path');
const Field  = require('../Field');

class ComboBoxField extends Field {

    static async create(data, parent) {
        return new ComboBoxField(data, parent);
    }

    /*getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }*/

}

module.exports = ComboBoxField;
