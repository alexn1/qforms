'use strict';

class TooltipWidget extends Widget {
    constructor(el) {
        console.log('TooltipWidget.constructor', el);
        super(el);
    }

    hide() {
        console.log('TooltipWidget.hide');
        // this.el.style.visibility = 'hidden';
        this.el.classList.add('hidden');
    }

    show() {
        console.log('TooltipWidget.show');
        // this.el.style.visibility = 'visible';
        this.el.classList.remove('hidden');
    }

    isHidden() {
        return this.el.classList.contains('hidden');
    }

    getSpanElement() {
        return this.el.querySelector('div.TooltipWidget > span');
    }

    setTooltipText(text) {
        this.getSpanElement().innerText =  text;
    }
}
