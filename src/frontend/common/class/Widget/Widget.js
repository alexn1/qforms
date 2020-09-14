'use strict';

class Widget extends EventEmitter {
    constructor(el) {
        if (!el) throw new Error('no el');
        super();
        this.el = el;
        this.listeners = {};
    }
}
