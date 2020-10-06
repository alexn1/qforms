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
        if (this.model.getForm().getClassName() === 'RowForm') {
            $(view).children().change(function() {
                self.onChange(view);
            });
        }
    }

}
