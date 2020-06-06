'use strict';

class CheckBoxFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
    }

    getValue(view) {
        return view.firstElementChild.checked ? 1 : 0;
    }

    setValue(value, view) {
        view.firstElementChild.checked = (value === 1) ? true : false;
    }

    fill(row, view) {
        const self = this;
        super.fill(row, view);
        if (self.model.form.data.class === 'RowForm') {
            $(view).children().change(function() {
                self.onChange(this);
            });
        }
    }

    // onChange(el) {
    //     const view = el.parentNode;
    //     if (this.isValid(view)) {
    //         this.model.setValue(view.dbRow, this.getValue(view));
    //         this.emit('change', {source: this, view: view, row: view.dbRow, el: el, field: this});
    //     }
    // }
}
