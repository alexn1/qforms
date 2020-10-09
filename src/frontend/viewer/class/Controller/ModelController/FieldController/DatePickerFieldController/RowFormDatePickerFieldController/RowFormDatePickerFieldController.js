class RowFormDatePickerFieldController extends RowFormFieldController {
    constructor(model, parent) {
        super(model, parent);
        this.dropdownDatePicker = null;
    }
    fill(row) {
        console.log('RowFormDatePickerFieldController.fill', this.model.getFullName(), this.model.getValue(row));
        /*this.views.set(row, view);
        view.dbRow = row;
        const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        this.state.value = value;
        this.dropdownDatePicker = ApplicationController.createReactComponent(view, DropdownDatePicker, {
            // oldDates: false,
            placeholder: 'ДД.ММ.ГГГГ',
            value: value,
            onChange: date => {
                this.onChange(view);
            }
        });*/
        // this.setValue(value, view);
        //this.setViewStyle(view, row);
    }
    setValue(value) {
        throw new Error('not implemented');
        // this.isUndefined = value === undefined;
        // this.dropdownDatePicker.setValue(value);
    }
    // getValue() {
    //     // console.log('RowFormDatePickerFieldController.getValue');
    //     if (this.isUndefined) return undefined;
    //     // const value = this.dropdownDatePicker.getValue();
    //     // const value = this.component.getValue();
    //     // return value;
    //     return this.state.value;
    // }

    getPlaceHolder() {
        return 'ДД.ММ.ГГГГ';
    }

}
