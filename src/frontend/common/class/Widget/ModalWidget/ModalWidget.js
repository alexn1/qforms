'use strict';

class ModalWidget extends Widget {
    static createElement() {
        const el = document.createElement('div');
        el.classList.add('ModalWidget');
        el.innerHTML = '<div>\n' +
            '            <span class="close">&times;</span>\n' +
            '            <div>Some text in the Modal..</div>\n' +
            '        </div>';
        return el;
    }
    constructor(el) {
        console.log('ModalWidget.constructor', el);
        super(el);
        this.getCloseElement().addEventListener('click', this.onCloseClick.bind(this));
    }

    onCloseClick() {
        console.log('ModalWidget.onCloseClick');
        this.el.parentElement.removeChild(this.el);
    }

    getCloseElement() {
        return this.el.querySelector('span.close');
    }

}
