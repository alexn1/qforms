'use strict';

class ModelController extends EventEmitter {
    constructor(model) {
        super();
        this.model = model;
        this.listeners = {};
    }

    init() {
    }
}
