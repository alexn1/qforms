'use strict';

class Controller extends EventEmitter {
    constructor(model) {
        super();
        this.model = model;
        this.listeners = {};
        this.deinited = false;
    }

    init() {
    }

    deinit() {
        if (this.deinited) throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }
}
