'use strict';

class FormController extends ModelController {

    static createView(model, parent) {
        // console.log('FormController.createView', model, parent);
        return parent.view.querySelector(`#${model.getPage().id}_${model.getName()}`);
    }

    static create(model, view, parent) {
        console.log('FormController.create', model.getFullName());
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, view, parent);
        }
        return eval(`new ${model.getClassName()}Controller(model, view, parent);`);
    }

    constructor(model, view, parent) {
        super(model);
        this.view     = view;
        this.parent   = parent;
        this.fields   = {};
        this.controls = {};
    }

    init() {
        // fields
        for (const name in this.model.fields) {
            const field = this.model.fields[name];
            this.fields[name] = FieldController.create(field, this);
            this.fields[name].init();
        }
        /*// controls
        for (const name in this.model.controls) {
            const control = this.model.controls[name];
            this.controls[name] = ControlController.create(control, this);
            this.controls[name].init();
        }*/
    }

    // deinit() {
    //     console.log('FormController.deinit:', this.model.getFullName());
    //     super.deinit();
    // }

    fill() {
    }

    isValid() {
        return true;
    }

    setRowStyle(bodyRow, row) {
    }

    getCaption() {
        return this.model.data.caption;
    }

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

}
