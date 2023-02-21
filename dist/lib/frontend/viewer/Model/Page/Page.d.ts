import { Model } from '../Model';
export declare class Page extends Model {
    options: any;
    dataSources: any[];
    forms: any[];
    params: any;
    constructor(data: any, parent: any, options: any);
    init(): void;
    deinit(): void;
    getOptions(): any;
    createForms(): void;
    deinitForms(): void;
    getParams(): any;
    setParam(name: string, value: any): void;
    update(): Promise<void>;
    discard(): void;
    getKey(): any;
    hasRowFormWithDefaultDs(): boolean;
    hasRowFormWithDefaultSqlDataSource(): boolean;
    hasRowForm(): boolean;
    hasTableForm(): boolean;
    isNewMode(): boolean;
    hasNew(): boolean;
    getApp(): any;
    isModal(): boolean;
    onFormInsert(e: any): void;
    rpc(name: any, params: any): Promise<any>;
    getForm(name: any): any;
    isSelectMode(): boolean;
    isFormInTab(): boolean;
}
