class WebSocketClient {
    constructor(options = {}) {
        this.options = options;
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
                this.webSocket.onclose = this.onClose.bind(this);
                this.webSocket.onmessage = this.onMessage.bind(this);
                resolve(e);
            };
        });
    }
    onClose(e) {
        console.log('WebSocketClient.onClose', e);
    }
    onMessage(e) {
        console.log('WebSocketClient.onMessage', JSON.parse(e.data));
    }
}
