'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server  = require('../../../../../server');
var Field   = require('../Field');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class CheckBoxField extends Field {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new CheckBoxField(data, parent);
    }

}

module.exports = CheckBoxField;