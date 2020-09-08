'use strict';

class TextBoxFieldController extends FieldController {

    constructor(model, parent) {
        // console.log('new TextBoxFieldController', model.name);
        super(model, parent);
    }

    fill(row, view) {
        const self = this;
        super.fill(row, view);
        if (this.model.getForm().getClassName() === 'RowForm') {
            $(view).children().on('input', function() {
                self.onChange(this);
            });
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

}
