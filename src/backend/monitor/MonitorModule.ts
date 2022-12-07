const path = require('path');

import { BackHostApp } from '../BackHostApp';
import { Helper } from '../Helper';

export class MonitorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (
            await Helper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'monitor'),
                'css',
            )
        ).map(path => `/monitor/${path}`);
        this.js = (
            await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'monitor'), 'js')
        ).map(path => `/monitor/${path}`);
        // console.log('monitor.css:', this.css);
        // console.log('monitor.js:' , this.js);
    }
    fill() {
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            uptime: Date.now() - this.hostApp.startTime.getTime(),
            applications: Object.keys(this.hostApp.applications).map(route => {
                const app = this.hostApp.applications[route];
                return {
                    route: route,
                    version: app.getVersion(),
                    pages: Object.keys(app.pages).map(name => {
                        return {
                            name: name,
                        };
                    }),
                    clients: app.clients.map(webSocket => {
                        return {
                            uuid: webSocket.uuid,
                            userId: webSocket.userId,
                            ip: Helper.getWebSocketIP(webSocket),
                            version: webSocket.customFields.version,
                        };
                    }),
                };
            }),
        };
    }
    getLinks() {
        return [...this.hostApp.commonModule.css, ...this.css];
    }
    getScripts() {
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            // '/lib/react/react.production.min.js',
            // '/lib/react/react-dom.production.min.js',
            // ...(this.hostApp.commonModule.js),
            ...this.js,
        ];
    }
    checkCredentials(req) {
        const base64string = req.headers.authorization.substr(6);
        const usernamePassword = new Buffer(base64string, 'base64').toString();
        const [username, password] = usernamePassword.split(':');
        return (
            username === this.hostApp.getParams().monitor.username &&
            password === this.hostApp.getParams().monitor.password
        );
    }
    authorize(req): boolean {
        if (this.hostApp.isDevelopment()) {
            return true;
        }
        if (!this.hostApp.getParams().monitor) {
            throw new Error('no monitor params');
        }
        return (
            req.headers.authorization &&
            req.headers.authorization.substr(0, 5) === 'Basic' &&
            this.checkCredentials(req)
        );
    }
}
