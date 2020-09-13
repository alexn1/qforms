'use strict';

class MenuWidget extends Widget {
    constructor(el) {
        console.log('MenuWidget.constructor', el);
        super(el);
        this.onClick = null;

        // menus
        this.el.querySelectorAll('div > button').forEach(button => {
            button.addEventListener('click', this.onMenuClick.bind(this));
            button.addEventListener('blur', this.onMenuBlur.bind(this));
        });

        // menu items
        this.el.querySelectorAll('div > div > a').forEach(a => {
            a.addEventListener('mousedown', this.onMenuItemMouseDown.bind(this));
            a.addEventListener('click', this.onMenuItemClick.bind(this));
        });
    }

    onMenuItemMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    onMenuItemClick(event) {
        console.log('MenuWidget.onMenuItemClick', event);
        event.target.parentElement.parentElement.classList.remove('show');
        if (this.onClick) {
            return this.onClick(event.target);
        }
    }

    onMenuClick(event) {
        console.log('MenuWidget.onMenuClick:', event.target);
        event.target.parentElement.classList.toggle('show');
    }

    onMenuBlur(event) {
        console.log('MenuWidget.onMenuBlur:', event.target);
        event.target.parentElement.classList.remove('show');
    }
}
