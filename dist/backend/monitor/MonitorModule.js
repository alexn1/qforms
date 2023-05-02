"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = __importDefault(require("path"));
const BkHelper_1 = require("../BkHelper");
const server_1 = __importDefault(require("react-dom/server"));
const Links_1 = require("../Links");
const Scripts_1 = require("../Scripts");
const pkg = require('../../../package.json');
class MonitorModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await BkHelper_1.BkHelper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'css')).map((path) => `/monitor/public/${path}`);
        this.js = (await BkHelper_1.BkHelper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'js')).map((path) => `/monitor/public/${path}`);
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
                            ip: BkHelper_1.BkHelper.getWebSocketIP(webSocket),
                            version: webSocket.customFields.version,
                        };
                    }),
                };
            }),
        };
    }
    getLinks() {
        return this.css;
    }
    getScripts() {
        return this.js;
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
    render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Links_1.Links, { links: this.getLinks() }));
        const scripts = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Scripts_1.Scripts, { scripts: this.getScripts() }));
        const data = JSON.stringify(this.fill() /*, null, 4*/);
        return `<!DOCTYPE html>
<html class="monitor" lang="en">
<head>
    <!-- ${pkg.version}> -->
    <meta charSet="utf-8">
    <title>QForms monitor v${pkg.version}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script type="application/json">${data}</script>
</head>
<body class="monitor__body">
    <div class="monitor__root"></div>
</body>
</html>`;
    }
}
exports.MonitorModule = MonitorModule;
