const path    = require('path');
const Field  = require('../Field');

class LinkField extends Field {

    static async create(data, parent) {
        return new LinkField(data, parent);
    }

    /*getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }*/

}

module.exports = LinkField;
