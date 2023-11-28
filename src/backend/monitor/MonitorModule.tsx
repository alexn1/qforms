import { Request, Response, NextFunction } from 'express';
import path from 'path';
import colors from 'colors/safe';
import { BackHostApp } from '../BackHostApp';
import { BkHelper } from '../BkHelper';
import ReactDOMServer from 'react-dom/server';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import { pConsole } from '../../pConsole';
import { getWebSocketIP } from '../websocket-helper';
import { getFilePaths } from '../file-helper';

const pkg = require('../../../package.json');

export class MonitorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];

    constructor(hostApp: BackHostApp) {
        this.hostApp = hostApp;
    }

    async init() {
        this.css = (
            await getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'monitor/public'),
                'css',
            )
        ).map((path: string) => `/monitor/public/${path}`);
        this.js = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'js')
        ).map((path: string) => `/monitor/public/${path}`);
        // debug('monitor.css:', this.css);
        // debug('monitor.js:' , this.js);
    }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('monitorGet') /* , req.headers */);
        try {
            if (!this.hostApp.getParams().monitor) {
                res.end('Please set monitor username/password in app params');
                return;
            }
            if (this.hostApp.monitorModule.authorize(req)) {
                const html = this.hostApp.monitorModule.render();
                res.end(html);
            } else {
                res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"')
                    .status(401)
                    .end('Unauthorized');
            }
        } catch (err) {
            next(err);
        }
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
                            // @ts-ignore
                            uuid: webSocket.uuid,
                            // @ts-ignore
                            userId: webSocket.userId,
                            ip: getWebSocketIP(webSocket),
                            // @ts-ignore
                            version: webSocket.customFields.version,
                        };
                    }),
                };
            }),
        };
    }

    getLinks(): string[] {
        return this.css;
    }

    getScripts(): string[] {
        return this.js;
    }

    checkCredentials(req) {
        const base64string = req.headers.authorization.substr(6);
        const usernamePassword = new Buffer(base64string, 'base64').toString();
        const [username, password] = usernamePassword.split(':');
        return (
            username === this.hostApp.getParams().monitor!.username &&
            password === this.hostApp.getParams().monitor!.password
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

    render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = ReactDOMServer.renderToStaticMarkup(<Links links={this.getLinks()} />);
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={this.getScripts()} />,
        );
        const data = JSON.stringify(this.fill() /* , null, 4 */);
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
