'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.Event = function(parent) {
    this.parent = parent;
    this.list   = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.Event.prototype.subscribe = function(obj, method) {
    this.list.push({"obj":obj,"method":method});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.Event.prototype.unsubscribe = function(obj, method) {
    var index = this.getIndex(obj,method);
    if (index == -1) {
        throw new Error("Подписчик не найден.");
    }
    this.list.splice(index,1);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.Event.prototype.getIndex = function(obj, method) {
    var index = -1;
    for (var i=0;i<this.list.length;i++) {
        if (this.list[i].obj === obj && this.list[i].method === method) {
            index = i;
            break;
        }
    }
    return index;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.Event.prototype.fire = function(eventArgs) {
    eventArgs.object = this.parent;
    this.list.forEach(function(sub) {
        sub.obj[sub.method](eventArgs);
    });
};
