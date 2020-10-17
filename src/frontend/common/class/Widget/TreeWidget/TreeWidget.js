'use strict';

$(document).ready(() => {
    console.log('TreeWidget document ready');
    $('div.TreeWidget').each(function() {
        TreeWidget_createObject(this);
    });
});

function TreeWidget_createObject(el) {
    el._obj = new TreeWidget(el);
    el._obj.init();
    return el._obj;
}

class TreeWidget extends Widget {

    constructor(el) {
        super(el);
        this.id     = el.id;
        this.tree   = this;
        this.ul     = null;
        this.active = null; //active TreeItem
        this.items  = [];
    }

    init() {
        if ($(this.el).children('ul').length === 0) {
            $(this.el).append('<ul></ul>');
        }
        this.ul = $(this.el).children('ul').get(0);
        this.ul.level = 0;

        /*
        $(this.el).find('.node').mousedown(function() {
            this.parentNode.parentNode.classList.toggle('opened');
        });
        $(this.el).find('ul').each(function() {
            if ($(this).parents('.TreeWidget ul').get(0)) {
                this.level = $(this).parents('ul').get(0).level + 1;
            } else {
                this.level = 0;
            }
        });
        $(this.el).find('li > div').each(function() {
            const level = $(this).parents('.TreeWidget ul').get(0).level;
            this.style.paddingLeft = ((level * 15) + 5) + 'px';
            $(this).mousedown(function() {
                if (self.active !== null) self.active.classList.remove('active');
                this.classList.add('active');
                self.active = this;
            });
            $(this).dblclick(function() {
                self.onDoubleClick(this);
            });
        });*/
    }

    deinit() {
    }

    addItem(caption, className, i) {
        const item = new TreeItem(this, caption, className);
        if (i === undefined) {
            this.ul.appendChild(item.li);
        } else {
            QForms.insertNewNodeAt(this.ul, item.li, i);
        }
        this.items.push(item);
        return item;
    }

    removeItem(item) {
        this.ul.removeChild(item.li);
        if (this.ul.childElementCount === 0) {
            this.node.className = 'leaf';
        }
        if (this.active === item) {
            this.active = null;
        }
        // remove from items
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        // event
        this.emit('delete', {source: this, item: item});
    }

    // recursively opens all the parent elements
    makeOpened(item) {
        if (item.parent instanceof TreeItem) {
            item.parent.open();
            this.makeOpened(item.parent);
        }
    }

}
