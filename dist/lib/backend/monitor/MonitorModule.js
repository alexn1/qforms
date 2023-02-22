"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModule = void 0;
const path = require('path');
const Helper_1 = require("../Helper");
const pkg = require('../../../package.json');
class MonitorModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'css')).map((path) => `/monitor/public/${path}`);
        this.js = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'js')).map((path) => `/monitor/public/${path}`);
        // console.log('monitor.css:', this.css);
        // console.log('monitor.js:' , this.js);
    }
    fill() {
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            uptime: Date.now() - this.hostApp.startTime.getTime(),
            applications: Object.keys(this.hostApp.applications).map((route) => {
                const app = this.hostApp.applications[route];
                return {
                    route: route,
                    version: app.getVersion(),
                    pages: Object.keys(app.pages).map((name) => {
                        return {
                            name: name,
                        };
                    }),
                    clients: app.clients.map((webSocket) => {
                        return {
                            uuid: webSocket.uuid,
                            userId: webSocket.userId,
                            ip: Helper_1.Helper.getWebSocketIP(webSocket),
                            version: webSocket.customFields.version,
                        };
                    }),
                };
            }),
        };
    }
    getLinks() {
        return [...this.css];
    }
    getScripts() {
        return [...this.js];
    }
    checkCredentials(req) {
        const base64string = req.headers.authorization.substr(6);
        const usernamePassword = new Buffer(base64string, 'base64').toString();
        const [username, password] = usernamePassword.split(':');
        return (username === this.hostApp.getParams().monitor.username &&
            password === this.hostApp.getParams().monitor.password);
    }
    authorize(req) {
        if (this.hostApp.isDevelopment()) {
            return true;
        }
        if (!this.hostApp.getParams().monitor) {
            throw new Error('no monitor params');
        }
        return (req.headers.authorization &&
            req.headers.authorization.substr(0, 5) === 'Basic' &&
            this.checkCredentials(req));
    }
    render(res, response) {
        console.log('MonitorModule.render');
        res.render('monitor/index', {
            version: pkg.version,
            response: response,
            links: this.getLinks(),
            scripts: this.getScripts(),
        });
    }
}
exports.MonitorModule = MonitorModule;
