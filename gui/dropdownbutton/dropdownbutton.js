class DropdownButton {
    constructor(el) {
        console.log('DropdownButton.constructor');
        this.el = el;
        this.getButtonElement().addEventListener('click', this.onButtonClick.bind(this));
    }

    getButtonElement() {
        return this.el.querySelector('button');
    }

    onButtonClick() {
        console.log('DropdownButton.onButtonClick');
        this.el.classList.toggle('show');
    }
}
