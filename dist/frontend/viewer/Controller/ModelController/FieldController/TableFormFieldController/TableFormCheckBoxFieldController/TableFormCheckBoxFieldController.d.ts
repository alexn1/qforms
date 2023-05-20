import { TableFormFieldController } from '../TableFormFieldController';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
import { Align } from '../../../../../../../types';
export declare class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass(): any;
    getValueForWidget(row: any): any;
    getAlign(): Align;
}
