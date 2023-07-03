import { Model } from '../Model';
import { PageData } from '../../../../data';
import { DataSource } from '../DataSource/DataSource';
import { Helper } from '../../../common/Helper';
import { Form } from '../Form/Form';
import { RowForm } from '../Form/RowForm/RowForm';
import { Key } from '../../../../types';
import { Application } from '../Application/Application';

export interface PageOptions {
    id?: string;
    modal?: boolean;
    newMode?: boolean;
    selectMode?: boolean;
    selectedKey?: Key;
    params?: Record<string, any>;
    onCreate?: (page: Page) => void | Promise<void>;
    onSelect?: (key: Key | null) => void | Promise<void>;
    onClose?: () => void | Promise<void>;
}

export class Page extends Model<PageData> {
    dataSources: any[] = [];
    forms: Form[] = [];
    params: Record<string, any> = {};

    constructor(data: PageData, parent: Application, private options: PageOptions) {
        // console.log('Page.constructor', options);
        // if (!options.id) throw new Error('no page id');
        super(data, parent);
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
        // console.log('Page.deinit', this.getFullName());
        if (this.deinited) throw new Error(`page ${this.getFullName()} is already deinited`);
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
            const FormClass = Helper.getGlobalClass(Model.getClassName(data));
            if (!FormClass) throw new Error(`no ${Model.getClassName(data)} class`);
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
        return {
            ...(this.options.params || {}),
            ...this.params,
        };
    }

    setParam(name: string, value: any) {
        // console.log('Page.setParam', name);
        this.params[name] = value !== undefined ? value : null;
    }

    async update() {
        console.log('Page.update', this.getFullName());
        for (const form of this.forms) {
            if (form.isChanged() || form.hasNew()) {
                await form.update();
            }
        }
    }

    discard() {
        console.log('Page.discard', this.getFullName());
        for (const form of this.forms) {
            if (form instanceof RowForm) {
                form.discard();
            }
        }
    }

    getKey(): Key | null {
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

    getApp(): Application {
        return this.getParent() as Application;
    }

    isModal() {
        return !!this.options.modal;
    }

    onFormInsert(e) {
        console.log('Page.onFormInsert', e);
        for (const key of e.inserts) {
            const keyParams = DataSource.keyToParams(key); // key params to page params
            for (const name in keyParams) {
                this.setParam(name, keyParams[name]);
            }
        }
    }

    async rpc(name: string, params) {
        // console.log('Page.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.getApp().request({
            uuid: this.getApp().getAttr('uuid'),
            action: 'rpc',
            page: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }

    findForm<TForm extends Form = Form>(name: string): TForm | undefined {
        return this.forms.find((form) => form.getName() === name) as TForm;
    }

    getForm<TForm extends Form = Form>(name: string): TForm {
        const form = this.findForm<TForm>(name);
        if (!form) throw new Error(`${this.getFullName()}: no form ${name}`);
        return form;
    }

    isSelectMode() {
        return !!this.options.selectMode;
    }

    isFormInTab() {
        return this.isAttr('formInTab') && this.getAttr('formInTab') === 'true';
    }
}

Helper.registerGlobalClass(Page);
