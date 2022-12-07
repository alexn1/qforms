import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormPhoneFieldView } from './RowFormPhoneFieldView';

export class RowFormPhoneFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPhoneFieldView;
    }
    getPhoneFormatErrorText() {
        return this.getModel()
            .getApp()
            .getText().form.phoneNumberFormatError;
    }

    getError() {
        const error = super.getError();
        if (error) return error;

        // russian phone format validator
        const value = this.getValue();
        if (value && value.substr(0, 2) === '+7' && value.length < 12) {
            return this.getPhoneFormatErrorText();
        }

        return null;
    }
}

// @ts-ignore
window.RowFormPhoneFieldController = RowFormPhoneFieldController;
