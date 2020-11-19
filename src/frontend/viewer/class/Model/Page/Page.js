class Page extends Model {
    constructor(data, parent, options) {
        if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.parentPageName = options.parentPageName || null;
        this.id             = options.id;
        this.params         = (options.params !== undefined) ? options.params : {};
        this.dataSources    = {};
        this.forms          = {};
        this.modal          = !!options.modal;
    }

    init() {
        this.initParams();
        for (const name in this.data.dataSources) {
            const data = this.data.dataSources[name];
            this.dataSources[name] = eval(`new ${data.class}(data, this)`);
            this.dataSources[name].init();
        }
        for (const name in this.data.forms) {
            const data = this.data.forms[name];
            this.forms[name] = eval(`new ${data.class}(data, this)`);
            this.forms[name].init();
        }
        // console.log('page params:', this.params);
    }

    deinit() {
        // console.log('Page.deinit', this.getFullName());
        if (this.deinited) throw new Error(`page ${this.getFullName()} is already deinited`);
        for (const name in this.dataSources) {
            this.dataSources[name].deinit();
        }
        for (const name in this.forms) {
            this.forms[name].deinit();
        }
        super.deinit();
    }

    initParams() {
        // params defined during data source filling on the server
        if (this.data.params !== undefined) {
            for (const name in this.data.params) {
                this.params[name] = this.data.params[name];
            }
        }
    }

    async update() {
        console.log('Page.update', this.getFullName());
        for (const name in this.forms) {
            const form = this.forms[name];
            if (form.isChanged() || form.hasNew()) await form.update();
        }
    }

    discard() {
        console.log('Page.discard', this.getFullName());
        for (const name in this.forms) {
            this.forms[name].discard();
        }
    }

    getKey() {
        for (const name in this.forms) {
            const form = this.forms[name];
            if (form.getClassName() === 'RowForm') {
                return form.getKey();
            }
        }
        return null;
    }

    hasRowFormWithDefaultDs() {
        let result = false;
        for (const formName in this.forms) {
            const form = this.forms[formName].data;
            if (form.class === 'RowForm') {
                if (form.dataSources['default']) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    hasRowFormWithDefaultSqlDataSource() {
        for (const name in this.forms) {
            const form = this.forms[name];
            if (form.getClassName() === 'RowForm') {
                if (form.getDataSource().getClassName() === 'SqlDataSource') {
                    return true;
                }
            }
        }
        return false;
    }

    hasRowForm() {
        for (const formName in this.forms) {
            const form = this.forms[formName];
            if (form.getClassName() === 'RowForm') return true;
        }
        return false;
    }

    hasTableForm() {
        for (const formName in this.forms) {
            const form = this.forms[formName];
            if (form.getClassName() === 'TableForm') {
                return true;
            }
        }
        return false;
    }

    isNewMode() {
        return this.data.newMode;
    }

    hasNew() {
        for (const name in this.forms) {
            if (this.forms[name].hasNew()) {
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
        console.log('Page.rpc', this.getFullName(), name, params);
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
}
