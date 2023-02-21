import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormRadioFieldView } from './RowFormRadioFieldView';
import { RadioField } from '../../../../../Model/Field/RadioField/RadioField';

export class RowFormRadioFieldController extends RowFormFieldController<RadioField> {
    getViewClass() {
        return super.getViewClass() || RowFormRadioFieldView;
    }
    getItems() {
        try {
            return this.getRows().map((row) => ({
                // value: this.valueToString(this.getModel().getValueValue(row)),
                value: this.getModel().getValueValue(row),
                title: this.getModel().getDisplayValue(row),
            }));
        } catch (err) {
            err.message = `${this.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    getRows() {
        return this.getModel().getDataSource().getRows();
    }
}

// @ts-ignore
window.RowFormRadioFieldController = RowFormRadioFieldController;
