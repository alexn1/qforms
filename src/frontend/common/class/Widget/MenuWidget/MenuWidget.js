'use strict';

class MenuWidget extends Widget {
    constructor(el) {
        console.log('MenuWidget.constructor', el);
        super(el);
        const buttons = this.el.querySelectorAll('.dropdown > button');
        buttons.forEach(button => button.addEventListener('click', this.onDropdownButtonClick.bind(this)));
    }

    onDropdownButtonClick(event) {
        console.log('onDropdownButtonClick:', event.target);
        const dropdownContent = event.target.parentElement.querySelector('.dropdown-content');
        dropdownContent.classList.add('show');
    }
}
