"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const Model_1 = require("../Model");
const common_1 = require("../../../common");
class Form extends Model_1.Model {
    constructor() {
        super(...arguments);
        this.dataSources = [];
        this.fields = [];
    }
    /* constructor(data, parent) {
        super(data, parent);
    } */
    init() {
        // data sources
        this.createDataSources();
        // fields
        for (const data of this.getData().fields) {
            const Class = common_1.Helper.getGlobalClass(data.class);
            if (!Class)
                throw new Error(`no ${data.class} class`);
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
    fillDefaultValues(row) {
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
        if (this.getPage().deinited)
            throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows())
            throw new Error(`form model not changed or does not have new rows: ${this.getFullName()}`);
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
    async rpc(name, params) {
        console.debug('Form.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const result = await this.getApp().request('post', {
            action: 'rpc',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getPage().getName(),
            form: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage)
            throw new Error(result.errorMessage);
        return result;
    }
    getKey() {
        return null;
    }
    getDefaultDataSource() {
        const dataSource = this.getDataSource('default');
        if (!dataSource)
            throw new Error(`${this.getFullName()}: no default data source`);
        return dataSource;
    }
    getPage() {
        return this.getParent();
    }
    getApp() {
        return this.getPage().getApp();
    }
    async refresh() {
        await this.getDefaultDataSource().refresh();
    }
    findField(name) {
        return this.fields.find((field) => field.getName() === name);
    }
    getField(name) {
        const field = this.findField(name);
        if (!field)
            throw new Error(`${this.getFullName()}: no field ${name}`);
        return field;
    }
    hasDefaultPersistentDataSource() {
        return this.getDefaultDataSource().isPersistent();
    }
    decodeRow(rawRow) {
        const row = {};
        for (const field of this.fields) {
            const column = field.getAttr('column');
            if (column) {
                row[column] = field.getValue(rawRow);
            }
        }
        return row;
    }
}
exports.Form = Form;
