"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Model_1 = require("../Model");
const Table_1 = require("../Table/Table");
const Helper_1 = require("../../../common/Helper");
class Database extends Model_1.Model {
    constructor() {
        super(...arguments);
        this.tables = [];
    }
    init() {
        // console.log('Database.init', this.getName());
        for (const data of this.data.tables) {
            const table = new Table_1.Table(data, this);
            table.init();
            this.addTable(table);
        }
    }
    addTable(table) {
        this.tables.push(table);
    }
    findTable(name) {
        return this.tables.find((table) => table.getName() === name);
    }
    getTable(name) {
        const table = this.findTable(name);
        if (!table)
            throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }
    emitResult(result, source = null) {
        console.log('Database.emitResult');
        const promises = [];
        for (const table in result) {
            promises.push(...this.getTable(table).emitResult(result[table], source));
        }
        return promises;
    }
}
exports.Database = Database;
Helper_1.Helper.registerGlobalClass(Database);
