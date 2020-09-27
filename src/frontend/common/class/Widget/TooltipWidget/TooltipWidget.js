'use strict';

class TooltipWidget extends Widget {
    constructor(el) {
        console.log('TooltipWidget.constructor', el);
        super(el);
    }

    hide() {
        this.el.style.visibility = 'hidden';
    }

    show() {
        this.el.style.visibility = 'visible';
    }

    isHidden() {
        return this.el.style.visibility === 'hidden';
    }

    getSpanElement() {
        return this.el.querySelector('div.TooltipWidget > span');
    }

    setTooltipText(text) {
        this.getSpanElement().innerText =  text;
    }
}
