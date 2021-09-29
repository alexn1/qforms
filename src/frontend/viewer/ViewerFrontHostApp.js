class ViewerFrontHostApp extends FrontHostApp {
    constructor(data) {
        super(data);
        this.applicationController = null;
        this.webSocketClient = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.data);

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = this.applicationController = ApplicationController.create(application);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);

        // web socket client
        try {
            this.webSocketClient = new WebSocketClient();
            await this.webSocketClient.connect();
        } catch (err) {
            console.error('connection error:', err);
        }
    }
    async onDocumentKeyDown(e) {
        // console.log('ViewerFrontHostApp.onDocumentKeyDown', e);
        await this.applicationController.onDocumentKeyDown(e);
    }

    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
}

window.QForms.ViewerFrontHostApp = ViewerFrontHostApp;
