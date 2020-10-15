'use strict';

class ViewerController {
    constructor(data) {
        //console.log('ViewerController', data);
        this.data                  = data;
        this.applicationController = null;
    }

    init() {
        console.log('ViewerController.init');
        const root = document.querySelector('#client');
        const application = new Application(this.data);
        application.init();
        const applicationController = this.applicationController = ApplicationController.create(application);
        applicationController.init();
        applicationController.createView(root);
        // show view
        // const html = QForms.render(application.data.view, {model: application});
        // view = $(html).get(0);
        /*if (view) {
            console.log('append app view to DOM');
            root.appendChild(view);
        } else {

        }*/
    }

    deinit() {
        this.applicationController.deinit();
        this.applicationController.model.deinit();
    }

}
