'use strict';

class FormController extends Controller {

    static create(model, view, parent) {
        // console.log('FormController.create', model.getFullName());
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, view, parent);
        }
        return eval(`new ${model.getClassName()}Controller(model, view, parent);`);
    }
    constructor(model, view, parent) {
        super(model);
        this.view   = view;
        this.parent = parent;
        this.fields = {};
    }
    init() {
        for (const name in this.model.fields) {
            const field = this.model.fields[name];
            this.fields[name] = FieldController.create(field, this);
            this.fields[name].init();
        }
    }
    deinit() {
        console.log('FormController.deinit:', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }
    fill() {
    }
    isValid() {
        return true;
    }
    /*setRowStyle(bodyRow, row) {
    }*/
    async openPage(options) {
        return this.getPageController().openPage(options);
    }
    getPageController() {
        return this.parent;
    }
    isChanged() {
        return false;
    }
    onFieldChange(e) {
        console.log('FormController.onFieldChange', this.model.getFullName());
        this.parent.onFormChange(e);
    }
    rerender() {
        this.view.rerender();
    }
    onViewCreate = view => {
        // console.log('FormController.onViewCreate', view);
        this.view = view;
    }
}
