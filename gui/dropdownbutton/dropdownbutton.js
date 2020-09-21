class DropdownButton {
    constructor(el) {
        // console.log('DropdownButton.constructor');
        this.el = el;
        this.onClick = null;
        this.getButtonElement().addEventListener('click', this.onButtonClick.bind(this));
        this.getButtonElement().addEventListener('blur', this.onButtonBlur.bind(this));
        this.getDivElement().addEventListener('mousedown', this.onDivMousedown.bind(this));
        this.getDivElement().addEventListener('click', this.onDivClick.bind(this));
    }

    onDivClick(e) {
        console.log('DropdownButton.onDivClick', e.target);
        this.hide();
        if (this.onClick) {
            this.onClick(e.target);
        }
    }

    onDivMousedown(e) {
        // console.log('DropdownButton.onDivMousedown');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    getButtonElement() {
        return this.el.querySelector('div.DropdownButton > button');
    }

    getDivElement() {
        return this.el.querySelector('div.DropdownButton > div');
    }

    onButtonClick() {
        console.log('DropdownButton.onButtonClick');
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
