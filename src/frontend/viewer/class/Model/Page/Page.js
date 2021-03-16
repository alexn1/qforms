class Page extends Model {
    constructor(data, parent, options) {
        if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.parentPageName = options.parentPageName || null;
        this.id             = options.id;
        this.params         = (options.params !== undefined) ? options.params : {};
        this.dataSources    = [];
        this.forms          = [];
        this.modal          = !!options.modal;
    }

    init() {
        this.initParams();
        this.createDataSources();
        for (const data of this.data.forms) {
            const form = eval(`new ${data.class}(data, this)`);
            form.init();
            this.forms.push(form);
        }
        // console.log('page params:', this.params);
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

    initParams() {
        // params defined during data source filling on the server
        if (this.data.params !== undefined) {
            for (const data of this.data.params) {
                const name = data.name;
                this.params[name] = data;
            }
        }
    }

    async update() {
        console.log('Page.update', this.getFullName());
        for (const form of this.forms) {
            if (form.isChanged() || form.hasNew()) await form.update();
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
            if (form.getClassName() === 'RowForm' && form.getDefaultDataSource().getClassName() === 'SqlDataSource') {
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
        return `${this.getName()}(${this.id})`;
    }

    isModal() {
        return this.modal;
    }

    onFormInsert(e) {
        console.log('Page.onFormInsert', e);
        for (const name in e.keyParams) {
            this.params[name] = e.keyParams[name];
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
        if (result.errorMessage) throw new Error(`rpc error: ${result.errorMessage}`);
        return result;
    }
}
