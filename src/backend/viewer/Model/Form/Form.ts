const path = require('path');

import { Model } from '../Model';
import { DataSource } from '../DataSource/DataSource';
import { BkAction } from '../Action/Action';
import { Field } from '../Field/Field';
import { BkPage } from '../Page/Page';
import { BkApplication } from '../Application/Application';
import { MyError } from '../../../MyError';

export class Form extends Model {
    dataSources: DataSource[] = [];
    actions: BkAction[] = [];
    fields: Field[] = [];

    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = ['dataSources', 'actions', 'fields'];
    }

    async init(context): Promise<void> {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('fields', context);
    }

    getDirPath(): string {
        return path.join(this.parent.getDirPath(), 'forms', this.getName());
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.visible = this.getAttr('visible');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
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
            id: 1,
        };
        for (const field of this.fields) {
            field.fillDefaultValue(context, row);
        }
        return {
            class: 'DataSource',
            name: 'default',
            keyColumns: ['id'],
            rows: [row],
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
        return query
            .replace(/\{([@\w\.]+)\}/g, (text, name) => {
                if (name.indexOf('.') !== -1) {
                    const arr = name.split('.');
                    if (arr[0] === 'this') {
                        arr[0] = this.getPage().getName();
                    }
                    return '{' + arr.join('.') + '}';
                }
                return text;
            })
            .replace(/\[([@\w\.]+)\]/g, (text, name) => {
                if (name.indexOf('.') !== -1) {
                    const arr = name.split('.');
                    if (arr[0] === 'this') {
                        arr[0] = this.getPage().getName();
                    }
                    return '[' + arr.join('.') + ']';
                }
                return text;
            });
    }

    async rpc(name, context) {
        console.log('Form.rpc', name, context.getBody());
        if (this[name]) return await this[name](context);
        throw new MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }

    getApp(): BkApplication {
        return this.parent.parent;
    }

    getPage(): BkPage {
        return this.parent;
    }

    getFullName(): string {
        return `${this.getPage().getName()}.${this.getName()}`;
    }
    isNewMode(context): boolean {
        return !!context.getBody().newMode;
    }
    getField(name): Field | undefined {
        return this.fields.find((field) => field.getName() === name);
    }
    getDataSource(name): DataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
}
