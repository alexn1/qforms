import { ModelController } from '../ModelController';
import { Field } from '../../../Model/Field/Field';
import { FormController } from '../FormController/FormController';
import { PageController } from '../PageController/PageController';
import { ApplicationController, OpenPageOptions } from '../ApplicationController/ApplicationController';
export declare class FieldController<TField extends Field = Field> extends ModelController<TField> {
    static create(model: Field, parent: FormController): FieldController;
    valueToString(value: any): string;
    stringToValue(stringValue: string): any;
    getViewStyle(row: any): undefined;
    openPage(options: OpenPageOptions): Promise<PageController<ApplicationController>>;
    getParent<TFormController extends FormController = FormController>(): TFormController;
    getForm<TFormController extends FormController = FormController>(): TFormController;
    getPage<TPageController extends PageController = PageController>(): TPageController;
    getApp<TApplicationController extends ApplicationController = ApplicationController>(): TApplicationController;
    isVisible(): boolean;
    isAutoFocus(): boolean;
    getAutocomplete(): any;
    getFormat(): string;
}
