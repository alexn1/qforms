'use strict';

class Model extends EventEmitter {
    constructor(data, parent) {
        if (!data.name) throw new Error(`${data.class} no name`);
        super();
        this.data     = data;
        this.parent   = parent;
        this.deinited = false;
    }

    init() {
    }

    deinit() {
        if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }

    getClassName() {
        return this.data.class;
    }

    getName() {
        return this.data.name;
    }

    getFullName() {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }
    getCaption() {
        return this.data.caption;
    }
}
