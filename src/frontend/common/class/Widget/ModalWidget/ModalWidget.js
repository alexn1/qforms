'use strict';

class ModalWidget extends Widget {
    static createElement(content) {
        const el = document.createElement('div');
        el.classList.add(ModalWidget.name);
        if (typeof content === 'string') {
            el.innerHTML = `<div><span class="close">&times;</span><div>${content}</div></div>`;
        } else if (typeof content === 'object') {
            el.innerHTML = `<div></div>`;
            el.querySelector('div > div').appendChild(content);
        }
        return el;
    }
    constructor(el) {
        console.log('ModalWidget.constructor', el);
        super(el);
        const closeElement = this.getCloseElement();
        if (closeElement) {
            closeElement.addEventListener('click', this.onCloseClick.bind(this));
        }
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
