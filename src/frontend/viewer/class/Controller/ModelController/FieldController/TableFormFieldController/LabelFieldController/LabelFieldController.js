'use strict';

class LabelFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
    }

    getValue(view) {
        return view.firstElementChild.innerHTML;
    }

    setValue(value, view) {
        view.firstElementChild.innerHTML = value;
    }
}
