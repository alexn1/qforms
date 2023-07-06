"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const url_1 = __importDefault(require("url"));
const safe_1 = __importDefault(require("colors/safe"));
const Context_1 = require("./Context");
class WebSocketServer {
    constructor(options) {
        this.options = options;
        // console.debug('WebSocketServer.constructor');
        this.server = new ws_1.default.Server({
            server: options.httpServer,
            path: '/',
        });
        this.server.on('error', this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }
    async onError(err) {
        console.error('WebSocketServer.onError', err);
    }
    async onConnection(webSocket) {
        console.debug('WebSocketServer.onConnection', webSocket.upgradeReq.url);
        console.log('wss:', safe_1.default.bgYellow(safe_1.default.black(decodeURIComponent(webSocket.upgradeReq.url))));
        const parts = url_1.default.parse(webSocket.upgradeReq.url, true);
        // console.debug('parts.query:', parts.query);
        if (!parts.query.route)
            throw new Error('no route');
        if (!parts.query.uuid)
            throw new Error('no uuid');
        webSocket.route = parts.query.route;
        webSocket.uuid = parts.query.uuid;
        webSocket.userId = parts.query.userId;
        webSocket.customFields = {
            version: parts.query.version,
        };
        webSocket.on('close', this.onClose.bind(this, webSocket));
        webSocket.on('message', this.onMessage.bind(this, webSocket));
        const [appDirName, appFileName, env, domain] = parts.query.route.split('/');
        const context = new Context_1.Context({
            module: 'viewer',
            appDirName,
            appFileName,
            env,
            domain,
        });
        const application = await this.getHostApp().createApplicationIfNotExists(context);
        application.addClient(webSocket);
        // say hello
        webSocket.send(JSON.stringify({ type: 'info', data: { hello: webSocket.uuid } }));
        // console.debug('this.clients', this.clients);
        context.destroy();
    }
    async onClose(webSocket, code, reason) {
        console.debug('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        this.getHostApp().getApplicationByRoute(webSocket.route).removeClient(webSocket);
    }
    async onMessage(webSocket, data, flags) {
        console.debug('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }
    getHostApp() {
        return this.options.hostApp;
    }
}
exports.WebSocketServer = WebSocketServer;
