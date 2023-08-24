import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkPage } from '../BkPage/BkPage';
import { BkForm } from '../BkForm/BkForm';
import { BkColumn } from '../BkColumn/BkColumn';
import { JSONString, RawRow } from '../../../../types';
import { Context } from '../../../Context';
import { FieldScheme } from '../../../common/Scheme/FieldScheme/FieldScheme';
import { FieldData } from '../../../../common/ModelData/FieldData';
export declare class BkField<TFieldScheme extends FieldScheme = FieldScheme> extends BkModel<TFieldScheme> {
    fillAttributes(response: FieldData): void;
    getDirPath(): string;
    fillDefaultValue(context: Context, row: RawRow): void;
    dumpRowValueToParams(row: RawRow, params: Record<string, any>): void;
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
