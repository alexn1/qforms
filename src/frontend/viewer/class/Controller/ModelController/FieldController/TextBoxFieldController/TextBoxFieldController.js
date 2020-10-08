'use strict';

class TextBoxFieldController extends FieldController {

    constructor(model, parent) {
        // console.log('new TextBoxFieldController', model.getName());
        super(model, parent);
        this.textBox = null;
    }

    fill(row, view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.textBox = ApplicationController.createReactComponent(view, TextBox, {
                readOnly: this.model.data.readOnly === 'true'
            });
        }
        super.fill(row, view);
        if (this.model.getForm().getClassName() === 'RowForm') {
            // $(view).children().on('input', () => {
            //     this.onChange(view);
            // });
        }
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
            case 'RowForm'  :
                // return view.firstElementChild.value;
                return this.textBox.getValue();
            case 'TableForm': return view.firstElementChild.innerHTML;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setStringValue(stringValue, view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  :
                // view.firstElementChild.value     = stringValue;
                this.textBox.setValue(stringValue);
                break;
            case 'TableForm': view.firstElementChild.innerHTML = stringValue; break;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setPlaceHolder(view, value) {
        /*
        // console.log('TextBoxFieldController.setPlaceHolder', this.model.getFullName(), value);
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
        }*/
    }

}
