'use strict';

const path    = require('path');
const qforms = require('../../../qforms');
const Model  = require('../Model');
const BaseModel = require('../../../common/BaseModel');

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
                `${name}.backend.js`
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
        this.keyColumns       = null;
        // this.parentKeyColumns = null;
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
        this.keyColumns       = this.getKeyColumns();
        // this.parentKeyColumns = this.getParentKeyColumns();
    }

    getKeyColumns() {
        if (this.data.keyColumns === undefined || Object.keys(this.data.keyColumns).length === 0) {
            throw new Error(`${this.getFullName()}: DataSource must have at least one key column`);
        }
        return Object.keys(this.data.keyColumns);
    }

    /*getParentKeyColumns() {
        return this.data.parentKeyColumns ? Object.keys(this.data.parentKeyColumns) : [];
    }*/

    checkColumn(row, column) {
        if (!row.hasOwnProperty(column)) {
            throw new Error(`${this.getFullName()}: no column '${column}' in result set`);
        }
    }

    checkAndCalcColumns(row) {
        // console.log('DataSource.checkAndCalcColumns', this.getFullName());
        this.keyColumns.forEach(column => {
            this.checkColumn(row, column);
        });
        /*this.parentKeyColumns.forEach(column => {
            this.checkColumn(row, column);
        });*/
        if (!(this.parent instanceof qforms.Form) || this.getName() !== 'default') return;
        Object.keys(this.parent.fields).forEach(name => {
            const field = this.parent.fields[name];
            const columnName = field.getAttr('column');
            if (!columnName) {
                throw new Error(`[${this.getFullName()}]: no column name`);
            }
            if (row.hasOwnProperty(columnName)) {
                if (
                    this.parent instanceof qforms.TableForm &&
                    row[columnName] !== null &&
                    typeof row[columnName] === 'string'
                ) {
                    row[columnName] = qforms.Helper.escapeHtml(row[columnName]);
                }
            } else if (field.getAttr('value')) {
                field.calcValue(row);
            } else {
                throw new Error(`[${this.getFullName()}]: need column or value.`);
            }
        });
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
        return this.getApp().getParams(context);
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
        let data = await super.fill(context);
        delete data.view;
        delete data.js;

        // keyColumns
        data.keyColumns = this.keyColumns;

        // parentKeyColumns
        /*if (this.parentKeyColumns.length > 0) {
            data.parentKeyColumns = this.parentKeyColumns;
        }*/

        // rows from JSON file
        data.rows = await this.getRows();
        return data;
    }

    async getRows() {
        // console.log('DataSource.getRows');
        const jsonFilePath = this.getJsonFilePath();
        const exists = await qforms.Helper.exists(jsonFilePath);
        if (exists) {
            const content = await qforms.Helper.readFile(jsonFilePath);
            return JSON.parse(content);
        }
        return [];
    }
}

module.exports = DataSource;
