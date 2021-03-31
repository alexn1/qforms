class PageController extends Controller {

    static create(model, parent) {
        // console.log('PageController.create', model.getName());
        const customClassName = `${model.getName()}Controller`;
        if (eval(`typeof ${customClassName}`) === 'function') {
            const CustomClass = eval(customClassName);
            // console.log('CustomClass:', CustomClass);
            return new CustomClass(model, parent);
        }
        /*if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, parent);
        }*/
        return new PageController(model, parent);
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
        if (this.isValid()) {
            await this.model.update();
            console.log('page model updated', this.model.getFullName());
            this.getAppController().closePage(this);
        }
    }

    onClosePageClick = () => {
        // console.log('PageController.onClosePageClick', this.model.getFullName());
        this.close();
    }

    close() {
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (changed) {
            const result = confirm(this.model.getApp().data.text.form.areYouSure);
            if (!result) return;
        }
        this.getAppController().closePage(this);
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
        console.log('PageController.onFormUpdate:', this.model.getFullName());
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
        options.parentPage = this.model;
        return await this.getAppController().openPage(options);
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

    getAppController() {
        return this.parent;
    }
    getViewClass() {
        return PageView;
    }
    getCaption() {
        return this.model.getCaption();
    }
    static createLink(params) {
        // const query = window.location.search.split('?')[1];
        // console.log('query:', query);
        return [
            window.location.pathname,
            [
                // ...(query ? query.split('&') : []),
                ...(ApplicationController.isInDebugMode() ? ['debug=1'] : []),
                ...Object.keys(params).map(name => `${name}=${encodeURI(Helper.encodeValue(params[name]))}`)
            ].join('&')
        ].join('?');
    }
    getForm(name) {
        return this.forms.find(form => form.model.getName() === name);
    }
    async onActionClick(name) {
        console.log('PageController.onActionClick', name);
    }
}
