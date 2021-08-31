import Model from '../Model';
import Application from '../Application/Application';
import Page from '../Page/Page';
import Form from '../Form/Form';
declare class Field extends Model {
    static create(data: any, parent: any): Promise<Field>;
    fillAttributes(response: any): void;
    getDirPath(): string;
    fillDefaultValue(context: any, row: any): void;
    dumpRowValueToParams(row: any, params: any): void;
    getFullName(): string;
    calcValue(row: any): void;
    getApp(): Application;
    getPage(): Page;
    getForm(): Form;
    isParam(): boolean;
    valueToRaw(value: any): any;
    rawToValue(raw: any): any;
    isTimezone(): boolean;
}
export = Field;
