import { ModelController } from '../ModelController';
import { Field } from '../../../Model/Field/Field';
import { FormController } from '../FormController/FormController';
export declare class FieldController extends ModelController {
    static create(model: Field, parent: FormController): FieldController;
    valueToString(value: any): string;
    stringToValue(stringValue: any): any;
    getViewStyle(row: any): any;
    openPage(options: any): Promise<any>;
    getForm(): any;
    getPage(): any;
    getApp(): any;
    isVisible(): boolean;
    isAutoFocus(): boolean;
    getAutocomplete(): any;
    getFormat(): any;
}
