import Model = require('../Model');
import Application = require('../Application/Application');
import Page = require('../Page/Page');
import Form = require('../Form/Form');
import Column = require("../Column/Column");
declare class Field extends Model {
    static create(data: any, parent: any): Promise<Field>;
    fillAttributes(response: any): void;
    getDirPath(): string;
    fillDefaultValue(context: any, row: any): void;
    dumpRowValueToParams(row: any, params: any): void;
    getFullName(): string;
    getApp(): Application;
    getPage(): Page;
    getForm(): Form;
    isParam(): boolean;
    valueToRaw(value: any): any;
    rawToValue(raw: any): any;
    isTimezone(): boolean;
    getDatabaseTableColumn(): Column;
    getType(): string;
    getDbType(): any;
    valueToSqlValue(value: any): any;
}
export = Field;
