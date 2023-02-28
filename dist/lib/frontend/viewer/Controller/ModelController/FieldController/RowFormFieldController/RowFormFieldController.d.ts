import React from 'react';
import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';

export declare class RowFormFieldController<
    TField extends Field = Field,
> extends FieldController<TField> {
    state: any;
    constructor(model: any, parent: any);
    init(): void;
    refill(): void;
    getRow(): any;
    copyValueToModel(): void;
    putValue(widgetValue: any): void;
    onChange: (widgetValue: any, fireEvent?: boolean) => Promise<void>;
    onBlur: (widgetValue: any, fireEvent?: boolean) => void;
    getValueForWidget(): string;
    setValueFromWidget(widgetValue: any): void;
    setValue(value: any): void;
    getValue(): any;
    isChanged(): any;
    isValid(): boolean;
    validate(): void;
    refreshChangedState(): void;
    getPlaceholder(): any;
    getError(): any;
    getNullErrorText(): any;
    isEditable(): boolean;
    isParseError(): boolean;
    calcChangedState(row: any): boolean;
    setError(error: any): void;
    resetErrors(): void;
    getErrorMessage(): any;
    renderView(): React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;
    isValidateOnChange(): any;
    isValidateOnBlur(): any;
    onChangePure: (value: any, fireEvent?: boolean) => Promise<void>;
}
