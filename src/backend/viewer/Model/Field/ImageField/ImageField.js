const path    = require('path');
const Field  = require('../Field');

class ImageField extends Field {

    static async create(data, parent) {
        return new ImageField(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = ImageField;
