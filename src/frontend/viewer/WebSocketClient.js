class WebSocketClient {
    constructor(options = {}) {
        this.options = options;
        if (!options.frontHostApp) throw new Error('no frontHostApp');
        if (!options.application) throw new Error('no application');
        this.url = `ws://${window.location.host}/?route=${encodeURIComponent(options.route)}&uuid=${encodeURIComponent(options.uuid)}`;
        this.webSocket = null;
    }
    connect() {
        console.log('WebSocketClient.connect', this.url);
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
            this.webSocket.onclose = e => {
                this.webSocket = null;
                reject(new Error(`Connection failed ${e.code}`));
            };
            this.webSocket.onopen = e => {
                // this.webSocket.onerror   = this.onError.bind(this);
                this.webSocket.onclose   = this.onClose.bind(this);
                this.webSocket.onmessage = this.onMessage.bind(this);
                resolve(e);
            };
        });
    }
    /*onError(e) {
        console.log('WebSocketClient.onError', e);
    }*/
    onClose(e) {
        console.error('WebSocketClient.onClose', e);
        // this.webSocket.onerror = null;
        this.webSocket.onclose = null;
        this.webSocket.onmessage = null;
        this.webSocket = null;
    }
    onMessage(e) {
        console.log('WebSocketClient.onMessage', JSON.parse(e.data));
        const packet = JSON.parse(e.data);
        if (packet.type === 'result') {
            this.getApp().emitResult(packet.data);
        }
    }
    getApp() {
        return this.options.application;
    }
    getFrontHostApp() {
        return this.options.frontHostApp;
    }
}
