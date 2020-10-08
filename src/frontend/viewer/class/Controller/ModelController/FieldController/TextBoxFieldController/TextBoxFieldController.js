'use strict';

class TextBoxFieldController extends FieldController {

    constructor(model, parent) {
        // console.log('new TextBoxFieldController', model.getName());
        super(model, parent);
        this.textBox = null;
    }

    fill(row, view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.views.set(row, view);
            view.dbRow = row;
            const value = this.model.getValue(row);
            this.isUndefined = value === undefined;
            const stringValue = this.valueToString(value);
            this.textBox = ApplicationController.createReactComponent(view, TextBox, {
                readOnly: this.model.data.readOnly === 'true',
                value: stringValue,
                placeholder: this.getPlaceHolder(value),
                onChange: e => {
                    // console.log('TextBox.onChange');
                    this.onChange(view);
                }
            });
            // this.setViewStyle(view, row);
        } else {
            super.fill(row, view);
        }
    }

    deinit(row, view) {
        ReactDOM.unmountComponentAtNode(view);
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
        // console.log('TextBoxFieldController.getPlaceHolder', this.model.getFullName(), value);
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
