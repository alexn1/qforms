'use strict';

class Model extends EventEmitter {
    constructor(data, parent) {
        if (!data.name) throw new Error(`${data.class} no name`);
        super();
        this.data = data;
        this.parent = parent;
        this.listeners = {};
    }

    getClassName() {
        return this.data.class;
    }

    getName() {
        return this.data.name;
    }
}
