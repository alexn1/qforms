'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var Model = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Control extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.dirPath            = path.join(parent.dirPath, self.name);
        self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new Control(data, parent);
    }

}

module.exports = Control;