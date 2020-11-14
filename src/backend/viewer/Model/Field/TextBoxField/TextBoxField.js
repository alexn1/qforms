const path    = require('path');
const Field  = require('../Field');

class TextBoxField extends Field {


    static async create(data, parent) {
        return new TextBoxField(data, parent);
    }

    /*getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }*/

}

module.exports = TextBoxField;
