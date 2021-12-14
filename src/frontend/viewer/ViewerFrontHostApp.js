class ViewerFrontHostApp extends FrontHostApp {
    constructor(data) {
        if (!data) throw new Error('no data');
        super();
        this.data = data;
        this.applicationController = null;
        this.webSocketClient = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.data);

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = this.applicationController = ApplicationController.create(application, this);
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
            this.webSocketClient = new WebSocketClient({
                protocol: this.data.nodeEnv === 'development' ? 'ws' : 'wss',
                frontHostApp: this,
                route: this.data.route,
                uuid: this.data.uuid,
                userId: this.data.user ? this.data.user.id : null,
            });
            await this.webSocketClient.connect();
        } catch (err) {
            this.logError(err);
        }
    }
    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
}

window.QForms.ViewerFrontHostApp = ViewerFrontHostApp;
