'use strict';

QForms.inherit(DocumentController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DocumentController(model) {
    var self = this;
    ModelController.call(self, model);
    self.tab = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DocumentController.prototype.createTab = function(docs) {
    var self = this;
    var name = self.model.data['@attributes'].name;
    var $div = $('<div style="height:100%;background-color:lightgoldenrodyellow;">sample tab</div>');
    self.tab = docs.createTab($div.get(0), name, function(tab) {
        tab.ctrl.tab = undefined;
    });
    self.tab.ctrl = self;
    docs.selectTab(self.tab);
};