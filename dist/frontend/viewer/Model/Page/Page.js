"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const Model_1 = require("../Model");
const DataSource_1 = require("../DataSource/DataSource");
const Helper_1 = require("../../../common/Helper");
const RowForm_1 = require("../Form/RowForm/RowForm");
class Page extends Model_1.Model {
    constructor(data, parent, options) {
        // console.debug('Page.constructor', options);
        // if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.options = options;
        this.dataSources = [];
        this.forms = [];
        this.params = {};
        if (options.onCreate) {
            options.onCreate(this);
        }
    }
    init() {
        this.createDataSources();
        this.createForms();
        console.debug('page options:', this.options);
        console.debug('page params:', this.getParams());
    }
    deinit() {
        // console.debug('Page.deinit', this.getFullName());
        if (this.deinited)
            throw new Error(`page ${this.getFullName()} is already deinited`);
        this.deinitDataSources();
        this.deinitForms();
        super.deinit();
    }
    getOptions() {
        return this.options;
    }
    createForms() {
        // forms
        for (const data of this.getData().forms) {
            const FormClass = Helper_1.Helper.getGlobalClass(Model_1.Model.getClassName(data));
            if (!FormClass)
                throw new Error(`no ${Model_1.Model.getClassName(data)} class`);
            const form = new FormClass(data, this);
            form.init();
            this.forms.push(form);
        }
    }
    deinitForms() {
        for (const form of this.forms) {
            form.deinit();
        }
    }
    /*getId() {
        return this.options.id;
    }*/
    getParams() {
        return Object.assign(Object.assign({}, (this.options.params || {})), this.params);
    }
    setParam(name, value) {
        // console.debug('Page.setParam', name);
        this.params[name] = value !== undefined ? value : null;
    }
    async update() {
        console.debug('Page.update', this.getFullName());
        for (const form of this.forms) {
            if (form.isChanged() || form.hasNew()) {
                await form.update();
            }
        }
    }
    discard() {
        console.debug('Page.discard', this.getFullName());
        for (const form of this.forms) {
            if (form instanceof RowForm_1.RowForm) {
                form.discard();
            }
        }
    }
    getKey() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm') {
                return form.getKey();
            }
        }
        return null;
    }
    hasRowFormWithDefaultDs() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.getDefaultDataSource()) {
                return true;
            }
        }
        return false;
    }
    hasRowFormWithDefaultSqlDataSource() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.hasDefaultPersistentDataSource()) {
                return true;
            }
        }
        return false;
    }
    hasRowForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.getAttr('visible') === 'true') {
                return true;
            }
        }
        return false;
    }
    hasTableForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'TableForm' && form.getAttr('visible') === 'true') {
                return true;
            }
        }
        return false;
    }
    isNewMode() {
        return !!this.options.newMode;
    }
    hasNew() {
        for (const form of this.forms) {
            if (form.hasNew()) {
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.getParent();
    }
    isModal() {
        return !!this.options.modal;
    }
    onFormInsert(e) {
        console.debug('Page.onFormInsert', e);
        for (const key of e.inserts) {
            const keyParams = DataSource_1.DataSource.keyToParams(key); // key params to page params
            for (const name in keyParams) {
                this.setParam(name, keyParams[name]);
            }
        }
    }
    async rpc(name, params) {
        // console.debug('Page.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const result = await this.getApp().request('POST', {
            action: 'rpc',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage)
            throw new Error(result.errorMessage);
        return result;
    }
    findForm(name) {
        return this.forms.find((form) => form.getName() === name);
    }
    getForm(name) {
        const form = this.findForm(name);
        if (!form)
            throw new Error(`${this.getFullName()}: no form ${name}`);
        return form;
    }
    isSelectMode() {
        return !!this.options.selectMode;
    }
    isFormInTab() {
        return this.isAttr('formInTab') && this.getAttr('formInTab') === 'true';
    }
}
exports.Page = Page;
Helper_1.Helper.registerGlobalClass(Page);
