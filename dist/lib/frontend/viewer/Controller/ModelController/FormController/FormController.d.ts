import { ModelController } from '../ModelController';
import { FieldController } from '../FieldController/FieldController';
import { PageController } from '../PageController/PageController';
import { Form } from '../../../Model/Form/Form';
export declare class FormController extends ModelController {
    fields: {
        [k: string]: FieldController;
    };
    state: any;
    static create(model: Form, parent: PageController): FormController;
    constructor(model: Form, parent: PageController);
    init(): void;
    deinit(): void;
    isValid(): boolean;
    openPage(options: any): Promise<any>;
    getPage(): any;
    isChanged(): boolean;
    onFieldChange(e: any): Promise<void>;
    getUpdated(): any;
    invalidate(): void;
    onActionClick(name: any, row: any): Promise<any>;
    getField(name: any): FieldController;
    getApp(): any;
    getSelectedRowKey(): any;
    isAutoFocus(): boolean;
    isVisible(): boolean;
}
