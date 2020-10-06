'use strict';

class TextAreaFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
    }

    fill(row, view) {
        super.fill(row, view);
        const self = this;
        if (this.model.getForm().getClassName() === 'RowForm') {
            $(view).children().on('input', function() {
                self.onChange(view);
            });
        }
    }

    // isValid(view) {
    //     let isValid = true;
    //     if (this.model.data.notNull === 'true') {
    //         isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== '';
    //     }
    //     if (!isValid) {
    //         view.firstElementChild.classList.add('error');
    //     } else {
    //         view.firstElementChild.classList.remove('error');
    //     }
    //     return isValid;
    // }

    setPlaceHolder(view, value) {
        // console.log('TextAreaFieldController.setPlaceHolder', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            if (ApplicationController.isInDebugMode()) {
                if (value === undefined) {
                    view.firstElementChild.placeholder = 'undefined';
                } else if (value === null) {
                    view.firstElementChild.placeholder = 'null';
                } else if (value === '') {
                    view.firstElementChild.placeholder = 'empty string';
                }
            }
        }
    }
}
