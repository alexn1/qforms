import { ModelController } from '../ModelController';
import { FieldController } from '../FieldController/FieldController';
import { PageController } from '../PageController/PageController';
import { Form } from '../../../Model/Form/Form';
import { ApplicationController, OpenPageOptions } from '../ApplicationController/ApplicationController';
export declare class FormController<TForm extends Form = Form> extends ModelController<TForm> {
    fields: {
        [name: string]: FieldController;
    };
    state: any;
    static create(model: Form, parent: PageController): FormController;
    constructor(model: TForm, parent: PageController);
    init(): void;
    deinit(): void;
    isValid(): boolean;
    openPage(options: OpenPageOptions): Promise<PageController<ApplicationController>>;
    getPage(): PageController;
    isChanged(): boolean;
    onFieldChange(e: any): Promise<void>;
    getUpdated(): any;
    invalidate(): void;
    onActionClick(name: any, row: any): Promise<any>;
    getApp(): ApplicationController;
    getSelectedRowKey(): any;
    isAutoFocus(): boolean;
    isVisible(): boolean;
}
