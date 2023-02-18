import { RowFormFieldController } from '../RowFormFieldController';
import { RadioField } from '../../../../../Model/Field/RadioField/RadioField';
export declare class RowFormRadioFieldController extends RowFormFieldController<RadioField> {
    getViewClass(): any;
    getItems(): {
        value: any;
        title: any;
    }[];
    getRows(): import("../../../../../../../types").RawRow[];
}
