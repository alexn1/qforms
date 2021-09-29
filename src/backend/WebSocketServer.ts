const ws = require('ws');

class WebSocketServer {
    server: any;
    constructor(options) {
        console.log('WebSocketServer.constructor')
        this.server = new ws.Server({
            server: options.httpServer,
            path: '/'
        });
        this.server.on('error'     , this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }
    onError(err) {
        console.log('WebSocketServer.onError', err);
    }
    onConnection(webSocket) {
        console.log('WebSocketServer.onConnection', webSocket);
    }
}

export = WebSocketServer;
