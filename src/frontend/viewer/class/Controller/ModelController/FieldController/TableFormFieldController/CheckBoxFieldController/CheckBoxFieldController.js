'use strict';

class CheckBoxFieldController extends TableFormFieldController {

    constructor(model, parent) {
        super(model, parent);
    }

    getValue(view) {
        return view.firstElementChild.checked ? 1 : 0;
    }

    setValue(value, view) {
        view.firstElementChild.checked = (value === 1) ? true : false;
    }

    /*fill(row, view) {
        const self = this;
        super.fill(row, view);
        if (self.model.getForm().getClassName() === 'RowForm') {
            $(view).children().change(function() {
                self.onChange(view);
            });
        }
    }*/

}
