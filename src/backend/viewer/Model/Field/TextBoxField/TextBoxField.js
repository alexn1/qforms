'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class TextBoxField extends Field {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new TextBoxField(data, parent);
    }

}

module.exports = TextBoxField;