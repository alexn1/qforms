import { Model } from '../Model';
import { Form } from '../Form/Form';
import { Key } from '../../../../types';
export interface PageOptions {
    id?: string;
    modal?: boolean;
    newMode?: boolean;
    selectMode?: boolean;
    selectedKey?: string;
    params?: any;
    onCreate?: (page: Page) => void;
    onSelect?: any;
    onClose?: any;
}
export declare class Page extends Model {
    private options;
    dataSources: any[];
    forms: Form[];
    params: any;
    constructor(data: any, parent: any, options: PageOptions);
    init(): void;
    deinit(): void;
    getOptions(): PageOptions;
    createForms(): void;
    deinitForms(): void;
    getParams(): any;
    setParam(name: string, value: any): void;
    update(): Promise<void>;
    discard(): void;
    getKey(): Key;
    hasRowFormWithDefaultDs(): boolean;
    hasRowFormWithDefaultSqlDataSource(): boolean;
    hasRowForm(): boolean;
    hasTableForm(): boolean;
    isNewMode(): boolean;
    hasNew(): boolean;
    getApp(): any;
    isModal(): boolean;
    onFormInsert(e: any): void;
    rpc(name: string, params: any): Promise<any>;
    getForm<TForm extends Form = Form>(name: string): TForm;
    isSelectMode(): boolean;
    isFormInTab(): boolean;
}
