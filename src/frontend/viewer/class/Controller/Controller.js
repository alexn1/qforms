'use strict';

class Controller extends EventEmitter {
    constructor(model, parent) {
        super();
        this.model     = model;
        this.parent    = parent;
        this.view      = null;
        this.deinited  = false;
    }

    init() {
    }

    deinit() {
        if (this.deinited) throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }
    onViewCreate = view => {
        // console.log('Controller.onViewCreate');
        this.view = view;
    }
    rerender() {
        this.view.rerender();
    }
}
