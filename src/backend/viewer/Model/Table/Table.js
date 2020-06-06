'use strict';

const Model = require('../Model');

class Table extends Model {

    constructor(data, parent) {
        super(data, parent);
        console.log('Table.constructor', this.name);
        this.createCollections  = ['columns'];
        this.fillCollections    = ['columns'];
        this.columns = {};
    }

    static async create(data, parent) {
        return new Table(data, parent);
    }

    getKeyColumns() {
        // console.log('Table.getKeyColumns');
        const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0) throw new Error(`no key columns in table: ${this.name}`);
        return keyColumns;
    }

    getApp() {
        return this.parent.parent;
    }
}

module.exports = Table;
