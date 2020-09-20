'use strict';

class StatusbarWidget extends Widget {
    constructor(el) {
        console.log('StatusbarWidget.constructor', el);
        super(el);
    }

    setMessage(message) {
        this.el.innerHTML = message;
    }
}
