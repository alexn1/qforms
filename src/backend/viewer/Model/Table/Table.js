const Model = require('../Model');

class Table extends Model {
    static async create(data, parent) {
        return new Table(data, parent);
    }

    constructor(data, parent) {
        super(data, parent);
        // console.log('Table.constructor', this.getName());
        // this.createCollections  = ['columns'];
        this.fillCollections    = ['columns'];
        this.columns = {};
    }

    async init() {
        await this.createCollection('columns');
    }

    getKeyColumns() {
        // console.log('Table.getKeyColumns');
        const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0) throw new Error(`no key columns in table: ${this.getName()}`);
        return keyColumns;
    }

    getApp() {
        return this.parent.parent;
    }

    getColumn(name) {
        return this.columns[name];
    }
}

module.exports = Table;
