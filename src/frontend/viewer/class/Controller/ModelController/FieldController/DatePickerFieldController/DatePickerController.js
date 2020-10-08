'use strict';

class DatePickerFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
        this.dropdownDatePicker = null;
    }

    fill(row, view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.views.set(row, view);
            view.dbRow = row;
            const value = this.model.getValue(row);
            this.isUndefined = value === undefined;
            this.dropdownDatePicker = ApplicationController.createReactComponent(view, DropdownDatePicker, {
                // oldDates: false,
                placeholder: 'ДД.ММ.ГГГГ',
                value: value,
                onChange: date => {
                    this.onChange(view);
                }
            });
            // this.setValue(value, view);
            this.setViewStyle(view, row);
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
        ReactDOM.unmountComponentAtNode(view);
        super.deinit(row, view);
    }

    setValue(value, view) {
        // console.log('DatePickerController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.isUndefined = value === undefined;
            this.dropdownDatePicker.setValue(value);
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
        if (this.model.getForm().getClassName() === 'RowForm') {
            if (this.isUndefined) return undefined;
            return this.dropdownDatePicker.getValue();
        }
        return null;
    }

    setPlaceHolder(view, value) {
        // console.log('DatePickerFieldController.setPlaceHolder', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            // view.firstElementChild.firstElementChild.placeholder = 'ДД.ММ.ГГГГ';
        }
    }

    getValueForView(row) {
        return this.model.getValue(row);
    }

}
