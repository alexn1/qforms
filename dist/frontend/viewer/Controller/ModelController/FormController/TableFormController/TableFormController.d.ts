import { FormController, FormControllerState } from '../FormController';
import { TableForm } from '../../../../Model/Form/TableForm/TableForm';
import { RawRow } from '../../../../../../types';
import { TableFormFieldController } from '../../FieldController/TableFormFieldController/TableFormFieldController';
import { FieldController } from '../../FieldController/FieldController';
import { Grid } from '../../../../../common';
export declare class TableFormController extends FormController<TableForm> {
    fields: {
        [name: string]: TableFormFieldController;
    };
    state: FormControllerState;
    grid: Grid;
    getViewClass(): any;
    init(): void;
    deinit(): void;
    onGridCreate: (grid: Grid) => void;
    onNewClick: (e: any) => Promise<void>;
    onRefreshClick: (e: any) => Promise<void>;
    onDeleteClick: (e: any) => Promise<void>;
    onGridCellDblClick: (row: any, key: any) => Promise<void>;
    onGridLinkClick: (key: any) => Promise<void>;
    onGridDeleteKeyDown: (row: any, key: any) => Promise<void>;
    new(): Promise<void>;
    edit(key: any): Promise<void>;
    onModelRefresh: (e: any) => Promise<void>;
    onModelInsert: (e: any) => Promise<void>;
    onModelUpdate: (e: any) => Promise<void>;
    onModelDelete: (e: any) => Promise<void>;
    onGridSelectionChange: (key: any) => Promise<void>;
    getActiveRow(): RawRow;
    isRowSelected: () => boolean;
    onFrameChanged: (value: any) => Promise<void>;
    onNextClick: () => Promise<void>;
    onPreviousClick: () => Promise<void>;
    canPrev(): boolean;
    canNext(): boolean;
    getSelectedRowKey(): any;
    isActionEnabled(name: string): boolean;
    getField<TTableFormFieldController extends FieldController = TableFormFieldController>(name: string): TTableFormFieldController;
}
