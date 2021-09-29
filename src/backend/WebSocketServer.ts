const ws = require('ws');
const url = require('url');

class WebSocketServer {
    server: any;
    clients: any;
    constructor(options) {
        console.log('WebSocketServer.constructor')
        this.server = new ws.Server({
            server: options.httpServer,
            path: '/'
        });
        this.server.on('error'     , this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
        this.clients = {};
    }
    onError(err) {
        console.log('WebSocketServer.onError', err);
    }
    onConnection(webSocket) {
        console.log('WebSocketServer.onConnection', webSocket.upgradeReq.url);
        const parts = url.parse(webSocket.upgradeReq.url, true);
        const route = parts.query.route;
        if (!route) throw new Error('no route');
        const uuid = parts.query.uuid;
        if (!uuid) throw new Error('no uuid');
        webSocket.uuid = uuid;
        if (!this.clients[route]) {
            this.clients[route] = [];
        }
        this.clients[route].push(webSocket);
        webSocket.send(`hello ${webSocket.uuid}`);
    }
}

export = WebSocketServer;
