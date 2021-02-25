const path  = require('path');
const Model = require('../Model');

class Form extends Model {

    static async create(data, parent) {
        throw new Error('Form is abstract');
    }

    constructor(data, parent) {
        super(data, parent);
        this.fillCollections   = ['dataSources', 'fields', 'actions'];
        this.dataSources       = {};
        this.fields            = {};
        this.actions           = {};
    }

    /*getCustomViewFilePath() {
        return path.join(this.getDirPath(),  `${this.getName()}.ejs`);
    }*/

    async init() {
        await this.createCollection('dataSources');
        await this.createCollection('fields');
        await this.createCollection('actions');
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'forms', this.getName());
    }

    async fill(context) {
        // console.log('Form.fill', this.constructor.name, this.getFullName());
        if (this.data.dataSources.default) {
            return super.fill(context);
        }
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        const data = await super.fill(context);
        data.dataSources.default = dataSourceResponse;
        return data;
    }

    getDataSource() {
        return this.dataSources.default;
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
            // dumpFirstRowToParams: 'false',
            keyColumns          : ['id'],
            rows                : [row],
            // database            : '',
            // table               : '',
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
                    arr[0] = this.getPage().getName();
                } else if (arr[0] === 'parent' && context.parentPageName) {
                    arr[0] = context.parentPageName;
                }
                return '{' + arr.join('.') + '}';
            }
            return text;
        });
    }

    async update(context) {
        console.log('Form.update', this.getFullName());
        const dataSource = this.dataSources.default;
        const cnn = await dataSource.getDatabase().getConnection(context);
        try {
            await dataSource.getDatabase().beginTransaction(cnn);
            const result = await dataSource.update(context);
            await dataSource.getDatabase().commit(cnn);
            return result;
        } catch (err) {
            await dataSource.getDatabase().rollback(cnn, err);
            throw err;
        }
    }

    async rpc(name, context) {
        console.log('Form.rpc', name);
        if (this[name]) return await this[name](context);
        return {errorMessage: `no rpc ${name}`};
    }

    getApp() {
        return this.parent.parent;
    }

    getPage() {
        return this.parent;
    }

    getFullName() {
        return `${this.getPage().getName()}.${this.getName()}`;
    }
    isNewMode(context) {
        return !!context.newMode;
    }

}

module.exports = Form;
