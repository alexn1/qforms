'use strict';

QForms.inherit(DocumentController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DocumentController(model) {
    ModelController.call(this, model);
    this.tab = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DocumentController.prototype.createTab = function(docs) {
    var name = this.model.data['@attributes'].name;
    var $div = $('<div style="height:100%;background-color:lightgoldenrodyellow;">sample tab</div>');
    this.tab = docs.createTab($div.get(0), name, function(tab) {
        tab.ctrl.tab = undefined;
    });
    this.tab.ctrl = this;
    docs.selectTab(this.tab);
};