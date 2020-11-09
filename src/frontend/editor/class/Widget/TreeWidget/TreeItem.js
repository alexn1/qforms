'use strict';

class TreeItem {
    
    constructor(parent, caption, className) {
        this.parent    = parent;
        this.tree      = parent.tree;
        this.caption   = caption;
        this.className = className;
        this.li        = null;
        this.div       = null;
        this.node      = null;
        this.text      = null;
        this.ul        = null;
        this.items     = [];
        this.init();
    }

    init() {
        const self = this;
        // li
        self.li = document.createElement('li');
        if (self.className !== undefined) self.li.className = self.className;
        // div
        self.div = document.createElement('div');
        self.div.style.paddingLeft = ((self.parent.ul.level * 15) + 5) + 'px';
        $(self.div).mousedown(function() {self.onDivMouseDown(this);});
        $(self.div).dblclick(function() {self.onDivDoubleClick(this);});
        // node
        self.node = document.createElement('span');
        self.node.className = 'leaf';
        $(self.node).mousedown(function(e) {self.onNodeMouseDown(e, this);});
        // text
        self.text = document.createElement('span');
        self.text.innerHTML = this.caption;
        // ul
        self.ul = document.createElement('ul');
        self.ul.level = self.parent.ul.level + 1;
        // div child
        self.div.appendChild(self.node);
        self.div.appendChild(document.createTextNode(' '));
        self.div.appendChild(self.text);
        // li child
        self.li.appendChild(self.div);
        self.li.appendChild(self.ul);
    }

    setCaption(caption) {
        this.caption = caption;
        this.text.innerHTML = this.caption;
    }

    onDivDoubleClick(div) {
        this.tree.emit('doubleClick', {source: this, item: this});
    }

    onDivMouseDown(div) {
        this.select(true);
    }

    select(noscroll) {
        if (this.tree.active === this) {
            return;
        }

        if (this.tree.active !== null) {
            this.tree.active.div.classList.remove('active');
        }
        this.div.classList.add('active');
        this.tree.active = this;
        this.tree.makeOpened(this);
        if (!noscroll) {
            this.li.scrollIntoView();
        }
        this.tree.emit('select', {source: this, item: this});
    }

    makeOpened(item) {
    }

    open() {
        this.li.classList.add('opened');
    }

    onNodeMouseDown(e, node) {
        node.parentNode.parentNode.classList.toggle('opened');
        e.stopPropagation();
        this.tree.emit('open', {source: this, item: this});
    }

    addItem(caption, className, i) {
        const item = new TreeItem(this, caption, className);
        if (i === undefined) {
            this.ul.appendChild(item.li);
        } else {
            QForms.insertNewNodeAt(this.ul, item.li, i);
        }
        this.node.className = 'node';
        this.items.push(item);
        return item;
    }

    removeItem(item) {
        this.ul.removeChild(item.li);
        if (this.ul.childElementCount === 0) {
            this.node.className = 'leaf';
        }
        if (this.tree.active === item) {
            this.tree.active = null;
        }
        // remove from items
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        // event
        this.tree.emit('delete', {source: this, item: item});
    }

    remove(item) {
        this.parent.removeItem(this);
    }

    changeParent(newParent, newIndex) {
        this.parent.ul.removeChild(this.li);				// removing themselves from list of old parent
        if (this.parent.node && this.parent.ul.childElementCount === 0) this.parent.node.className = 'leaf';
        QForms.insertNewNodeAt(newParent.ul, this.li, newIndex);	// adding to new parent with specified index
        if (newParent.node) newParent.node.className = 'node';
        this.parent = newParent;
        this.div.style.paddingLeft = ((this.parent.ul.level * 15) + 5) + 'px';
        this.ul.level = this.parent.ul.level + 1;
    }

    move(offset) {
        const index = Array.prototype.indexOf.call(this.parent.ul.childNodes, this.li);
        QForms.moveNode(this.parent.ul, this.li, index, index + offset);
    }

}
