'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class TextAreaField extends Field {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
            self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new TextAreaField(data, parent);
    }

}

module.exports = TextAreaField;