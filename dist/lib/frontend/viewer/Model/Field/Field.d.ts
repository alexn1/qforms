import { Model } from '../Model';
export declare class Field extends Model {
    init(): void;
    replaceThis(value: any): any;
    fillDefaultValue(row: any): void;
    valueToPageParams(row: any): void;
    isChanged(row: any): any;
    hasColumn(): boolean;
    getValue(row: any): any;
    setValue(row: any, value: any): void;
    rawToValue(rawValue: any): any;
    valueToRaw(value: any): string;
    getRawValue(row: any): any;
    getDefaultDataSource(): any;
    getType(): any;
    getForm(): any;
    getPage(): any;
    getApp(): any;
    isReadOnly(): boolean;
    isNotNull(): boolean;
    isNullable(): boolean;
    getWidth(): number;
    getFullName(): string;
    isParam(): boolean;
    validateOnChange(): boolean;
    validateOnBlur(): boolean;
    getCaption(): any;
}
