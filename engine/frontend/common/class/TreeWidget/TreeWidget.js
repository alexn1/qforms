"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $("div[data-class='TreeWidget']").each(function() {
        TreeWidget_createObject(this);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeWidget_createObject(el) {
    el._obj = new TreeWidget(el);
    el._obj.init();
    return el._obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeWidget(el) {
    this.el = el;
    this.id = el.id;
    this.tree   = this;
    this.ul     = null;
    this.active = null; //active TreeItem
    this.items  = [];
    this.eventDoubleClick = new QForms.Event(this);
    this.eventSelect = new QForms.Event(this);
    this.eventOpen = new QForms.Event(this);
    this.eventDelete = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.init = function() {
    var self = this;
    if ($(this.el).children("ul").length === 0) {
        $(this.el).append('<ul></ul>');
    }
    this.ul = $(this.el).children("ul").get(0);
    this.ul.level = 0;

    /*
    $(this.el).find(".node").mousedown(function() {
        this.parentNode.parentNode.classList.toggle("opened");
    });
    $(this.el).find("ul").each(function() {
        if ($(this).parents(".TreeWidget ul").get(0)) {
            this.level = $(this).parents("ul").get(0).level + 1;
        } else {
            this.level = 0;
        }
    });
    $(this.el).find("li > div").each(function() {
        var level = $(this).parents(".TreeWidget ul").get(0).level;
        this.style.paddingLeft = ((level * 15) + 5) + "px";
        $(this).mousedown(function() {
            if (self.active !== null) self.active.classList.remove("active");
            this.classList.add("active");
            self.active = this;
        });
        $(this).dblclick(function() {
            self.onDoubleClick(this);
        });
    });*/
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.deinit = function() {
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.addItem = function(caption,className,i) {
    var item = new TreeItem(this,caption,className);
    if (i === undefined) {
        this.ul.appendChild(item.li);
    } else {
        QForms.insertNewNodeAt(this.ul,item.li,i);
    }
    this.items.push(item);
    return item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeWidget.prototype.removeItem = function(item) {
    this.ul.removeChild(item.li);
    if (this.ul.childElementCount === 0) {
        this.node.className = "leaf";
    }
    if (this.active === item) {
        this.active = null;
    }
    // remove from items
    var index = this.items.indexOf(item);
    if (index > -1) {
        this.items.splice(index, 1);
    }
    // event
    var e = new QForms.EventArg(this);
    e.item = item;
    this.eventDelete.fire(e);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// recursively opens all the parent elements
TreeWidget.prototype.makeOpened = function(item) {
    if (item.parent instanceof TreeItem) {
        item.parent.open();
        this.makeOpened(item.parent);
    }
};