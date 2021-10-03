class PageController extends Controller {

    static create(model, parent) {
        // console.log('PageController.create', model.getName());
        const CustomClass = FrontHostApp.getClassByName(`${model.getName()}PageController`);
        const Class = CustomClass ? CustomClass : PageController;
        return new Class(model, parent);
    }

    constructor(model, parent) {
        //console.log('PageController.constructor', model);
        super(model, parent);
        this.forms = [];
    }

    init() {
        for (const form of this.model.forms) {
            const ctrl = FormController.create(form, this);
            ctrl.init();
            this.forms.push(ctrl);
        }
    }

    deinit() {
        console.log('PageController.deinit: ' + this.model.getFullName());
        for (const form of this.forms) {
            form.deinit();
        }
        super.deinit();
    }

    onSaveAndCloseClick = async () => {
        console.log('PageController.onSaveAndCloseClick');
        this.validate();
        if (this.isValid()) {
            try {
                this.getApp().getView().disableRerender();
                await this.getModel().update();
                console.log('page model updated', this.getModel().getFullName());
            } finally {
                this.getApp().getView().enableRerender();
            }
            this.getApp().closePage(this);
        } else {
            await this.rerender();
        }
    }

    onClosePageClick = () => {
        console.log('PageController.onClosePageClick', this.getModel().getFullName());
        this.close();
    }

    close() {
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = confirm(this.model.getApp().getText().form.areYouSure);
            if (!result) return;
        }
        this.getApp().closePage(this);
    }
    validate() {
        for (const form of this.forms) {
            if (form instanceof RowFormController) {
                form.validate();
                form.invalidate();
            }
        }
    }
    isValid() {
        // console.log('PageController.isValid', this.model.getFullName());
        for (const form of this.forms) {
            if (!form.isValid()) {
                return false;
            }
        }
        return true;
    }
    async onFormChange(e) {
        // console.log('PageController.onFormChange', this.model.getFullName());
        this.rerender();
    }
    onFormDiscard(formController) {
        console.log('PageController.onFormDiscard', this.model.getFullName());
        this.rerender();
    }

    onFormUpdate(e) {
        console.log('PageController.onFormUpdate:', this.model.getFullName(), e);
        this.rerender();
    }

    onFormInsert(e) {
        console.log('PageController.onFormInsert:', this.model.getFullName());
        // console.log('hasNew:', this.model.hasNew());
        for (const form of this.forms) {
            form.invalidate();
        }
        this.rerender();
    }

    async openPage(options) {
        if (!options.params) {
            options.params = {};
        }
        const params =  this.getModel().getParams();
        for (const name in params) {
            if (!options.params[name]) {
                options.params[name] = params[name];
            }
        }
        return await this.getApp().openPage(options);
    }

    isChanged() {
        // console.log('PageController.isChanged', this.model.getFullName());
        for (const form of this.forms) {
            if (form.isChanged()) {
                // console.log(`FORM CHANGED: ${form.model.getFullName()}`);
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.parent;
    }
    getViewClass() {
        return PageView;
    }
    static createLink(params = null) {
        // const query = window.location.search.split('?')[1];
        // console.log('query:', query);
        if (params) {
            return [
                window.location.pathname,
                [
                    // ...(query ? query.split('&') : []),
                    ...(ApplicationController.isInDebugMode() ? ['debug=1'] : []),
                    ...Object.keys(params).map(name => `${name}=${encodeURI(params[name])}`)
                ].join('&')
            ].join('?');
        }
        return window.location.pathname;
    }
    getForm(name) {
        return this.forms.find(form => form.model.getName() === name);
    }
    async onActionClick(name) {
        console.log('PageController.onActionClick', name);
    }
    async onDocumentKeyDown(e) {
        // console.log('PageController.onDocumentKeyDown', this.getModel().getFullName(), e);
        if (e.key === 'Escape') {
            if (this.getModel().isModal()) {
                this.close();
            }
        }
    }
    getTitle() {
        const model = this.getModel();
        const key = model.getKey();
        let keyPart;
        if (key) {
            const arr = JSON.parse(key);
            if (arr.length === 1 && typeof arr[0] === 'number') {
                keyPart = `#${arr[0]}`;
            } else {
                keyPart = `${key}`;
            }
        }
        return [
            model.getCaption(),
            ...(ApplicationController.isInDebugMode() ? [`(${model.getId()})`] : []),
            ...(keyPart ? [keyPart] : [])
        ].join(' ');
    }
    getSelectedRowKey() {
        for (const form of this.forms) {
            const selectedRowKey = form.getSelectedRowKey();
            if (selectedRowKey) return selectedRowKey;
        }
        return null;
    }
    onSelectClick = async e => {
        console.log('PageController.onSelectClick');
        await this.selectRow(this.getSelectedRowKey());
    }
    onResetClick = async e => {
        console.log('PageController.onResetClick');
        await this.selectRow(null);
    }
    async selectRow(key) {
        console.log('PageController.selectRow', key);
        this.close();
        await this.getModel().options.onSelect(key);
    }
    invalidate() {
        this.forms.forEach(form => form.invalidate());
    }
}
window.QForms.PageController = PageController;
