'use strict';

class ControlController extends ModelController {

    constructor(model, parent) {
        super(model);
        this.parent = parent;
        this.views  = {};    // list of all views that controlled by this control
        //this.html   = null;
    }

    static create(model, parent) {
        return eval(`new ${model.data.class}Controller(model, parent)`);
    }

    init() {
    }

    deinit() {
        this.views = null;
        super.deinit();
    }

    /*
    renderView() {
        if (this.html === null) {
            this.html = QForms.render(this.model.data.view, {model:this.model});
        }
        return $(this.html).get(0);
    }
    */

    fill(row, view) {
        const key = this.model.getForm().getDataSource().getRowKey(row);
        this.views[key] = view;
        view.dbRow = row;
        this.setViewStyle(view, row);
    }

    setViewStyle(view, row) {
    }

}
