'use strict';

class FileFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
    }

    isValid(view) {
        let isValid = true;
        if (this.model.data.notNull === 'true') {
            isValid = view.firstElementChild.files[0];
        }
        if (!isValid) {
            view.firstElementChild.classList.add('error');
        } else {
            view.firstElementChild.classList.remove('error');
        }
        return isValid;
    }

    getValue(view) {
        return view.firstElementChild.files[0];
    }

    setValue(value, view) {
        //view.firstElementChild.files[0] = value;
    }

    fill(row, view) {
        const self = this;
        super.fill(row, view);
        if (this.model.form.getClassName() === 'RowForm') {
            $(view).children().change(function() {
                self.onChange(this);
            });
        }
    }

    // onChange(el) {
    //     const view = el.parentNode;
    //     if (this.isValid(view)) {
    //     }
    //     this.model.setValue(view.dbRow, this.getValue(view));
    //     this.emit('change', {source: this, view: view, row: view.dbRow, el: el, field: this});
    // }

}
