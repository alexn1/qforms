import { ModelController } from '../ModelController';
export declare class FormController extends ModelController {
    fields: any;
    state: any;
    static create(model: any, parent: any): any;
    constructor(model: any, parent: any);
    init(): void;
    deinit(): void;
    isValid(): boolean;
    openPage(options: any): Promise<any>;
    getPage(): any;
    isChanged(): boolean;
    onFieldChange(e: any): Promise<void>;
    getUpdated(): any;
    invalidate(): void;
    onActionClick(name: any, row: any): Promise<void>;
    getField(name: any): any;
    getApp(): any;
    getSelectedRowKey(): any;
    isAutoFocus(): boolean;
    isVisible(): boolean;
}
