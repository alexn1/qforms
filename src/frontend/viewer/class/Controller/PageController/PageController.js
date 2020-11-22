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
        this.forms = {};
    }

    init() {
        for (const name in this.model.forms) {
            const form = this.model.forms[name];
            const ctrl = this.forms[name] = FormController.create(form, this);
            ctrl.init();
        }
    }

    deinit() {
        console.log('PageController.deinit: ' + this.model.getFullName());
        for (const name in this.forms) {
            this.forms[name].deinit();
        }
        super.deinit();
    }

    onSaveAndCloseClick = async () => {
        console.log('PageController.onSaveAndCloseClick');
        if (this.isValid()) {
            await this.model.update();
            console.log('page model updated', this.model.getFullName());
            this.getApp().closePage(this);
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
        this.getApp().closePage(this);
    }
    isValid() {
        // console.log('PageController.isValid', this.model.getFullName());
        for (const name in this.forms) {
            if (!this.forms[name].isValid()) {
                return false;
            }
        }
        return true;
    }
    onFormChange(e) {
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
        for (const name in this.forms) {
            this.forms[name].invalidate();
        }
        this.rerender();
    }

    async openPage(options) {
        options.parentPage = this.model;
        return await this.getApp().openPage(options);
    }

    isChanged() {
        // console.log('PageController.isChanged', this.model.getFullName());
        for (const name in this.forms) {
            const form = this.forms[name];
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
}
