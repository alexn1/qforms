import { FormController } from '../FormController';
import { RowForm } from '../../../../Model/Form/RowForm/RowForm';
import { PageController } from '../../PageController/PageController';
import { RowFormFieldController } from '../../FieldController/RowFormFieldController/RowFormFieldController';
import { RawRow } from '../../../../../../types';
export declare class RowFormController extends FormController<RowForm> {
    fields: {
        [name: string]: RowFormFieldController;
    };
    constructor(model: RowForm, parent: PageController);
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
    getMode(): any;
    isActionEnabled(name: any): boolean;
    isEditMode(): boolean;
    isViewMode(): boolean;
    getField<TRowFormFieldController extends RowFormFieldController = RowFormFieldController>(name: string): TRowFormFieldController;
}
