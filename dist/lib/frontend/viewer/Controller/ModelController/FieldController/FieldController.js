"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldController = void 0;
const ModelController_1 = require("../ModelController");
const common_1 = require("../../../../common");
class FieldController extends ModelController_1.ModelController {
    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName(), parent.model.getClassName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = common_1.FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const generalClassName = `${parent
            .getModel()
            .getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = common_1.FrontHostApp.getClassByName(generalClassName);
        if (!GeneralClass)
            throw new Error(`no class ${generalClassName}`);
        return new GeneralClass(model, parent);
        /*const page = model.getPage();
        const form = model.getForm();
        const CustomClass = FrontHostApp.getClassByName(
            `${page.getName()}${form.getName()}${model.getName()}FieldController`,
        );
        const generalClassName = `${parent.model.getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = FrontHostApp.getClassByName(generalClassName);
        if (!GeneralClass) throw new Error(`no class ${generalClassName}`);
        const Class = CustomClass || GeneralClass;
        return new Class(model, parent);*/
    }
    valueToString(value) {
        // console.log('Field.valueToString', this.model.getFullName(), typeof value, value);
        switch (typeof value) {
            case 'string':
                return value;
            case 'object':
                if (value === null)
                    return '';
                if (value instanceof Date)
                    return value.toISOString();
                return JSON.stringify(value, null, 4);
            case 'number':
            case 'boolean':
                return value.toString();
            case 'undefined':
                return '';
            default:
                throw new Error(`${this.model.getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }
    stringToValue(stringValue) {
        // console.log('FieldController.stringToValue', this.model.getFullName(), stringValue);
        // if (stringValue === undefined) return undefined;
        // if (stringValue === null) return null;
        const fieldType = this.model.getType();
        // console.log('fieldType:', fieldType);
        if (stringValue.trim() === '')
            return null;
        if (fieldType === 'object' || fieldType === 'boolean') {
            return JSON.parse(stringValue);
        }
        else if (fieldType === 'date') {
            const date = new Date(stringValue);
            if (date.toString() === 'Invalid Date')
                throw new Error(`${this.getApp().getModel().getText().error.invalidDate}: ${stringValue}`);
            return date;
        }
        else if (fieldType === 'number') {
            const num = Number(stringValue);
            if (isNaN(num))
                throw new Error(this.getApp().getModel().getText().error.notNumber);
            return num;
        }
        return stringValue;
    }
    getViewStyle(row) {
        return null;
    }
    async openPage(options) {
        return await this.getParent().openPage(options);
    }
    getParent() {
        return super.getParent();
    }
    getForm() {
        return this.parent;
    }
    getPage() {
        return this.parent.parent;
    }
    getApp() {
        return this.parent.parent.parent;
    }
    isVisible() {
        return this.getModel().getAttr('visible') === 'true';
    }
    isAutoFocus() {
        return this.getModel().getAttr('autoFocus') === 'true';
    }
    getAutocomplete() {
        return this.getModel().getAttr('autocomplete') || null;
    }
    getFormat() {
        return this.getModel().getAttr('format');
    }
}
exports.FieldController = FieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.FieldController = FieldController;
}
