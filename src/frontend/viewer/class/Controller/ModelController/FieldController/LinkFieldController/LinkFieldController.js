'use strict';

class LinkFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
    }

    fill(row, view) {
        const self = this;
        super.fill(row, view);
        $(view).children().click(function() {
            self._onClick(this);
        });
    }

    getStringValue(view) {
        // console.log('LinkFieldController.getStringValue', view.firstElementChild);
        return view.firstElementChild.innerHTML;
    }

    setStringValue(stringValue, view) {
        view.firstElementChild.innerHTML = stringValue;
    }

    _onClick(el) {
        const view = el.parentNode;
        this.emit('click', {source: this, view: view, row: view.dbRow, el: el, field: this});
    }

}
