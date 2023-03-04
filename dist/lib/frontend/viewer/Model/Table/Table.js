"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const Model_1 = require("../Model");
const Column_1 = require("../Column/Column");
class Table extends Model_1.Model {
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new Column_1.Column(data, this);
            column.init();
            this.addColumn(column);
        }
    }
    addColumn(column) {
        this.columns.push(column);
    }
    getColumn(name) {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column)
            throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }
    emitResult(result, source = null) {
        console.log('Table.emitResult');
        return [
            ...(result.insert ? [this.emitInsert(source, result.insert)] : []),
            ...(result.update ? [this.emitUpdate(source, result.update)] : []),
            ...(result.delete ? [this.emitDelete(source, result.delete)] : []),
            ...(result.refresh ? [this.emitRefresh(source)] : []),
        ];
    }
    emitInsert(source, inserts) {
        return this.emit('insert', { source, inserts });
    }
    emitUpdate(source, updates) {
        return this.emit('update', { source, updates });
    }
    emitDelete(source, deletes) {
        return this.emit('delete', { source, deletes });
    }
    emitRefresh(source) {
        return this.emit('refresh', { source });
    }
}
exports.Table = Table;
if (typeof window === 'object') {
    // @ts-ignore
    window.Table = Table;
}
