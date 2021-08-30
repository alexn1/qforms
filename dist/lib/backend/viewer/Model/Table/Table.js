"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Model_1 = __importDefault(require("../Model"));
class Table extends Model_1.default {
    constructor(data, parent) {
        super(data, parent);
        // console.log('Table.constructor', this.getName());
        this.fillCollections = ['columns'];
        this.columns = [];
    }
    static async create(data, parent) {
        return new Table(data, parent);
    }
    async init(context) {
        await this.createColItems('columns', context);
    }
    getKeyColumns() {
        // console.log('Table.getKeyColumns');
        const keyColumns = this.columns.filter(column => column.isKey()).map(column => column.getName());
        // const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0)
            throw new Error(`no key columns in table: ${this.getName()}`);
        return keyColumns;
    }
    getApp() {
        return this.parent.parent;
    }
    getColumn(name) {
        const column = this.columns.find(column => column.getName() === name);
        if (!column)
            throw new Error(`no column ${name}`);
        return column;
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
    }
}
module.exports = Table;
