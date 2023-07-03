"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkTable = void 0;
const BkModel_1 = require("../BkModel");
class BkTable extends BkModel_1.BkModel {
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
        // console.debug('Table.constructor', this.getName());
        this.fillCollections = ['columns'];
    }
    async init(context) {
        await this.createColItems('columns', context);
    }
    getKeyColumns() {
        // console.debug('Table.getKeyColumns');
        const keyColumns = this.columns
            .filter((column) => column.isKey())
            .map((column) => column.getName());
        // const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0)
            throw new Error(`no key columns in table: ${this.getName()}`);
        return keyColumns;
    }
    getApp() {
        return this.getParent().getParent();
    }
    getColumn(name) {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column)
            throw new Error(`no column ${name}`);
        return column;
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
    }
}
exports.BkTable = BkTable;
