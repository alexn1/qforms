'use strict';

class ModalWidget extends Widget {
    constructor(el) {
        console.log('ModalWidget.constructor', el);
        super(el);
    }

    open() {
        this.el.style.display = "block";
    }

}
