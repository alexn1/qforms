'use strict';

class Model extends EventEmitter {
    constructor(data, parent) {
        super();
        this.data = data;
        this.parent = parent;
        this.name = data.name;
        this.listeners = {};
    }

    getClassName() {
        return this.data.class;
    }

    getName() {
        return this.data.name;
    }
}
