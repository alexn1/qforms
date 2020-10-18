'use strict';

class TableFormTextBoxFieldController extends TableFormFieldController {

    constructor(model, parent) {
        // console.log('new TableFormTextBoxFieldController', model.getName());
        super(model, parent);
        this.textBox = null;
    }

    // fill(row, view) {
    //     super.fill(row, view);
    // }

    deinit(row, view) {
        // ReactDOM.unmountComponentAtNode(view);
        super.deinit(row, view);
    }

    beginEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'text';
        view.firstElementChild.contentEditable = true;
        const range = document.createRange();
        range.selectNodeContents(view.firstElementChild);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        view.firstElementChild.focus();
        return true;
    }

    endEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'none';
        view.firstElementChild.contentEditable = false;
    }

    getStringValue(view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  : return this.textBox.getValue();
            case 'TableForm': return view.firstElementChild.innerHTML;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setStringValue(stringValue, view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  : this.textBox.setValue(stringValue); break;
            case 'TableForm': view.firstElementChild.innerHTML = stringValue; break;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    getPlaceHolder(value) {
        // console.log('TableFormTextBoxFieldController.getPlaceHolder', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            if (ApplicationController.isInDebugMode()) {
                if (value === undefined) {
                    return 'undefined';
                } else if (value === null) {
                    return 'null';
                } else if (value === '') {
                    return 'empty string';
                }
            }
        }
    }

}
