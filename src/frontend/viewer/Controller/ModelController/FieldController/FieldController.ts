import { ModelController } from '../ModelController';
import { Field } from '../../../Model/Field/Field';
import { FormController } from '../FormController/FormController';
import { PageController } from '../PageController/PageController';
import {
    ApplicationController,
    OpenPageOptions,
} from '../ApplicationController/ApplicationController';
import { Helper } from '../../../../common/Helper';
import { CSSProperties } from 'react';
import { RawRow } from '../../../../../types';

export class FieldController<TField extends Field = Field> extends ModelController<TField> {
    static create(model: Field, parent: FormController): FieldController {
        // console.log('FieldController.create', model.getFullName(), parent.getModel().getClassName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper.getGlobalClass(ctrlClass);
            if (!CustomClass) throw new Error(`no global class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const generalClassName = `${parent
            .getModel()
            .getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = Helper.getGlobalClass(generalClassName);
        if (!GeneralClass) throw new Error(`no global class ${generalClassName}`);
        return new GeneralClass(model, parent);
    }

    valueToString(value): string {
        // console.log('Field.valueToString', this.getModel().getFullName(), typeof value, value);
        switch (typeof value) {
            case 'string':
                return value;
            case 'object':
                if (value === null) return '';
                if (value instanceof Date) return value.toISOString();
                return JSON.stringify(value, null, 4);
            case 'number':
            case 'boolean':
                return value.toString();
            case 'undefined':
                return '';
            default:
                throw new Error(
                    `${this.getModel().getFullName()}: unknown value type: ${typeof value}, value: ${value}`,
                );
        }
    }

    stringToValue(stringValue: string) {
        // console.log('FieldController.stringToValue', this.getModel().getFullName(), stringValue);
        // if (stringValue === undefined) return undefined;
        // if (stringValue === null) return null;
        const fieldType = this.getModel().getType();
        // console.log('fieldType:', fieldType);
        if (stringValue.trim() === '') return null;
        if (fieldType === 'object' || fieldType === 'boolean') {
            return JSON.parse(stringValue);
        } else if (fieldType === 'date') {
            const date = new Date(stringValue);
            if (date.toString() === 'Invalid Date')
                throw new Error(
                    `${this.getApp().getModel().getText().error.invalidDate}: ${stringValue}`,
                );
            return date;
        } else if (fieldType === 'number') {
            const num = Number(stringValue);
            if (isNaN(num)) throw new Error(this.getApp().getModel().getText().error.notNumber);
            return num;
        }
        return stringValue;
    }

    getViewStyle(row: RawRow): CSSProperties | undefined {
        return undefined;
    }

    async openPage(options: OpenPageOptions) {
        return await this.getParent<FormController>().openPage(options);
    }

    /* getParent<TFormController extends FormController = FormController>(): TFormController {
        return super.getParent() as TFormController;
    } */

    getForm<TFormController extends FormController = FormController>(): TFormController {
        return this.getParent();
    }

    getPage<TPageController extends PageController = PageController>(): TPageController {
        return this.getParent().getParent() as TPageController;
    }

    getApp<
        TApplicationController extends ApplicationController = ApplicationController,
    >(): TApplicationController {
        return this.getParent().getParent().getParent() as TApplicationController;
    }

    isVisible(): boolean {
        return this.getModel().getAttr('visible') === 'true';
    }

    isAutoFocus(): boolean {
        return this.getModel().getAttr('autoFocus') === 'true';
    }

    getAutocomplete() {
        return this.getModel().getAttr('autocomplete') || null;
    }

    getFormat(): string {
        return this.getModel().getAttr('format');
    }
}
