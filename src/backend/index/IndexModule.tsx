import path from 'path';
import ReactDOMServer from 'react-dom/server';
import colors from 'colors/safe';
import { Request, Response, NextFunction } from 'express';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import { BackHostApp } from '../BackHostApp';
import { pConsole } from '../../pConsole';
import { getFilePaths } from '../file-helper';

export class IndexModule {
    css: string[];
    js: string[];

    constructor(public hostApp: BackHostApp) {}

    async init() {
        this.css = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'css')
        ).map((path) => `/index/public/${path}`);
        this.js = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'js')
        ).map((path) => `/index/public/${path}`);
        // debug('app.css:', this.css);
        // debug('app.js:' , this.js);
    }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('indexGet'));
        try {
            const html = await this.hostApp.indexModule.render();
            res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
        } catch (err) {
            next(err);
        }
    }

    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.hostApp.createAppInfos(req);
            res.json({
                appInfos: appInfos.map((appInfo) => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs,
                })),
            });
        } catch (err) {
            next(err);
        }
    }

    async fill() {
        // const distDirPath = this.hostApp.makeDistDirPathForApp(this.hostApp.getSrcDirPath());
        const appInfos = await BkApplication.getAppInfos(
            this.hostApp.getSrcDirPath() /* , distDirPath */,
        );
        // debug('appInfos:', appInfos);
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            appInfos: appInfos.map((appInfo) => ({
                fullName: appInfo.fullName,
                envs: appInfo.envs,
            })),
        };
    }

    getLinks(): string[] {
        return this.css;
    }

    getScripts(): string[] {
        return this.js;
    }

    async render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = ReactDOMServer.renderToStaticMarkup(<Links links={this.getLinks()} />);
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={this.getScripts()} />,
        );
        const data = await this.fill();
        const data2 = JSON.stringify(data /* , null, 4 */);
        return `<!DOCTYPE html>
<html>
<head>
    <!-- ${this.hostApp.getPlatformVersion()}> -->
    <meta charSet="utf-8">
    <title>QForms v${this.hostApp.getPlatformVersion()}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script type="application/json">${data2}</script>
    <!--<script>
        document.addEventListener('DOMContentLoaded', () => {
            // console.debug('DOMContentLoaded');
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            new IndexFrontHostApp(data).init();
        });
    </script>-->
</head>
<body>
<div id="root"></div>
</body>
</html>`;
    }
}
