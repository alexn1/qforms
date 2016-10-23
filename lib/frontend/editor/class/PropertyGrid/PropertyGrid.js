'use strict';

QForms.inherits(PropertyGrid, EventEmitter);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyGrid(el) {
    var self = this;
    self.el           = el;
    self.id           = el.id;
    self.tbody        = null;
    self.obj          = null;
    self.options      = null;
    //this.eventChanged = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.init = function() {
    var self = this;
    self.tbody = $(self.el).children('table').children('tbody').get(0);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.beginEdit = function(obj, options) {
    var self = this;
    self.obj     = obj;
    self.options = options;
    self.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.fill = function() {
    var self = this;
    self.clear();
    for (var name in self.obj) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = name;
        var td2 = document.createElement('td');
        if (self.options && self.options[name] !== undefined) {
            var input = document.createElement('select');
            this.options[name].forEach(function(value) {
                var option = document.createElement('option');
                option.innerHTML = value;
                input.appendChild(option);
            });
        } else {
            var input = document.createElement('input');
        }
        input.name       = name;
        input.spellcheck = false;
        input.value      = self.obj[name];
        $(input).change(function () {
            self.emit('changed', {source: self, name: this.name, value: this.value});
        });
        td2.appendChild(input);
        tr.appendChild(td1);
        tr.appendChild(td2);
        self.tbody.appendChild(tr);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.clear = function() {
    var self = this;
    self.tbody.innerHTML = '';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyGrid.prototype.endEdit = function() {
    var self = this;
    self.obj     = null;
    self.options = null;
    self.clear();
};