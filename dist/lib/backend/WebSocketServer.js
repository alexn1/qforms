"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Context_1 = __importDefault(require("./Context"));
const ws = require('ws');
const url = require('url');
class WebSocketServer {
    constructor(options) {
        console.log('WebSocketServer.constructor');
        this.backHostApp = options.backHostApp;
        this.server = new ws.Server({
            server: options.httpServer,
            path: '/'
        });
        this.server.on('error', this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }
    onError(err) {
        console.log('WebSocketServer.onError', err);
    }
    async onConnection(webSocket) {
        console.log('WebSocketServer.onConnection', webSocket.upgradeReq.url);
        const parts = url.parse(webSocket.upgradeReq.url, true);
        if (!parts.query.route)
            throw new Error('no route');
        if (!parts.query.uuid)
            throw new Error('no uuid');
        webSocket.route = parts.query.route;
        webSocket.uuid = parts.query.uuid;
        webSocket.on('close', this.onClose.bind(this, webSocket));
        webSocket.on('message', this.onMessage.bind(this, webSocket));
        const [domain, appDirName, appFileName, env] = parts.query.route.split('/');
        const context = new Context_1.default({ module: 'viewer', domain, appDirName, appFileName, env });
        const application = await this.backHostApp.createApplicationIfNotExists(context);
        application.addClient(webSocket);
        // say hello
        webSocket.send(JSON.stringify({ type: 'info', data: { hello: webSocket.uuid } }));
        // console.log('this.clients', this.clients);
        context.destroy();
    }
    onClose(webSocket, code, reason) {
        console.log('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        this.backHostApp.getApplicationByRoute(webSocket.route).removeClient(webSocket);
    }
    onMessage(webSocket, data, flags) {
        console.log('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }
}
module.exports = WebSocketServer;
