import { TableFormFieldController } from '../TableFormFieldController';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
import { Align, RawRow } from '../../../../../../../types';
export declare class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass(): any;
    getValueForWidget(row: RawRow): any;
    getAlign(): Align;
}
