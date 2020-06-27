'use strict';

class FormController extends ModelController {
    constructor(model, view, parent) {
        super(model);
        this.view     = view;
        this.parent   = parent;
        this.page     = parent;
        this.fields   = {};
        this.controls = {};
    }

    static create(model, view, parent) {
        // console.log('FormController.create', model.getFullName());
        let obj;
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            obj = new CustomClass(model, view, parent);
        } else {
            obj = eval(`new ${model.data.class}Controller(model, view, parent);`);
        }
        return obj;
    }

    init() {
        // fields
        for (const name in this.model.fields) {
            const field = this.model.fields[name];
            this.fields[name] = FieldController.create(field, this);
            this.fields[name].init();
        }
        // controls
        for (const name in this.model.controls) {
            const control = this.model.controls[name];
            this.controls[name] = ControlController.create(control, this);
            this.controls[name].init();
        }
    }

    deinit() {
        //console.log('FormController.deinit: ' + this.model.name);
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        for (const name in this.controls) {
            this.controls[name].deinit();
        }
    }

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

    async openPage(args) {
        return this.parent.openPage(args);
    }

    isChanged() {
        return false;
    }

    onFieldChange(e) {
        console.log('FormController.onFieldChange', this.model.getFullName());
        this.parent.onFormChange(e);
    }

}
