import { Model } from '../Model';
import { PageData } from '../../../../data';
import { Form } from '../Form/Form';
import { Key } from '../../../../types';
import { Application } from '../Application/Application';
export interface PageOptions {
    id?: string;
    modal?: boolean;
    newMode?: boolean;
    selectMode?: boolean;
    selectedKey?: Key;
    params?: Record<string, any>;
    onCreate?: (page: Page) => void | Promise<void>;
    onSelect?: (key: Key | null) => void | Promise<void>;
    onClose?: () => void | Promise<void>;
}
export declare class Page extends Model<PageData> {
    private options;
    dataSources: any[];
    forms: Form[];
    params: Record<string, any>;
    constructor(data: PageData, parent: Application, options: PageOptions);
    init(): void;
    deinit(): void;
    getOptions(): PageOptions;
    createForms(): void;
    deinitForms(): void;
    getParams(): {
        [x: string]: any;
    };
    setParam(name: string, value: any): void;
    update(): Promise<void>;
    discard(): void;
    getKey(): Key | null;
    hasRowFormWithDefaultDs(): boolean;
    hasRowFormWithDefaultSqlDataSource(): boolean;
    hasRowForm(): boolean;
    hasTableForm(): boolean;
    isNewMode(): boolean;
    hasNew(): boolean;
    getApp(): Application;
    isModal(): boolean;
    onFormInsert(e: any): void;
    rpc(name: string, params: Record<string, any>): Promise<any>;
    findForm<TForm extends Form = Form>(name: string): TForm | undefined;
    getForm<TForm extends Form = Form>(name: string): TForm;
    isSelectMode(): boolean;
    isFormInTab(): boolean;
}
