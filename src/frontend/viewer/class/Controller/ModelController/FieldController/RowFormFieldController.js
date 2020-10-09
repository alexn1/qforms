'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.component = null;
        this.state = {
            changed: false,
            error: false
        };
    }
    onFieldViewContentCreated = c => {
        // console.log('RowFormFieldController.onFieldViewContentCreated', c);
        this.component = c;
    }
    onChange2 = value => {
        console.log('RowFormFieldController.onChange2', value);
        // console.log('component value:', this.component.getValue());

        const value2 = this.getValue();
        console.log('value2:', value2);


        const row = this.model.getForm().getRow();
        // console.log('row:', row);

        this.isUndefined = false;
        const valid = this.isValid();
        console.log('valid:', valid);
        this.state.error = !valid;
        this.state.changed = this.isChanged(row);
        console.log('this.state:', this.state);

        if (valid) {
            const value = this.getValue();
            console.log('value:', this.model.getFullName(), value);
            this.model.setValue(row, value);
        }

    }
}
