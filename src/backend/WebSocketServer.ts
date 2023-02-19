import { BackHostApp } from './BackHostApp';
import { Context } from './Context';

const ws = require('ws');
const url = require('url');

export class WebSocketServer {
    options: any;
    server: any;

    constructor(options) {
        this.options = options;
        // console.log('WebSocketServer.constructor');
        this.server = new ws.Server({
            server: options.httpServer,
            path: '/',
        });
        this.server.on('error', this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }

    async onError(err) {
        console.log('WebSocketServer.onError', err);
    }

    async onConnection(webSocket) {
        console.log('WebSocketServer.onConnection', webSocket.upgradeReq.url);
        const parts = url.parse(webSocket.upgradeReq.url, true);
        // console.log('parts.query:', parts.query);
        if (!parts.query.route) throw new Error('no route');
        if (!parts.query.uuid) throw new Error('no uuid');
        webSocket.route = parts.query.route;
        webSocket.uuid = parts.query.uuid;
        webSocket.userId = parts.query.userId;
        webSocket.customFields = {
            version: parts.query.version,
        };
        webSocket.on('close', this.onClose.bind(this, webSocket));
        webSocket.on('message', this.onMessage.bind(this, webSocket));

        const [appDirName, appFileName, env, domain] = parts.query.route.split('/');
        const context = new Context({
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
        // console.log('this.clients', this.clients);
        context.destroy();
    }

    async onClose(webSocket, code, reason) {
        console.log('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        this.getHostApp().getApplicationByRoute(webSocket.route).removeClient(webSocket);
    }

    async onMessage(webSocket, data, flags) {
        console.log('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }

    getHostApp(): BackHostApp {
        return this.options.hostApp;
    }
}
