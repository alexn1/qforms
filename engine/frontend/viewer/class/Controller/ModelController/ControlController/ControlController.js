"use strict"

QForms.inherit(ControlController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(model) {
    ModelController.call(this,model);
    this.$el = null;
    this.eventClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.init = function() {
    this.$el = $("#{page}_{form}_{control}"
        .replace("{page}",this.model.form.page.id)
        .replace("{form}",this.model.form.name)
        .replace("{control}",this.model.name)
    );

    var self = this;
    this.$el.children().click(function() {
        self.onClick(this);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.onClick = function(el) {
    this.eventClick.fire(new QForms.EventArg(this));
}