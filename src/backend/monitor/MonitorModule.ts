const path = require('path');

import BackHostApp from '../BackHostApp';
import Helper from "../Helper";

class MonitorModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'monitor'), 'css')).map(path => `/monitor/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'monitor'), 'js' )).map(path => `/monitor/${path}`);
        // console.log('monitor.css:', this.css);
        // console.log('monitor.js:' , this.js);
    }
    fill() {
        return {
            nodeEnv : this.backHostApp.getNodeEnv(),
            uptime: Date.now() - this.backHostApp.startTime.getTime(),
            applications: Object.keys(this.backHostApp.applications).map(route => {
                const app = this.backHostApp.applications[route];
                return {
                    route: route,
                    version: app.getVersion(),
                    pages: Object.keys(app.pages).map(name => {
                        return {
                            name: name
                        };
                    }),
                    clients: app.clients.map(webSocket => {
                        return {
                            uuid  : webSocket.uuid,
                            userId: webSocket.userId
                        };
                    })
                };
            })
        };
    }
    getLinks() {
        return [
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            '/lib/react/react.development.js',
            '/lib/react/react-dom.development.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
    checkCredentials(req) {
        const base64string = req.headers.authorization.substr(6);
        const usernamePassword = new Buffer(base64string, 'base64').toString();
        const [username, password] = usernamePassword.split(':');
        return username === this.backHostApp.params.monitor.username &&
               password === this.backHostApp.params.monitor.password;
    }
    authorize(req): boolean {
        if (this.backHostApp.isDevelopment()) {
            return true;
        }
        if (!this.backHostApp.params.monitor) {
            throw new Error('no monitor params');
        }
        return req.headers.authorization &&
            req.headers.authorization.substr(0, 5) === 'Basic' &&
            this.checkCredentials(req);
    }
}
export = MonitorModule;
