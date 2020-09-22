'use strict';

class DropdownButtonWidget extends Widget{
    constructor(el) {
        // console.log('DropdownButtonWidget.constructor');
        super(el);
        this.onClick = null;
        this.getButtonElement().addEventListener('click', this.onButtonClick.bind(this));
        this.getButtonElement().addEventListener('blur', this.onButtonBlur.bind(this));
        this.getUlElement().addEventListener('mousedown', this.onUlMousedown.bind(this));
        this.getUlElement().addEventListener('click', this.onUlClick.bind(this));
    }

    onUlClick(e) {
        console.log('DropdownButtonWidget.onUlClick', e.target);
        this.hide();
        if (this.onClick) {
            this.onClick(e.target);
        }
    }

    onUlMousedown(e) {
        // console.log('DropdownButtonWidget.onUlMousedown');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    getButtonElement() {
        return this.el.querySelector('div.DropdownButtonWidget > button');
    }

    getUlElement() {
        return this.el.querySelector('div.DropdownButtonWidget > ul');
    }

    onButtonClick() {
        // console.log('DropdownButtonWidget.onButtonClick');
        this.show();
    }

    onButtonBlur() {
        // console.log('DropdownButtonWidget.onButtonBlur');
        if (this.isShown()) {
            this.hide();
        }
    }

    isShown() {
        return this.el.classList.contains('show');
    }

    hide() {
        this.el.classList.remove('show');
    }

    show() {
        this.el.classList.toggle('show');
    }
}
