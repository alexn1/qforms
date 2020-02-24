'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../Form');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class TableForm extends Form {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FormController/TableFormController/view',
            self.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new TableForm(data, parent);
    }

}

module.exports = TableForm;