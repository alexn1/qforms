"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const Model_1 = require("../Model");
const common_1 = require("../../../common");
class Form extends Model_1.Model {
    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.fields = [];
    }
    init() {
        // data sources
        this.createDataSources();
        // fields
        for (const data of this.data.fields) {
            const Class = common_1.Helper.getGlobalClass(data.class);
            if (!Class)
                throw new Error(`no ${data.class} class`);
            const field = new Class(data, this);
            field.init();
            this.fields.push(field);
        }
    }
    deinit() {
        // console.log('Form.deinit:', this.getFullName());
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
        // console.log('Form.onDataSourceRefresh', this.getFullName());
        this.emit('refresh', e);
    }
    onDataSourceInsert(e) {
        // console.log('Form.onDataSourceInsert', this.getFullName());
        this.parent.onFormInsert(e);
        this.emit('insert', e);
    }
    onDataSourceUpdate(e) {
        // console.log('Form.onDataSourceUpdate', this.getFullName());
        this.emit('update', e);
    }
    onDataSourceDelete(e) {
        // console.log('Form.onDataSourceDelete', this.getFullName());
        this.emit('delete', e);
    }
    async update() {
        console.log('Form.update', this.getFullName(), this.isChanged());
        if (this.getPage().deinited)
            throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows())
            throw new Error(`form model not changed or does not have new rows: ${this.getFullName()}`);
        await this.getDefaultDataSource().update();
    }
    isChanged() {
        // console.log('Form.isChanged', this.getFullName());
        return this.getDefaultDataSource().isChanged();
    }
    hasNew() {
        // console.log('Form.hasNew', this.getFullName());
        return this.getDefaultDataSource().hasNew();
    }
    async rpc(name, params) {
        console.log('Form.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const result = await this.getApp().request({
            uuid: this.getApp().getAttr('uuid'),
            action: 'rpc',
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
        return this.parent;
    }
    getApp() {
        return this.parent.parent;
    }
    async refresh() {
        await this.getDefaultDataSource().refresh();
    }
    getField(name) {
        return this.fields.find((field) => field.getName() === name);
    }
    hasDefaultPersistentDataSource() {
        return this.getDefaultDataSource().isPersistent();
    }
    decodeRow(row) {
        const values = {};
        for (const field of this.fields) {
            const column = field.getAttr('column');
            if (column) {
                values[column] = field.getValue(row);
            }
        }
        return values;
    }
}
exports.Form = Form;
