import {ModelController} from '../ModelController';
import {FrontHostApp} from '../../../../common';
import {FieldController} from '../FieldController/FieldController';

export class FormController extends ModelController {
    fields: any;
    state: any;
    static create(model, parent) {
        // console.log('FormController.create', model.getFullName());
        const page = model.getPage();
        const customClassName = `${page.getName()}${model.getName()}FormController`;
        const CustomClass = FrontHostApp.getClassByName(customClassName);
        const GeneralClass = FrontHostApp.getClassByName(`${model.getClassName()}Controller`);
        const Class = CustomClass ? CustomClass : GeneralClass;
        return new Class(model, parent);
    }
    constructor(model, parent) {
        super(model, parent);
        this.fields = {};
    }
    init() {
        for (const field of this.model.fields) {
            const ctrl = this.fields[field.getName()] = FieldController.create(field, this);
            ctrl.init();
        }
    }
    deinit() {
        // console.log('FormController.deinit:', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }
    isValid() {
        return true;
    }
    async openPage(options) {
        return await this.getPage().openPage(options);
    }
    getPage() {
        return this.parent;
    }
    isChanged() {
        return false;
    }
    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.model.getFullName());
        await this.getPage().onFormChange(e);
    }
    getUpdated() {
        return this.state.updated;
    }
    invalidate() {
        this.state.updated = Date.now();
    }
    async onActionClick(name, row): Promise<any> {
        console.log('FormController.onActionClick', name, row);
    }
    getField(name) {
        return this.fields[name];
    }
    getApp() {
        return this.parent.parent;
    }
    getSelectedRowKey() {
        return null;
    }
    isAutoFocus() {
        for (const name in this.fields) {
            if (this.fields[name].isAutoFocus()) {
                return true;
            }
        }
        return false;
    }
    isVisible() {
        return this.getModel().getAttr('visible') === 'true';
    }
}

// @ts-ignore
window.FormController = FormController;
