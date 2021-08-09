class Page extends Model {
    constructor(data, parent, options) {
        // console.log('Page.constructor', options);
        if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.options     = options; // {id, modal, params}
        this.dataSources = [];
        this.forms       = [];
        this.params      = {};
        if (options.onCreate) {
            options.onCreate(this);
        }
    }

    init() {
        this.createDataSources();

        // forms
        for (const data of this.data.forms) {
            const FormClass = FrontHostApp.getClassByName(Model.getClassName(data));
            const form = new FormClass(data, this);
            form.init();
            this.forms.push(form);
        }
        console.log('page params:', this.getFullName(), this.getParams());
    }

    deinit() {
        // console.log('Page.deinit', this.getFullName());
        if (this.deinited) throw new Error(`page ${this.getFullName()} is already deinited`);
        this.deinitDataSources();
        for (const form of this.forms) {
            form.deinit();
        }
        super.deinit();
    }

    getId() {
        return this.options.id;
    }

    getParams() {
        return {
            ...(this.options.params !== undefined ? this.options.params : {}),
            ...this.params,
        };
    }

    addParam(name, value) {
        // console.log('Page.addParam', name);
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
            form.discard();
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
            if (form.getClassName() === 'RowForm' && form.hasDefaultSqlDataSource()) {
                return true;
            }
        }
        return false;
    }

    hasRowForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm') return true;
        }
        return false;
    }

    hasTableForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'TableForm') {
                return true;
            }
        }
        return false;
    }

    isNewMode() {
        return this.getAttr('newMode');
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
        return this.parent;
    }

    getFullName() {
        return `${this.getName()}(${this.getId()})`;
    }

    isModal() {
        // return this.modal;
        return !!this.options.modal;
    }

    onFormInsert(e) {
        console.log('Page.onFormInsert', e);
        for (const key of e.changes) {
            const keyParams = DataSource.keyToParams(key);// key params to page params
            for (const name in keyParams) {
                this.addParam(name, keyParams[name]);
            }
        }
    }
    async rpc(name, params) {
        // console.log('Page.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result =  await this.getApp().request({
            action: 'rpc',
            page  : this.getName(),
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }
    getForm(name) {
        return this.forms.find(form => form.getName() === name);
    }
}
window.QForms.Page = Page;
