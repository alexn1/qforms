import { Model } from '../Model';
import { Helper } from '../../../common';
import { DataSource } from '../../Model/DataSource/DataSource';
import { Field } from '../../Model/Field/Field';
import { Key, RawRow, Row, Scalar } from '../../../../types';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';

export class Form extends Model {
    dataSources: DataSource[] = [];
    fields: Field[] = [];

    /* constructor(data, parent) {
        super(data, parent);
    } */

    init() {
        // data sources
        this.createDataSources();

        // fields
        for (const data of this.getData().fields) {
            const Class = Helper.getGlobalClass(data.class);
            if (!Class) throw new Error(`no ${data.class} class`);
            const field = new Class(data, this);
            field.init();
            this.fields.push(field);
        }
    }

    deinit() {
        // console.debug('Form.deinit:', this.getFullName());
        this.deinitDataSources();
        for (const field of this.fields) {
            field.deinit();
        }
        super.deinit();
    }

    fillDefaultValues(row: RawRow) {
        for (const field of this.fields) {
            field.fillDefaultValue(row);
        }
    }

    onDataSourceRefresh(e) {
        // console.debug('Form.onDataSourceRefresh', this.getFullName());
        this.emit('refresh', e);
    }

    onDataSourceInsert(e) {
        // console.debug('Form.onDataSourceInsert', this.getFullName());
        this.getPage().onFormInsert(e);
        this.emit('insert', e);
    }

    onDataSourceUpdate(e) {
        // console.debug('Form.onDataSourceUpdate', this.getFullName());
        this.emit('update', e);
    }

    onDataSourceDelete(e) {
        // console.debug('Form.onDataSourceDelete', this.getFullName());
        this.emit('delete', e);
    }

    async update() {
        console.debug('Form.update', this.getFullName(), this.isChanged());
        if (this.getPage().deinited) throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows())
            throw new Error(
                `form model not changed or does not have new rows: ${this.getFullName()}`,
            );
        await this.getDefaultDataSource().update();
    }

    isChanged() {
        // console.debug('Form.isChanged', this.getFullName());
        return this.getDefaultDataSource().isChanged();
    }

    hasNew() {
        // console.debug('Form.hasNew', this.getFullName());
        return this.getDefaultDataSource().hasNew();
    }

    async rpc(name: string, params: Record<string, Scalar>) {
        console.debug('Form.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.getApp().request('POST', {
            action: 'rpc',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getPage().getName(),
            form: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }

    getKey(): Key | null {
        return null;
    }

    getDefaultDataSource<TDataSource extends DataSource = DataSource>(): TDataSource {
        const dataSource = this.getDataSource('default');
        if (!dataSource) throw new Error(`${this.getFullName()}: no default data source`);
        return dataSource as TDataSource;
    }

    getPage(): Page {
        return this.getParent() as Page;
    }

    getApp(): Application {
        return this.getPage().getApp();
    }

    async refresh() {
        await this.getDefaultDataSource().refresh();
    }

    findField(name: string): Field | undefined {
        return this.fields.find((field) => field.getName() === name);
    }

    getField(name: string): Field {
        const field = this.findField(name);
        if (!field) throw new Error(`${this.getFullName()}: no field ${name}`);
        return field;
    }

    hasDefaultPersistentDataSource() {
        return this.getDefaultDataSource().isPersistent();
    }

    decodeRow(rawRow: RawRow): Row {
        const row = {} as Row;
        for (const field of this.fields) {
            const column = field.getAttr('column');
            if (column) {
                row[column] = field.getValue(rawRow);
            }
        }
        return row;
    }
}
