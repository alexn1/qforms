'use strict';

class ModalWidget extends Widget {
    constructor(el) {
        console.log('ModalWidget.constructor', el);
        super(el);
        this.getCloseElement().addEventListener('click', this.onCloseClick.bind(this))
    }

    onCloseClick() {
        console.log('ModalWidget.onCloseClick');
        this.el.style.display = "none";
    }

    getCloseElement() {
        return this.el.querySelector('span.close');
    }

    open() {
        this.el.style.display = "block";
    }

}
