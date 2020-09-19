'use strict';

class ModalWidget extends Widget {
    static createElement(content) {
        const el = document.createElement('div');
        el.classList.add(ModalWidget.name);
        el.innerHTML = `<div><span class="close">&times;</span><div>${content}</div></div>`;
        return el;
    }
    constructor(el) {
        console.log('ModalWidget.constructor', el);
        super(el);
        this.getCloseElement().addEventListener('click', this.onCloseClick.bind(this));
    }
    onCloseClick() {
        console.log('ModalWidget.onCloseClick');
        this.close();
    }
    close() {
        this.el.parentElement.removeChild(this.el);
    }
    getCloseElement() {
        return this.el.querySelector('span.close');
    }
}
