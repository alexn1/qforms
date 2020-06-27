'use strict';

class ButtonControlController extends ControlController {

    constructor(model, parent) {
        super(model, parent);
    }

    fill(row, view) {
        const self = this;
        super.fill(row, view);
        if (self.model.form.getClassName() === 'RowForm') {
            $(view).children().click(function() {
                self._onClick(this);
            });
        }
    }

    _onClick(el) {
        const view = el.parentNode;
        this.emit('click', {source: this, view: view, row: view.dbRow, el: el, control: this});
    }

}
