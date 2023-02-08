import { ModelController } from '../ModelController';
import { Field } from '../../../Model/Field/Field';
import { FormController } from '../FormController/FormController';
import { Form } from '../../../Model/Form/Form';
export declare class FieldController<TModel extends Field> extends ModelController<TModel> {
    static create(model: Field, parent: FormController<Form>): FieldController<Field>;
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
