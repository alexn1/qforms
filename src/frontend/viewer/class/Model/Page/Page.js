'use strict';

class Page extends Model {
    constructor(options) {
        super(options.data, options.app);
        this.parentPageName = options.parentPageName || null;
        this.id             = null;
        this.params         = (options.params !== undefined) ? options.params : {};
        this.dataSources    = {};
        this.forms          = {};
    }

    init() {
        this.initParams();
        for (const name in this.data.dataSources) {
            const data = this.data.dataSources[name];
            this.dataSources[name] = eval(`new ${data.class}(data, this)`);
            this.dataSources[name].init();
        }
        for (const formName in this.data.forms) {
            const form = this.data.forms[formName];
            this.forms[formName] = eval(`new ${form.class}(formName, this, form)`);
            this.forms[formName].init();
        }
    }

    deinit() {
        console.log('Page.deinit', this.getName());
        if (this.deinited) throw new Error(`page ${this.getName()} is already deinited`);
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
        console.log('Page.update', this.getName());
        for (const name in this.forms) {
            const form = this.forms[name];
            if (form.isChanged()) await form.update();
        }
    }

    discard() {
        console.log('Page.discard', this.getName());
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

    isThereARowFormWithDefaultDs() {
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

    isThereARowFormWithDefaultDsAndTable() {
        let result = false;
        for (const formName in this.forms) {
            const form = this.forms[formName].data;
            if (form.class === 'RowForm') {
                if (form.dataSources['default']['table'] !== '') {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    isThereARowForm() {
        let result = false;
        for (const formName in this.forms) {
            const form = this.forms[formName].data;
            if (form.class === 'RowForm') {
                result = true;
                break;
            }
        }
        return result;
    }

    isThereATableFormOrTreeForm() {
        let result = false;
        for (const formName in this.forms) {
            const form = this.forms[formName].data;
            if (form.class === 'TableForm' || form.class === 'TreeForm') {
                result = true;
                break;
            }
        }
        return result;
    }

    isNewMode() {
        return this.data.newMode;
    }

    getApp() {
        return this.parent;
    }

}
