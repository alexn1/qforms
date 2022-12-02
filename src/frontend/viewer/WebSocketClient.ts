export class WebSocketClient {
    options: any;
    url: string;
    webSocket: any;
    refreshTimeoutId: any;
    RECONNECT_TIMEOUT: number;
    REFRESH_TIMEOUT: number;
    constructor(options: any = {}) {
        // console.log('WebSocketClient.constructor', options);
        this.options = options;
        if (!options.applicationController) throw new Error('no options.applicationController');
        if (!options.protocol) throw new Error('no options.protocol');
        this.url = `${options.protocol}://${window.location.host}/?${this.createUriParamsString(options)}`;
        this.webSocket         = null;
        this.refreshTimeoutId  = null;
        this.RECONNECT_TIMEOUT = 10;        // sec
        this.REFRESH_TIMEOUT   = 60*60;     // sec
    }
    createUriParamsString(options) {
        const params = {
            route  : options.route,
            uuid   : options.uuid,
            userId : options.userId,
            version: this.getApp().getModel().getData().versions.app
        };
        return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
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
            console.log(`waiting ${this.RECONNECT_TIMEOUT} sec for socket reconnect...`);
            setTimeout(async () => await this.reconnect(), this.RECONNECT_TIMEOUT * 1000);
        }
    }

    async onClose(e) {
        console.error('WebSocketClient.onClose', e);
        this.getApp().getHostApp().logError(new Error(`websocket close ${this.getApp().getModel().getDomain()}/${this.getApp().getModel().getName()}`));
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
        return this.options.applicationController;
    }
}
