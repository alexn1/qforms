"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const ModelController_1 = require("../ModelController");
const common_1 = require("../../../../common");
const FieldController_1 = require("../FieldController/FieldController");
class FormController extends ModelController_1.ModelController {
    static create(model, parent) {
        // console.log('FormController.create', model.getFullName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = common_1.Helper.getGlobalClass(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const GeneralClass = common_1.Helper.getGlobalClass(`${model.getClassName()}Controller`);
        return new GeneralClass(model, parent);
    }
    constructor(model, parent) {
        super(model, parent);
        this.fields = {};
        if (typeof window === 'object') {
            console.log(`${this.constructor.name}.constructor`, model);
        }
    }
    init() {
        for (const field of this.model.fields) {
            const ctrl = (this.fields[field.getName()] = FieldController_1.FieldController.create(field, this));
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
    async onActionClick(name, row) {
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
exports.FormController = FormController;
if (typeof window === 'object') {
    // @ts-ignore
    window.FormController = FormController;
}
