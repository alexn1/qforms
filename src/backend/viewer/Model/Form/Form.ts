const path  = require('path');
import Model from '../Model';
import DataSource from '../DataSource/DataSource';
import Action from '../Action/Action';
import Field from '../Field/Field';

class Form extends Model {
    dataSources: DataSource[];
    actions: Action[];
    fields: Field[];

    static async create(data, parent) {
        throw new Error('Form is abstract');
    }

    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = ['dataSources', 'actions', 'fields'];
        this.dataSources     = [];
        this.actions         = [];
        this.fields          = [];
    }

    async init() {
        await this.createColItems('dataSources');
        await this.createColItems('actions');
        await this.createColItems('fields');
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'forms', this.getName());
    }

    async fill(context) {
        // console.log('Form.fill', this.constructor.name, this.getFullName());
        if (this.getDataSource('default')) {
            return super.fill(context);
        }

        // surrogate data source response
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        const response = await super.fill(context);
        response.dataSources.push(dataSourceResponse);

        return response;
    }

    /*getDefaultDataSource() {
        return this.getDataSource('default');
    }*/

    _getSurrogateDataSourceResponse(context) {
        const row = {
            id: 1
        };
        for (const field of this.fields) {
            field.fillDefaultValue(context, row);
        }
        return {
            class     : 'DataSource',
            name      : 'default',
            keyColumns: ['id'],
            rows      : [row],
        };
    }

    dumpRowToParams(row, params) {
        for (const field of this.fields) {
            if (field.isParam()) {
                field.dumpRowValueToParams(row, params);
            }
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
        const dataSource = this.getDataSource('default');
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
        console.log('Form.rpc', name, context.params);
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
    getField(name) {
        return this.fields.find(field => field.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}

export = Form;
