'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.component = null;
    }
    onFieldViewContentCreated = c => {
        // console.log('RowFormFieldController.onFieldViewContentCreated', c);
        this.component = c;
    }
    onChange2 = e => {
        console.log('RowFormFieldController.onChange2', e);
        console.log('component value:', this.component.getValue());
    }
}
