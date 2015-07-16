'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.EventArg = function(source) {
    this.source = source;// object that emit event
    this.object = null; // object - owner of event
    this.inner  = null;  // inner event
};