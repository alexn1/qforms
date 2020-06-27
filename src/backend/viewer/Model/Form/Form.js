'use strict';

const path    = require('path');
const Model = require('../Model');

class Form extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.page               = parent;
        this.dirPath            = path.join(this.parent.dirPath, 'forms', this.name);
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
        this.createCollections  = ['dataSources', 'fields', 'controls', 'actions'];
        this.fillCollections    = ['dataSources', 'fields', 'controls', 'actions'];
        this.dataSources        = {};
        this.fields             = {};
        this.controls           = {};
        this.actions            = {};
    }

    static async create(data, parent) {
        throw new Error('Form is abstract');
    }

    async fill(context) {
        // console.log('Form.fill', this.constructor.name, this.name);
        if (this.data.dataSources.default) {
            return super.fill(context);
        }
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        const data = await super.fill(context);
        data.dataSources.default = dataSourceResponse;
        return data;
    }

    _getSurrogateDataSourceResponse(context) {
        const row = {
            id: 1
        };
        for (const name in this.fields) {
            this.fields[name].fillDefaultValue(context, row);
        }
        return {
            class               : 'DataSource',
            name                : 'default',
            database            : '',
            table               : '',
            access              : {
                select: true,
                insert: true,
                update: true,
                delete: true
            },
            keyColumns          : ['id'],
            dumpFirstRowToParams: 'false',
            rows                : [row]
        };
    }

    dumpRowToParams(row, params) {
        for (const name in this.fields) {
            this.fields[name].dumpRowValueToParams(row, params);
        }
        //console.log(params);
    }

    replaceThis(context, query) {
        return query.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                const arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.page.name;
                } else if (arr[0] === 'parent' && context.parentPageName) {
                    arr[0] = context.parentPageName;
                }
                return '{' + arr.join('.') + '}';
            }
            return text;
        });
    }

    async update(context, ds) {
        console.log('Form.update', this.name);
        const dataSource = this.dataSources[ds];
        const cnn = await dataSource.database.getConnection(context);
        try {
            await dataSource.database.beginTransaction(cnn);
            const result = await dataSource.update(context);
            await dataSource.database.commit(cnn);
            return result;
        } catch (err) {
            await dataSource.database.rollback(cnn, err);
            throw err;
        }
    }

    async rpc(context, name, params) {
        console.log('Form.rpc', name, params);
        if (this[name]) return this[name](params);
        return {errorMessage: `no rpc ${name}`};
    }

    getApp() {
        return this.parent.parent;
    }

}


module.exports = Form;
