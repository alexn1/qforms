'use strict';

QForms.inherits(ControlController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(model, item) {
    var self = this;
    VisualController.call(self, model);
    self.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getCaption = function(controlData) {
    var self = this;
    var caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
        .replace('{name}', controlData['@attributes'].name)
        .replace('{class}', controlData['@class']);
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'delete', 'caption': 'Delete'}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.getPropList = function() {
    var self = this;
    var list = self.model.data['@attributes'];
    var options = {};
    options['isVisible'] = ['true', 'false'];
    options['readOnly']  = ['true', 'false'];
    options['notNull']   = ['true', 'false'];
    return {list: list, options: options};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'delete':
            self.delete();
            break;
    }
};