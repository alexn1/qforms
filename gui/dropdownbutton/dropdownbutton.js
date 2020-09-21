class DropdownButton {
    constructor(el) {
        // console.log('DropdownButton.constructor');
        this.el = el;
        this.onClick = null;
        this.getButtonElement().addEventListener('click', this.onButtonClick.bind(this));
        this.getButtonElement().addEventListener('blur', this.onButtonBlur.bind(this));
        this.getUlElement().addEventListener('mousedown', this.onUlMousedown.bind(this));
        this.getUlElement().addEventListener('click', this.onUlClick.bind(this));
    }

    onUlClick(e) {
        console.log('DropdownButton.onUlClick', e.target);
        this.hide();
        if (this.onClick) {
            this.onClick(e.target);
        }
    }

    onUlMousedown(e) {
        // console.log('DropdownButton.onUlMousedown');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    getButtonElement() {
        return this.el.querySelector('div.DropdownButton > button');
    }

    getUlElement() {
        return this.el.querySelector('div.DropdownButton > ul');
    }

    onButtonClick() {
        // console.log('DropdownButton.onButtonClick');
        this.show();
    }

    onButtonBlur() {
        // console.log('DropdownButton.onButtonBlur');
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
