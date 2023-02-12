import { Model } from '../Model';
import { Application } from '../Application/Application';
import { BkPage } from '../Page/Page';
import { Form } from '../Form/Form';
import { BkColumn } from '../Column/Column';
export declare class Field extends Model {
    fillAttributes(response: any): void;
    getDirPath(): string;
    fillDefaultValue(context: any, row: any): void;
    dumpRowValueToParams(row: any, params: any): void;
    getFullName(): string;
    getApp(): Application;
    getPage(): BkPage;
    getForm(): Form;
    isParam(): boolean;
    valueToRaw(value: any): any;
    rawToValue(raw: any): any;
    isTimezone(): boolean;
    getDatabaseTableColumn(): BkColumn;
    getType(): string;
    getDbType(): string;
    valueToDbValue(value: any): any;
}
