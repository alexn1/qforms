import { FormController } from '../FormController';
export declare class RowFormController extends FormController {
    state: any;
    fields: any;
    constructor(model: any, parent: any);
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
    getActiveRow(withChanges: any): any;
    getMode(): any;
    isActionEnabled(name: any): boolean;
    isEditMode(): boolean;
    isViewMode(): boolean;
}
