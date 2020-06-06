'use strict';

class Widget extends EventEmitter {

    constructor(el) {
        super();
        this.el        = el;
        this.listeners = {};
    }

}
