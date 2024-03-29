import path from 'path';

import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkField } from '../BkField/BkField';
import { BkPage } from '../BkPage/BkPage';
import { BkApplication } from '../BkApplication/BkApplication';
import { HttpError } from '../../../HttpError';
import { Context } from '../../../Context';
import { JSONString, RawRow } from '../../../../types';
import { debug } from '../../../../console';
import { FormScheme } from '../../../common/Scheme/FormScheme';
import { FormData } from '../../../../common/ModelData/FormData';
import { DataSourceData } from '../../../../common';

export class BkForm<TFormScheme extends FormScheme = FormScheme> extends BkModel<TFormScheme> {
    dataSources: BkDataSource[] = [];
    actions: BkAction[] = [];
    fields: BkField[] = [];

    constructor(data: TFormScheme, parent: BkPage) {
        super(data, parent);
        this.fillCollections = ['dataSources', 'actions', 'fields'];
    }

    async init(context: Context): Promise<void> {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('fields', context);
    }

    getDirPath(): string {
        return path.join(this.getParent<BkPage>().getDirPath(), 'forms', this.getName());
    }

    fillAttributes(response: FormData): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.visible = this.getAttr('visible');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }

    async fill(context: Context): Promise<FormData> {
        // debug('Form.fill', this.constructor.name, this.getFullName());
        if (this.findDataSource('default')) {
            return (await super.fill(context)) as FormData;
        }

        // surrogate data source response
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context);
        const response = (await super.fill(context)) as FormData;
        response.dataSources.push(dataSourceResponse);

        return response;
    }

    _getSurrogateDataSourceResponse(context: Context): DataSourceData {
        const row = {} as RawRow;
        row['id'] = '[1]' as JSONString;

        for (const field of this.fields) {
            field.fillDefaultValue(context, row);
        }
        return {
            class: 'DataSource',
            name: 'default',
            keyColumns: ['id'],
            rows: [row],
        } as DataSourceData;
    }

    dumpRowToParams(row: RawRow, context: Context) {
        for (const field of this.fields) {
            if (field.isParam()) {
                field.dumpRowValueToParams(row, context);
            }
        }
        // debug(params);
    }

    replaceThis(context: Context, query: string): string {
        return query
            .replace(/\{([@\w.]+)\}/g, (text, name) => {
                if (name.indexOf('.') !== -1) {
                    const arr = name.split('.');
                    if (arr[0] === 'this') {
                        arr[0] = this.getPage().getName();
                    }
                    return '{' + arr.join('.') + '}';
                }
                return text;
            })
            .replace(/\[([@\w.]+)\]/g, (text, name) => {
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

    async rpc(name: string, context: Context) {
        debug('BkForm.rpc', name, context.getBody());
        if (this[name]) return await this[name](context);
        throw new HttpError({
            message: `no remote proc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }

    getApp(): BkApplication {
        return this.getParent().getParent();
    }

    getPage(): BkPage {
        return this.getParent();
    }

    getFullName(): string {
        return `${this.getPage().getName()}.${this.getName()}`;
    }

    isNewMode(context: Context): boolean {
        return BkPage.getNewModeFromContext(context);
    }

    findField(name: string): BkField | undefined {
        return this.fields.find((field) => field.getName() === name);
    }

    getField(name: string): BkField {
        const field = this.findField(name);
        if (!field) throw new Error(`${this.getFullName()}: no field ${name}`);
        return field;
    }

    findDataSource(name: string): BkDataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getDataSource(name: string): BkDataSource {
        const ds = this.findDataSource(name);
        if (!ds) throw new Error(`${this.getFullName()}: no data source ${name}`);
        return ds;
    }
}
