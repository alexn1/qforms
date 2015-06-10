"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeItem(parent,caption,className) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.init = function() {
    var self = this;
    // li
    this.li = document.createElement("li");
    if (this.className !== undefined) this.li.className = this.className;
    // div
    this.div = document.createElement("div");
    this.div.style.paddingLeft = ((this.parent.ul.level * 15) + 5) + "px";
    $(this.div).mousedown(function() {self.onDivMouseDown(this);});
    $(this.div).dblclick(function() {self.onDivDoubleClick(this);});
    // node
    this.node = document.createElement("span");
    this.node.className = "leaf";
    $(this.node).mousedown(function(e) {self.onNodeMouseDown(e,this);});
    // text
    this.text = document.createElement("span");
    this.text.innerHTML = this.caption;
    // ul
    this.ul = document.createElement("ul");
    this.ul.level = this.parent.ul.level + 1;
    // div child
    this.div.appendChild(this.node);
    this.div.appendChild(document.createTextNode(" "));
    this.div.appendChild(this.text);
    // li child
    this.li.appendChild(this.div);
    this.li.appendChild(this.ul);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.setCaption = function(caption) {
    this.caption = caption;
    this.text.innerHTML = this.caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onDivDoubleClick = function(div) {
    var e = new QForms.EventArg(this);
    e.item = this;
    this.tree.eventDoubleClick.fire(e);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onDivMouseDown = function(div) {
    this.select(true);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.select = function(noscroll) {
    if (this.tree.active === this) {
        return;
    }

    if (this.tree.active !== null) {
        this.tree.active.div.classList.remove("active");
    }
    this.div.classList.add("active");
    this.tree.active = this;
    this.tree.makeOpened(this);
    if (!noscroll) {
        this.li.scrollIntoView();
    }
    var e = new QForms.EventArg(this);
    e.item = this;
    this.tree.eventSelect.fire(e);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.makeOpened = function(item) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.open = function() {
    this.li.classList.add("opened");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.onNodeMouseDown = function(e,node) {
    node.parentNode.parentNode.classList.toggle("opened");
    e.stopPropagation();
    var e = new QForms.EventArg(this);
    e.item = this;
    this.tree.eventOpen.fire(e);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.addItem = function(caption,className,i) {
    var item = new TreeItem(this,caption,className);
    if (i === undefined) {
        this.ul.appendChild(item.li);
    } else {
        QForms.insertNewNodeAt(this.ul,item.li,i);
    }
    this.node.className = "node";
    this.items.push(item);
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.removeItem = function(item) {
    this.ul.removeChild(item.li);
    if (this.ul.childElementCount === 0) {
        this.node.className = "leaf";
    }
    if (this.tree.active === item) {
        this.tree.active = null;
    }
    // remove from items
    var index = this.items.indexOf(item);
    if (index > -1) {
        this.items.splice(index, 1);
    }
    // event
    var e = new QForms.EventArg(this);
    e.item = item;
    this.tree.eventDelete.fire(e);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.remove = function(item) {
    this.parent.removeItem(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.changeParent = function(newParent,newIndex) {
    this.parent.ul.removeChild(this.li);				// removing themselves from list of old parent
    if (this.parent.node && this.parent.ul.childElementCount === 0) this.parent.node.className = "leaf";
    QForms.insertNewNodeAt(newParent.ul,this.li,newIndex);	// adding to new parent with specified index
    if (newParent.node) newParent.node.className = "node";
    this.parent = newParent;
    this.div.style.paddingLeft = ((this.parent.ul.level * 15) + 5) + "px";
    this.ul.level = this.parent.ul.level + 1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeItem.prototype.move = function(offset) {
    var index = Array.prototype.indexOf.call(this.parent.ul.childNodes, this.li);
    QForms.moveNode(this.parent.ul, this.li, index, index + offset);
};