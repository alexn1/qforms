'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewerController(data) {
    //console.log(data);
    this.data = data;
    this.application = null;
    this.applicationController = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ViewerController.prototype.init = function() {
    this.application = new Application(this.data);
    var html = QForms.render(this.application.data.view, {model:this.application});
    var $view = $(html);
    this.applicationController = ApplicationController.create(this.application, $view.get(0));
    this.applicationController.init();
    this.application.init();
    $('#client').append($view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ViewerController.prototype.deinit = function() {
    this.applicationController.deinit();
    this.application.deinit();
};