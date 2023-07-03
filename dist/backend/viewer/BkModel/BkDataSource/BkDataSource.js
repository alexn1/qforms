"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDataSource = void 0;
const path_1 = __importDefault(require("path"));
const BkModel_1 = require("../BkModel");
const BkHelper_1 = require("../../../BkHelper");
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
        return path_1.default.join(this.getParent().getDirPath(), 'dataSources', this.getName());
    }
    getJsonFilePath() {
        return path_1.default.join(this.getDirPath(), `${this.getName()}.json`);
    }
    async init(context) {
        // console.debug('DataSource.init', this.getFullName());
        await super.init(context);
        // keyColumns
        this.keyColumns = this.getKeyColumns();
        // rows
        const jsonFilePath = this.getJsonFilePath();
        const exists = await BkHelper_1.BkHelper.exists(jsonFilePath);
        if (exists) {
            const content = await BkHelper_1.BkHelper.readTextFile(jsonFilePath);
            this.rows = JSON.parse(content);
        }
    }
    getKeyColumns() {
        const keyColumns = this.getItemNames('keyColumns');
        // console.debug('keyColumns:', keyColumns);
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
    checkKeyFields() {
        const fieldsClumns = this.getForm().fields.map((field) => field.getAttr('column'));
        // console.debug('fieldsClumns:', fieldsClumns);
        for (const keyColumn of this.keyColumns) {
            if (!fieldsClumns.includes(keyColumn)) {
                throw new Error(`[${this.getFullName()}]: no field with key column: ${keyColumn}`);
            }
        }
    }
    checkRow(row) {
        this.checkKeyColumns(row);
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
    checkNotUsedColumns(row) {
        const rowColumns = Object.keys(row);
        const formColumns = this.getForm()
            .fields.map((field) => field.getAttr('column'))
            .filter((column) => !!column);
        for (const rowColumn of rowColumns) {
            if (!formColumns.includes(rowColumn)) {
                console.debug('rowColumns:', rowColumns);
                console.debug('formColumns:', formColumns);
                console.debug('row:', row);
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
    encodeRows(rows) {
        return rows.map((row) => this.encodeRow(row));
    }
    encodeRow(row) {
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
                rawRow[name] = BkHelper_1.BkHelper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }
    getApp() {
        return this.getParent().getApp();
    }
    getKeyValuesFromKey(key) {
        const tuple = JSON.parse(key);
        if (tuple.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${tuple.length} of ${this.keyColumns.length}`);
        }
        const record = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            record[keyColumn] = tuple[i];
        }
        return record;
    }
    getKeyFromValues(record) {
        const tuple = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = record[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            tuple.push(value);
        }
        return JSON.stringify(tuple);
    }
    getFullName() {
        if (this.isOnForm()) {
            return [
                this.getParent().getPage().getName(),
                this.getParent().getName(),
                this.getName(),
            ].join('.');
        }
        else if (this.getParent() instanceof BkPage_1.BkPage) {
            return [this.getParent().getName(), this.getName()].join('.');
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
        // console.debug('DataSource.fill', this.getFullName());
        const response = await super.fill(context);
        // keyColumns
        response.keyColumns = this.keyColumns;
        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }
    async getRows() {
        // console.debug('DataSource.getRows');
        /* const jsonFilePath = this.getJsonFilePath();
        const exists = await BkHelper.exists(jsonFilePath);
        if (exists) {
            const content = await BkHelper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        } */
        return this.rows;
    }
    isOnForm() {
        return this.getParent() instanceof BkForm_1.BkForm;
    }
    isDefaultOnForm() {
        return this.getName() === 'default' && this.isOnForm();
    }
    isDefaultOnRowForm() {
        return this.getName() === 'default' && this.getParent() instanceof BkRowForm_1.BkRowForm;
    }
    isDefaultOnTableForm() {
        return this.getName() === 'default' && this.getParent() instanceof BkTableForm_1.BkTableForm;
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
        if (!this.isOnForm())
            throw new Error(`${this.getFullName()}: not form data source`);
        return this.getParent();
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
