import { BkModel } from '../Model';
import { BkApplication } from '../Application/Application';
import { BkPage } from '../Page/Page';
import { BkForm } from '../Form/Form';
import { BkColumn } from '../Column/Column';
import { JSONString, RawRow } from '../../../../types';
export declare class BkField extends BkModel {
    fillAttributes(response: any): void;
    getDirPath(): string;
    fillDefaultValue(context: any, row: any): void;
    dumpRowValueToParams(row: RawRow, params: {
        [name: string]: any;
    }): void;
    getFullName(): string;
    getApp(): BkApplication;
    getPage(): BkPage;
    getForm(): BkForm;
    isParam(): boolean;
    valueToRaw(value: any): JSONString;
    rawToValue(raw: JSONString): any;
    isTimezone(): boolean;
    getDatabaseTableColumn(): BkColumn;
    getType(): string;
    getDbType(): string;
    valueToDbValue(value: any): any;
}
