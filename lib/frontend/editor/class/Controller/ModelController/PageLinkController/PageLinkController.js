'use strict';

QForms.inherit(PageLinkController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkController(model, item) {
    var self = this;
    ModelController.call(self, model);
    self.item = item;
}