'use strict';

const path    = require('path');
const Model = require('../Model');

class Control extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.dirPath            = path.join(parent.dirPath, this.name);
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    }

    static async create(data, parent) {
        return new Control(data, parent);
    }

    getApp() {
        return this.parent.parent.parent;   // control > form > page > application
    }

}

module.exports = Control;
