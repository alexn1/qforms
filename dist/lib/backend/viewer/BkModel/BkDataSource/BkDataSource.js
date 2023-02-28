"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDataSource = void 0;
const path_1 = __importDefault(require("path"));
const BkModel_1 = require("../BkModel");
const Helper_1 = require("../../../Helper");
const BkPage_1 = require("../BkPage/BkPage");
const BkForm_1 = require("../BkForm/BkForm");
const BkRowForm_1 = require("../BkForm/BkRowForm/BkRowForm");
const BkTableForm_1 = require("../BkForm/BkTableForm/BkTableForm");
class BkDataSource extends BkModel_1.BkModel {
    constructor() {
        super(...arguments);
        this.keyColumns = [];
        this.rows = [];
    }
    /* constructor(data, parent) {
        super(data, parent);
    } */
    getDirPath() {
        return path_1.default.join(this.parent.getDirPath(), 'dataSources', this.getName());
    }
    getJsonFilePath() {
        return path_1.default.join(this.getDirPath(), `${this.getName()}.json`);
    }
    async init(context) {
        // console.log('DataSource.init', this.getFullName());
        await super.init(context);
        // keyColumns
        this.keyColumns = this.getKeyColumns();
        // rows
        const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper_1.Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper_1.Helper.readTextFile(jsonFilePath);
            this.rows = JSON.parse(content);
        }
    }
    getKeyColumns() {
        const keyColumns = this.getItemNames('keyColumns');
        // console.log('keyColumns:', keyColumns);
        if (!keyColumns.length) {
            throw new Error(`${this.getFullName()}: DataSource without table must have at least one key column`);
        }
        return keyColumns;
    }
    checkKeyColumns(row) {
        for (const keyColumn of this.keyColumns) {
            if (!row.hasOwnProperty(keyColumn)) {
                throw new Error(`${this.getFullName()}: no key column '${keyColumn}' in result set`);
            }
        }
    }
    checkKeyFields(row) {
        const fieldsClumns = this.getForm().fields.map((field) => field.getAttr('column'));
        // console.log('fieldsClumns:', fieldsClumns);
        for (const keyColumn of this.keyColumns) {
            if (!fieldsClumns.includes(keyColumn)) {
                throw new Error(`no field with key column: ${keyColumn}`);
            }
        }
    }
    checkRow(row) {
        this.checkKeyColumns(row);
        if (this.isOnForm()) {
            this.checkKeyFields(row);
        }
        if (this.isDefaultOnForm()) {
            // this.checkNotUsedColumns(row);
            this.checkFields(row);
        }
    }
    checkRows(rows) {
        if (rows[0]) {
            this.checkRow(rows[0]);
        }
    }
    /* prepareRows(context: Context, rows: Row[]): void {
        // console.log('DataSource.prepareRows:', this.getFullName(), this.keyColumns);
        this.checkRows(rows);
        this.encodeRows(rows);
    } */
    checkNotUsedColumns(row) {
        const rowColumns = Object.keys(row);
        const formColumns = this.getForm()
            .fields.map((field) => field.getAttr('column'))
            .filter((column) => !!column);
        for (const rowColumn of rowColumns) {
            if (!formColumns.includes(rowColumn)) {
                console.log('rowColumns:', rowColumns);
                console.log('formColumns:', formColumns);
                console.log('row:', row);
                throw new Error(`${this.getFullName()}: not used column "${rowColumn}" in result set`);
            }
        }
    }
    checkFields(row) {
        for (const field of this.getForm().fields) {
            const column = field.getAttr('column');
            if (column) {
                if (!row.hasOwnProperty(column)) {
                    throw new Error(`[${field.getFullName()}]: no column '${column}' in result set`);
                }
                continue;
            }
            if (field.getAttr('value')) {
                continue;
            }
            throw new Error(`[${field.getFullName()}]: no column and no value attr for calculation`);
        }
    }
    /* encodeRows(rows: Row[]) {
        for (const row of rows) {
            this.encodeRow(row);
        }
    } */
    encodeRows2(rows) {
        return rows.map((row) => this.encodeRow2(row));
    }
    /* encodeRow(row: Row): void {
        // console.log('DataSource.encodeRow');
        if (!row) throw new Error(`encodeRow: need row`);
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                row[column] = field.valueToRaw(row[column]);
            }
        } else {
            for (const name in row) {
                row[name] = Helper.encodeValue(row[name]);
            }
        }
    } */
    encodeRow2(row) {
        if (!row)
            throw new Error(`encodeRow: need row`);
        const rawRow = {};
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                rawRow[column] = field.valueToRaw(row[column]);
                if (field.isAttr('displayColumn')) {
                    const displayColumn = field.getAttr('displayColumn');
                    rawRow[displayColumn] = field.valueToRaw(row[displayColumn]);
                }
            }
        }
        else {
            for (const name in row) {
                rawRow[name] = Helper_1.Helper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }
    getApp() {
        return this.parent.getApp();
    }
    getKeyValuesFromKey(key) {
        const arr = JSON.parse(key);
        if (arr.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${arr.length} of ${this.keyColumns.length}`);
        }
        const values = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            values[keyColumn] = arr[i];
        }
        return values;
    }
    getKeyFromValues(values) {
        const arr = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            arr.push(value);
        }
        return JSON.stringify(arr);
    }
    getFullName() {
        if (this.isOnForm()) {
            return [this.parent.getPage().getName(), this.parent.getName(), this.getName()].join('.');
        }
        else if (this.parent instanceof BkPage_1.BkPage) {
            return [this.parent.getName(), this.getName()].join('.');
        }
        else {
            return this.getName();
        }
    }
    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string')
            throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        }
        else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        }
        else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }
    calcNewKeyValues(originalKeyValues, values) {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined)
                throw new Error(`no key column in values: ${name}`);
            acc[name] = values[name] !== undefined ? values[name] : originalKeyValues[name];
            return acc;
        }, {});
        return newKeyValues;
    }
    calcNewKey(key, values) {
        const keyValues = this.getKeyValuesFromKey(key);
        const newKeyValues = this.calcNewKeyValues(keyValues, values);
        return this.getKeyFromValues(newKeyValues);
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        if (this.isAttr('database')) {
            response.database = this.getAttr('database');
        }
        if (this.isAttr('table')) {
            response.table = this.getAttr('table');
        }
    }
    async fill(context) {
        // console.log('DataSource.fill', this.getFullName());
        const response = await super.fill(context);
        // keyColumns
        response.keyColumns = this.keyColumns;
        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }
    async getRows() {
        // console.log('DataSource.getRows');
        /* const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        } */
        return this.rows;
    }
    isOnForm() {
        return this.parent instanceof BkForm_1.BkForm;
    }
    isDefaultOnForm() {
        return this.getName() === 'default' && this.isOnForm();
    }
    isDefaultOnRowForm() {
        return this.getName() === 'default' && this.parent instanceof BkRowForm_1.BkRowForm;
    }
    isDefaultOnTableForm() {
        return this.getName() === 'default' && this.parent instanceof BkTableForm_1.BkTableForm;
    }
    async read(context) {
        throw new Error(`${this.constructor.name}.select not implemented`);
    }
    async create(context, _values = null) {
        throw new Error(`${this.constructor.name}.create not implemented`);
    }
    async update(context) {
        throw new Error(`${this.constructor.name}.update not implemented`);
    }
    async delete(context) {
        throw new Error(`${this.constructor.name}.delete not implemented`);
    }
    getForm() {
        return this.isOnForm() ? this.getParent() : null;
    }
    getAccess(context) {
        return {
            create: true,
            read: true,
            update: true,
            delete: true,
        };
    }
    getDatabase() {
        throw new Error(`${this.constructor.name}.getDatabase not implemented`);
    }
    getLimit() {
        if (this.getAttr('limit') !== '') {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }
}
exports.BkDataSource = BkDataSource;
