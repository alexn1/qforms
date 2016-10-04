'use strict';

QForms.inherit(LinkField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkField(name, form, data) {
    var self = this;
    LinkField.super_.call(self, name, form, data);
}