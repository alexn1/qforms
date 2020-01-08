'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewerController(data) {
    var self = this;
    //console.log('ViewerController', data);
    self.data                  = data;
    self.application           = null;
    self.applicationController = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ViewerController.prototype.init = function() {
    var self = this;

    // application
    self.application = new Application(self.data);
    var html = QForms.render(self.application.data.view, {
        model:self.application
    });
    var $view = $(html);

    // applicationController
    self.applicationController = ApplicationController.create(self.application, $view.get(0));
    self.applicationController.init();
    self.application.init();

    // show view
    $('#client').append($view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ViewerController.prototype.deinit = function() {
    var self = this;
    self.applicationController.deinit();
    self.application.deinit();
};