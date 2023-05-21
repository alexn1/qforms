import { FormController, FormControllerFields, FormControllerState } from '../FormController';
import { RowForm } from '../../../../Model/Form/RowForm/RowForm';
import { RowFormFieldController } from '../../FieldController/RowFormFieldController/RowFormFieldController';
import { FieldController } from '../../FieldController/FieldController';
import { RawRow } from '../../../../../../types';
export interface RowFormControllerFields extends FormControllerFields {
    [name: string]: RowFormFieldController;
}
export interface RowFormControllerState extends FormControllerState {
    mode: 'view' | 'edit';
    hasNew: boolean;
    changed: boolean;
    valid: boolean;
}
export declare class RowFormController extends FormController<RowForm> {
    fields: RowFormControllerFields;
    state: RowFormControllerState;
    init(): void;
    deinit(): void;
    calcState(): void;
    refill(): void;
    onModelRefresh: (e: any) => Promise<void>;
    onModelInsert: (e: any) => Promise<void>;
    onModelUpdate: (e: any) => Promise<void>;
    isValid(): boolean;
    validate(): void;
    clearFieldsError(): void;
    onSaveClick: () => Promise<void>;
    onDiscardClick: () => void;
    onRefreshClick: () => Promise<void>;
    isChanged(): boolean;
    onFieldChange(e: any): Promise<void>;
    onEditClick: (e: any) => void;
    onCancelClick: (e: any) => void;
    getViewClass(): any;
    getActiveRow(): RawRow;
    getRow(): RawRow;
    getMode(): "view" | "edit";
    isActionEnabled(name: string): boolean;
    isEditMode(): boolean;
    isViewMode(): boolean;
    getField<TRowFormFieldController extends FieldController = RowFormFieldController>(name: string): TRowFormFieldController;
}
