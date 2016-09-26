'use strict';

QForms.inherits(ModelController, EventEmitter);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ModelController(model) {
    var self = this;
    self.model     = model;
    self.listeners = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getPropList = function() {
    return {
        list:this.model.data['@attributes'],
        options:{}
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.setProperty = function(name, value) {
    var self = this;
    this.model.setValue(name, value, function() {
        if (name === 'name') {
            self.item.text.innerHTML = self.getCaption(self.model.data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getCaption = function(data) {
    return "<span class='green'>{name}</span>".replace('{name}', data['@attributes'].name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.delete = function() {
    var self = this;
    this.model.delete(function () {
        self.item.parent.removeItem(self.item);
    });
};