'use strict';

const path    = require('path');
const Model = require('../Model');

class Control extends Model {

    constructor(data, parent) {
        super(data, parent);
    }

    getCustomViewFilePath() {
        return path.join(this.getDirPath(), `${this.name}.ejs`);
    }

    static async create(data, parent) {
        return new Control(data, parent);
    }

    getApp() {
        return this.parent.parent.parent;   // control > form > page > application
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), this.name);
    }

}

module.exports = Control;
