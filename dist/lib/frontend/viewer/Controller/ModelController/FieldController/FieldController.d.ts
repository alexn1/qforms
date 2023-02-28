import { ModelController } from '../ModelController';
import { Field } from '../../../Model/Field/Field';
import { FormController } from '../FormController/FormController';
import { Form } from '../../../Model/Form/Form';
import { PageController } from '../PageController/PageController';
import { ApplicationController, OpenPageOptions } from '../ApplicationController/ApplicationController';
export declare class FieldController<TModel extends Field = Field> extends ModelController<TModel> {
    static create(model: Field, parent: FormController<Form>): FieldController<Field>;
    valueToString(value: any): string;
    stringToValue(stringValue: string): any;
    getViewStyle(row: any): any;
    openPage(options: OpenPageOptions): Promise<PageController<ApplicationController>>;
    getParent(): FormController;
    getForm(): FormController;
    getPage(): PageController;
    getApp(): ApplicationController;
    isVisible(): boolean;
    isAutoFocus(): boolean;
    getAutocomplete(): any;
    getFormat(): string;
}
