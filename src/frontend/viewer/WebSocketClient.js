class WebSocketClient {
    constructor(options = {}) {
        this.options = options;
        if (!options.frontHostApp) throw new Error('no frontHostApp');
        this.url = `ws://${window.location.host}/?route=${encodeURIComponent(options.route)}&uuid=${encodeURIComponent(options.uuid)}&userId=${encodeURIComponent(options.userId)}`;
        this.webSocket         = null;
        this.refreshTimeoutId  = null;
        this.RECONNECT_TIMEOUT = 10;        // sec
        this.REFRESH_TIMEOUT   = 60*60;     // sec
    }
    connect() {
        console.log('WebSocketClient.connect', this.url);
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
            this.webSocket.onclose = async e => {
                this.webSocket = null;
                reject(new Error(`Connection failed ${e.code}`));
            };
            this.webSocket.onopen = e => {
                this.webSocket.onclose   = this.onClose.bind(this);
                this.webSocket.onmessage = this.onMessage.bind(this);
                this.startRefreshTimeout();
                resolve(e);
            };
        });
    }
    async onRefreshTimeout() {
        // console.log('WebSocketClient.onRefreshTimeout');
        this.refreshTimeoutId = null;
        this.send('ping');
        this.startRefreshTimeout();
    }
    send(data) {
        console.log('WebSocketClient.send', data);
        this.webSocket.send(data);
    }
    startRefreshTimeout() {
        this.refreshTimeoutId = setTimeout(this.onRefreshTimeout.bind(this), this.REFRESH_TIMEOUT * 1000);
    }
    resetRefreshTimeout() {
        if (this.refreshTimeoutId) {
            clearTimeout(this.refreshTimeoutId);
            this.refreshTimeoutId = null;
        }
    }
    async reconnect() {
        console.log('WebSocketClient.reconnect');
        try {
            await this.connect();
        } catch (err) {
            console.error(err);
            console.log(`waiting ${this.RECONNECT_TIMEOUT} sec...`);
            setTimeout(async () => await this.reconnect(), this.RECONNECT_TIMEOUT * 1000);
        }
    }

    async onClose(e) {
        console.error('WebSocketClient.onClose', e);
        this.resetRefreshTimeout();
        this.webSocket.onclose = null;
        this.webSocket.onmessage = null;
        this.webSocket = null;
        await this.reconnect();
    }
    async onMessage(e) {
        console.log('WebSocketClient.onMessage', JSON.parse(e.data));
        const packet = JSON.parse(e.data);
        if (packet.type === 'result') {
            this.getApp().getView().disableRerender();
            await this.getApp().getModel().emitResult(packet.data);
            this.getApp().getView().enableRerender();
            this.getApp().getView().rerender();
        }
    }
    getApp() {
        return this.getFrontHostApp().applicationController;
    }
    getFrontHostApp() {
        return this.options.frontHostApp;
    }
}
