'use strict';

class DatePickerFieldController extends FieldController {

    // constructor(model, parent) {
    //     super(model, parent);
    // }

    fill(row, view) {
        if (this.model.getForm().getClassName() === 'RowForm') {

        } else {
            super.fill(row, view);
        }
        // this.setPlaceHolder(view);
        /*if (this.model.getForm().getClassName() === 'RowForm') {
            this.dropdownDatePicker.onChange = date => {
                this.onChange(view);
            };
        }*/
    }

    deinit(row, view) {
        // ReactDOM.unmountComponentAtNode(view);
        super.deinit(row, view);
    }

    setValue(value, view) {
        // console.log('DatePickerController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {

        } else if (this.model.getForm().getClassName() === 'TableForm') {
            if (value instanceof Date) {
                const stringValue = Helper.formatDate(value, '{DD}.{MM}.{YYYY}')
                this.setStringValue(stringValue, view);
            } else {
                this.setStringValue('', view);
            }
        }
    }

    getValue(view) {
        // console.log('DatePickerFieldController.getValue', this.model.getFullName());

        return null;
    }

    setPlaceHolder(view, value) {
        // console.log('DatePickerFieldController.setPlaceHolder', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            // view.firstElementChild.firstElementChild.placeholder = 'ДД.ММ.ГГГГ';
        }
    }

    getPlaceHolder() {
        return 'ДД.ММ.ГГГГ';
    }

    /*getValueForView(row) {
        return this.model.getValue(row);
    }*/

}
