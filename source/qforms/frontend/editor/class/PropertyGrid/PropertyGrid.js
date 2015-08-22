'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyGrid(el) {
    this.el           = el;
    this.id           = el.id;
    this.tbody        = null;
    this.obj          = null;
    this.options      = null;
    this.eventChanged = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.init = function() {
    this.tbody = $(this.el).children('table').children('tbody').get(0);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.beginEdit = function(obj, options) {
    this.obj = obj;
    this.options = options;
    this.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.fill = function() {
    this.clear();
    for (var name in this.obj) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = name;
        var td2 = document.createElement('td');
        if (this.options && this.options[name] !== undefined) {
            var input = document.createElement('select');
            this.options[name].forEach(function(value) {
                var option = document.createElement('option');
                option.innerHTML = value;
                input.appendChild(option);
            });
        } else {
            var input = document.createElement('input');
        }
        input.name = name;
        input.spellcheck = false;
        input.value = this.obj[name];
        var self = this;
        $(input).change(function() {
            var e = new QForms.EventArg(self);
            e.name = this.name;
            e.value = this.value;
            self.eventChanged.fire(e);
        });
        td2.appendChild(input);
        tr.appendChild(td1);
        tr.appendChild(td2);
        this.tbody.appendChild(tr);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.clear = function() {
    this.tbody.innerHTML = '';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.endEdit = function() {
    this.obj = null;
    this.options = null;
    this.clear();
};