'use strict';

const Model = require('../Model');

class Column extends Model {

    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('Column.constructor', this.getName());
    // }

    static async create(data, parent) {
        return new Column(data, parent);
    }

    isKey() {
        return this.getAttr('key') === 'true';
    }

    isAuto() {
        return this.getAttr('auto') === 'true';
    }

    getApp() {
        return this.parent.parent.parent;
    }
    getDbType() {
        return this.getAttr('dbType');
    }
}

module.exports = Column;
