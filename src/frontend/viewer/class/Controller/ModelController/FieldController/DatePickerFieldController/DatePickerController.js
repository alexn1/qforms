'use strict';

class DatePickerFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
        this.dropdownDatePicker = null;
    }

    fill(row, view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.dropdownDatePicker = new DropdownDatePickerWidget(view.querySelector('.DropdownDatePickerWidget'));
            this.dropdownDatePicker.init();
        }
        super.fill(row, view);
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.dropdownDatePicker.onChange = event => {
                this.onChange(this.dropdownDatePicker.el);
            };
        }
    }

    // isValid(view) {
    //     let isValid = true;
    //     if (this.model.data.notNull === 'true') {
    //         isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== '';
    //     }
    //     if (view.firstElementChild.value) {
    //         if (this.model.getApp().data.lang === 'ru') {
    //             const arr = view.firstElementChild.value.split('.');
    //             if (arr.length === 3) {
    //                 const day    = parseInt(arr[0]);
    //                 const month  = parseInt(arr[1]);
    //                 const year   = parseInt(arr[2]);
    //                 if (day >= 1 && day <= 31) {
    //                 } else {
    //                     isValid = false;
    //                 }
    //                 if (month >=1 && month <= 12) {
    //                 } else {
    //                     isValid = false;
    //                 }
    //                 if (year >=1000 && year <= 9999) {
    //                 } else {
    //                     isValid = false;
    //                 }
    //             } else {
    //                 isValid = false;
    //             }
    //         }
    //     }
    //     if (!isValid) {
    //         view.firstElementChild.classList.add('error');
    //     } else {
    //         view.firstElementChild.classList.remove('error');
    //     }
    //     return isValid;
    // }

    setValue(value, view) {
        console.log('DatePickerController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.dropdownDatePicker.setValue(value);
        }


        // let text = value;
        // let placeholder = 'YYYY-MM-DD';
        // if (this.model.getApp().data.lang === 'ru') {
        //     placeholder = 'ДД.ММ.ГГГГ';
        // }
        // if (value) {
        //     if (this.model.getApp().data.lang === 'ru') {
        //         const arr = value.split('-');
        //         text = [arr[2], arr[1], arr[0]].join('.');
        //     } else {
        //         text = value;
        //     }
        // }
        // switch (this.model.getForm().getClassName()) {
        //     case 'RowForm':
        //         view.firstElementChild.value       = text;
        //         view.firstElementChild.placeholder = placeholder;
        //         break;
        //     case 'TableForm':
        //         view.firstElementChild.innerHTML = text;
        //         break;
        // }
    }

    setPlaceHolder() {
        console.log('DatePickerFieldController.setPlaceHolder', this.model.getFullName());
    }

    getValue(view) {
        console.log('DatePickerFieldController.getValue', this.model.getFullName());
        if (this.model.getForm().getClassName() === 'RowForm') {
            return this.dropdownDatePicker.getValue();
        }
        return null;

        // let text;
        // switch (this.model.getForm().getClassName()) {
        //     case 'RowForm':
        //         text = view.firstElementChild.value;
        //         break;
        //     case 'TableForm':
        //         text = view.firstElementChild.innerHTML;
        //         break;
        // }
        // if (text) {
        //     let value;
        //     if (this.model.getApp().data.lang === 'ru') {
        //         const arr = text.split('.');
        //         value = [arr[2], arr[1], arr[0]].join('-');
        //     } else {
        //         value = text;
        //     }
        //     return value;
        // } else {
        //     return null;
        // }
    }

    // beginEdit(view) {
    //     view.firstElementChild.style.MozUserSelect = 'text';
    //     view.firstElementChild.contentEditable = true;
    //     const range = document.createRange();
    //     range.selectNodeContents(view.firstElementChild);
    //     window.getSelection().removeAllRanges();
    //     window.getSelection().addRange(range);
    //     view.firstElementChild.focus();
    //     return true;
    // }

    // endEdit(view) {
    //     view.firstElementChild.style.MozUserSelect = 'none';
    //     view.firstElementChild.contentEditable = false;
    // }

}
