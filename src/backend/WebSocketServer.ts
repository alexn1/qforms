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
        if (!parts.query.route) throw new Error('no route');
        if (!parts.query.uuid) throw new Error('no uuid');
        webSocket.route = parts.query.route;
        webSocket.uuid = parts.query.uuid;
        webSocket.on('close', this.onClose.bind(this, webSocket));
        webSocket.on('message', this.onMessage.bind(this, webSocket));

        // add to clients
        if (!this.clients[webSocket.route]) this.clients[webSocket.route] = [];
        this.clients[webSocket.route].push(webSocket);

        // say hello
        webSocket.send(`hello ${webSocket.uuid}`);
        // console.log('this.clients', this.clients);
    }
    onClose(webSocket, code, reason) {
        console.log('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        const i = this.clients[webSocket.route].indexOf(webSocket);
        if (i === -1) throw new Error(`cannot find socket: ${webSocket.route} webSocket.uuid`);
        console.log('i:', i);
        this.clients[webSocket.route].splice(i, 1);
        console.log('this.clients', this.clients);
    }
    onMessage(webSocket, data, flags) {
        console.log('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }
}

export = WebSocketServer;
