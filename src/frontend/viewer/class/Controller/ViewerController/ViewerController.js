'use strict';

class ViewerController {
    constructor(data) {
        //console.log('ViewerController', data);
        this.data                  = data;
        this.application           = null;
        this.applicationController = null;
    }

    init() {
        console.log('ViewerController.init');

        // application
        this.application = new Application(this.data);
        this.application.init();

        // applicationController
        const html = QForms.render(this.application.data.view, {model: this.application});
        const $view = $(html);
        this.applicationController = ApplicationController.create(this.application, $view.get(0));
        this.applicationController.init();

        // show view
        $('#client').append($view);
    }

    deinit() {
        this.applicationController.deinit();
        this.application.deinit();
    }

}
