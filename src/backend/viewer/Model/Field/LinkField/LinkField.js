'use strict';

const path    = require('path');
const Field  = require('../Field');

class LinkField extends Field {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    static async create(data, parent) {
        return new LinkField(data, parent);
    }

}

module.exports = LinkField;
