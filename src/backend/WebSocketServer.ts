import ws from 'ws';
import url from 'url';
import colors from 'colors/safe';
import { BackHostApp } from './BackHostApp';
import { Context } from './Context';
import { debug, log, error } from '../console';
import { getWebsocketUrl } from './websocket-helper';

export class WebSocketServer {
    options: any;
    server: any;

    constructor(options) {
        this.options = options;
        // debug('WebSocketServer.constructor');
        this.server = new ws.Server({
            server: options.httpServer,
            path: '/',
        });
        this.server.on('error', this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }

    async onError(err) {
        error('WebSocketServer.onError', err);
    }

    async onConnection(webSocket: any) {
        debug('WebSocketServer.onConnection', getWebsocketUrl(webSocket));
        log('wss:', colors.bgYellow(colors.black(decodeURIComponent(getWebsocketUrl(webSocket)))));
        const parts = url.parse(getWebsocketUrl(webSocket), true);
        // debug('parts.query:', parts.query);
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

        const [appDirName, appFileName, env, domain] = (parts.query.route as string).split('/');
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
        // debug('this.clients', this.clients);
        context.destroy();
    }

    async onClose(webSocket, code, reason) {
        debug('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        this.getHostApp().getApplicationByRoute(webSocket.route).removeClient(webSocket);
    }

    async onMessage(webSocket, data, flags) {
        debug('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }

    getHostApp(): BackHostApp {
        return this.options.hostApp;
    }
}
