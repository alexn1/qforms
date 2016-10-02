'use strict';

QForms.inherits(TreeWidget, Widget);

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('div.TreeWidget').each(function() {
        TreeWidget_createObject(this);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeWidget_createObject(el) {
    el._obj = new TreeWidget(el);
    el._obj.init();
    return el._obj;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeWidget(el) {
    var self = this;
    TreeWidget.super_.call(self, el);
    self.id = el.id;
    self.tree   = self;
    self.ul     = null;
    self.active = null; //active TreeItem
    self.items  = [];
    //this.eventDoubleClick = new QForms.Event(this);
    //this.eventSelect      = new QForms.Event(this);
    //this.eventOpen        = new QForms.Event(this);
    //this.eventDelete      = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.init = function() {
    var self = this;
    if ($(self.el).children('ul').length === 0) {
        $(self.el).append('<ul></ul>');
    }
    self.ul = $(self.el).children('ul').get(0);
    self.ul.level = 0;

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
        var level = $(this).parents('.TreeWidget ul').get(0).level;
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.deinit = function() {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.addItem = function(caption, className, i) {
    var self = this;
    var item = new TreeItem(self, caption, className);
    if (i === undefined) {
        self.ul.appendChild(item.li);
    } else {
        QForms.insertNewNodeAt(self.ul, item.li, i);
    }
    self.items.push(item);
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.removeItem = function(item) {
    var self = this;
    self.ul.removeChild(item.li);
    if (self.ul.childElementCount === 0) {
        self.node.className = 'leaf';
    }
    if (self.active === item) {
        self.active = null;
    }
    // remove from items
    var index = self.items.indexOf(item);
    if (index > -1) {
        self.items.splice(index, 1);
    }
    // event
    //var e = new QForms.EventArg(this);
    //e.item = item;
    //this.eventDelete.fire({source: this, item: item});
    self.emit('delete', {source: self, item: item});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// recursively opens all the parent elements
TreeWidget.prototype.makeOpened = function(item) {
    var self = this;
    if (item.parent instanceof TreeItem) {
        item.parent.open();
        self.makeOpened(item.parent);
    }
};