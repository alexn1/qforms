const path    = require('path');
const qforms = require('../../../qforms');
const Model  = require('../Model');
const BaseModel = require('../../../BaseModel');
const Helper = require('../../../Helper');

class DataSource extends Model {
    static async create(data, parent) {
        if (parent instanceof qforms.Form) {
            const form = parent;
            const name = BaseModel.getName(data);
            const customBackendJsFilePath = path.join(
                form.getPage().getApp().getDirPath(),
                'pages', form.getPage().getName(),
                'forms', form.getName(),
                'dataSources', name,
                'Model.back.js'
            );
            const content = await qforms.Helper.getFileContent(customBackendJsFilePath);
            if (content) {
                const CustomClass = eval(content);
                return new CustomClass(data, parent);
            }
            return new DataSource(data, parent);
        } else {
            return new DataSource(data, parent);
        }
    }

    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = null;
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'dataSources', this.getName());
    }

    getJsonFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.json`);
    }

    async init() {
        // console.log('DataSource.init', this.getFullName());
        await super.init();
        this.keyColumns = this.getKeyColumns();
    }

    getKeyColumns() {
        const keyColumns = this.getItemNames('keyColumns');
        if (!keyColumns.length) throw new Error(`${this.getFullName()}: DataSource must have at least one key column`);
        return keyColumns;
    }

    prepareRows(rows) {
        if (rows[0]) {
            this.keyColumns.forEach(column => {
                if (!rows[0].hasOwnProperty(column)) {
                    throw new Error(`${this.getFullName()}: no column '${column}' in result set`);
                }
            });
        }
        if (this.parent instanceof qforms.Form && this.getName() === 'default') {
            for (let i = 0; i < rows.length; i++) {
                this.calcColumns(rows[i]);
            }
        }
        // DataSource.encodeRows(rows);
    }

    calcColumns(row) {
        for (const name in this.parent.fields) {
            const field = this.parent.fields[name];
            const columnName = field.getAttr('column');
            if (!columnName) {
                throw new Error(`[${this.getFullName()}]: no column name`);
            }
            if (row.hasOwnProperty(columnName)) {
            } else if (field.getAttr('value')) {
                field.calcValue(row);
            } else {
                throw new Error(`[${field.getFullName()}]: no column '${columnName}' in result set and no value property for calculation`);
            }
        }
    }

    static encodeRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            DataSource.encodeRow(rows[i]);
        }
    }

    static encodeRow(row) {
        // console.log('DataSource.encodeRow');
        for (const name in row) {
            /*if (row[name] instanceof Buffer) {
                row[name] = JSON.stringify(row[name].toString('base64'));
            }*/
            // row[name] = JSON.stringify(row[name]);
            row[name] = Helper.encodeValue(row[name]);
        }
    }

    getApp() {
        return this.parent.getApp();
    }

    getKeyValuesFromRow(row) {
        const values = {};
        this.keyColumns.forEach(column => {
            values[column] = row[column];
        });
        return values;
    }

    getKeyValuesFromKey(key) {
        const arr = JSON.parse(key);
        if (arr.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${arr.length} of ${this.keyColumns.length}`);
        }
        const values = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            values[column] = arr[i];
        }
        return values;
    }

    getKeyFromValues(values) {
        const arr = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) return null;
            arr.push(value);
        }
        return JSON.stringify(arr);
    }

    getFullName() {
        if (this.parent instanceof qforms.Form) {
            return [this.parent.getPage().getName(), this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof qforms.Page) {
            return [this.parent.getName(), this.getName()].join('.');
        } else {
            return this.getName();
        }
    }

    getParams(context) {
        return qforms.Application.getParams(context);
    }

    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string') throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        } else  if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        } else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }

    calcNewKeyValues(originalKeyValues, values) {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined) throw new Error(`no key column in values: ${name}`);
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

    async fill(context) {
        //console.log('DataSource.fill', this.getFullName());
        let response = await super.fill(context);
        // delete response.view;
        delete response.js;

        // keyColumns
        response.keyColumns = this.keyColumns;

        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }

    async getRows() {
        // console.log('DataSource.getRows');
        const jsonFilePath = this.getJsonFilePath();
        const exists = await qforms.Helper.exists(jsonFilePath);
        if (exists) {
            const content = await qforms.Helper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        }
        return [];
    }
}

module.exports = DataSource;
