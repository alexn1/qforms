'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../Form');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class RowForm extends Form {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FormController/RowFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new RowForm(data, parent);
    }

}

module.exports = RowForm;