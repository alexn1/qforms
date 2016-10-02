'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeItem(parent, caption, className) {
    var self = this;
    self.parent    = parent;
    self.tree      = parent.tree;
    self.caption   = caption;
    self.className = className;
    self.li        = null;
    self.div       = null;
    self.node      = null;
    self.text      = null;
    self.ul        = null;
    self.items     = [];
    self.init();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.init = function() {
    var self = this;
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.setCaption = function(caption) {
    var self = this;
    self.caption = caption;
    self.text.innerHTML = self.caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onDivDoubleClick = function(div) {
    var self = this;
    //var e = new QForms.EventArg(this);
    //e.item = this;
    //this.tree.eventDoubleClick.fire({source: this, item: this});
    self.tree.emit('doubleClick', {source: self, item: self});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onDivMouseDown = function(div) {
    var self = this;
    self.select(true);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.select = function(noscroll) {
    var self = this;
    if (self.tree.active === self) {
        return;
    }

    if (self.tree.active !== null) {
        self.tree.active.div.classList.remove('active');
    }
    self.div.classList.add('active');
    self.tree.active = self;
    self.tree.makeOpened(self);
    if (!noscroll) {
        self.li.scrollIntoView();
    }
    //var e = new QForms.EventArg(this);
    //e.item = this;
    //this.tree.eventSelect.fire({source: this, item: this});
    self.tree.emit('select', {source: self, item: self});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.makeOpened = function(item) {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.open = function() {
    var self = this;
    self.li.classList.add('opened');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onNodeMouseDown = function(e, node) {
    var self = this;
    node.parentNode.parentNode.classList.toggle('opened');
    e.stopPropagation();
    //var e = new QForms.EventArg(this);
    //e.item = this;
    //this.tree.eventOpen.fire({source: this, item: this});
    self.tree.emit('open', {source: self, item: self});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.addItem = function(caption, className, i) {
    var self = this;
    var item = new TreeItem(self, caption, className);
    if (i === undefined) {
        self.ul.appendChild(item.li);
    } else {
        QForms.insertNewNodeAt(self.ul, item.li, i);
    }
    self.node.className = 'node';
    self.items.push(item);
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.removeItem = function(item) {
    var self = this;
    self.ul.removeChild(item.li);
    if (self.ul.childElementCount === 0) {
        self.node.className = 'leaf';
    }
    if (self.tree.active === item) {
        self.tree.active = null;
    }
    // remove from items
    var index = self.items.indexOf(item);
    if (index > -1) {
        self.items.splice(index, 1);
    }
    // event
    //var e = new QForms.EventArg(this);
    //e.item = item;
    //this.tree.eventDelete.fire({source: this, item: item});
    self.tree.emit('delete', {source: self, item: item});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.remove = function(item) {
    var self = this;
    self.parent.removeItem(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.changeParent = function(newParent, newIndex) {
    var self = this;
    self.parent.ul.removeChild(self.li);				// removing themselves from list of old parent
    if (self.parent.node && self.parent.ul.childElementCount === 0) self.parent.node.className = 'leaf';
    QForms.insertNewNodeAt(newParent.ul, self.li, newIndex);	// adding to new parent with specified index
    if (newParent.node) newParent.node.className = 'node';
    self.parent = newParent;
    self.div.style.paddingLeft = ((self.parent.ul.level * 15) + 5) + 'px';
    self.ul.level = self.parent.ul.level + 1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.move = function(offset) {
    var self = this;
    var index = Array.prototype.indexOf.call(self.parent.ul.childNodes, self.li);
    QForms.moveNode(self.parent.ul, self.li, index, index + offset);
};