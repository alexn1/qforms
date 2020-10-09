class RowFormDatePickerFieldController extends RowFormFieldController {
    constructor(model, parent) {
        super(model, parent);
        this.dropdownDatePicker = null;
    }
    fill(row, view) {
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
        //this.setViewStyle(view, row);
    }
    setValue(value, view) {
        this.isUndefined = value === undefined;
        this.dropdownDatePicker.setValue(value);
    }
    getValue(view) {
        if (this.isUndefined) return undefined;
        return this.dropdownDatePicker.getValue();
    }

    getPlaceHolder() {
        return 'ДД.ММ.ГГГГ';
    }

    getValueForView(row) {
        return this.model.getValue(row);
    }

}
