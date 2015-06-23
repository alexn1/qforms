'use strict';

QForms.inherit(PageLinkController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkController(model,item) {
    ModelController.call(this,model);
    this.item = item;
};