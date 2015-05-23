"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function qfTable(name) {
    this.name = name;
    this.eventUpdated = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
qfTable.prototype.fireUpdated = function(eventArg) {
    this.eventUpdated.fire(eventArg);
}
