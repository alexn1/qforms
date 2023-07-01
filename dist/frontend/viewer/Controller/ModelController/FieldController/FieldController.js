"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldController = void 0;
const ModelController_1 = require("../ModelController");
const Helper_1 = require("../../../../common/Helper");
class FieldController extends ModelController_1.ModelController {
    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName(), parent.getModel().getClassName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper_1.Helper.getGlobalClass(ctrlClass);
            if (!CustomClass)
                throw new Error(`no global class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const generalClassName = `${parent
            .getModel()
            .getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = Helper_1.Helper.getGlobalClass(generalClassName);
        if (!GeneralClass)
            throw new Error(`no global class ${generalClassName}`);
        return new GeneralClass(model, parent);
    }
    valueToString(value) {
        // console.log('Field.valueToString', this.getModel().getFullName(), typeof value, value);
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
                throw new Error(`${this.getModel().getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }
    stringToValue(stringValue) {
        // console.log('FieldController.stringToValue', this.getModel().getFullName(), stringValue);
        // if (stringValue === undefined) return undefined;
        // if (stringValue === null) return null;
        const fieldType = this.getModel().getType();
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
        return undefined;
    }
    async openPage(options) {
        return await this.getParent().openPage(options);
    }
    getParent() {
        return super.getParent();
    }
    getForm() {
        return this.getParent();
    }
    getPage() {
        return this.getParent().getParent();
    }
    getApp() {
        return this.getParent().getParent().getParent();
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
