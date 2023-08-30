import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import { BkHelper } from '../BkHelper';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import { BackHostApp } from '../BackHostApp';

const pkg = require('../../../package.json');

export class IndexModule {
    css: string[];
    js: string[];

    constructor(public hostApp: BackHostApp) {}

    async init() {
        this.css = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'index/public'),
                'css',
            )
        ).map((path) => `/index/public/${path}`);
        this.js = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'index/public'),
                'js',
            )
        ).map((path) => `/index/public/${path}`);
        // debug('app.css:', this.css);
        // debug('app.js:' , this.js);
    }

    async fill() {
        // const distDirPath = this.hostApp.makeDistDirPathForApp(this.hostApp.appsDirPath);
        const appInfos = await BkApplication.getAppInfos(
            this.hostApp.appsDirPath /* , distDirPath */,
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
        const data2 = JSON.stringify(data /*, null, 4*/);
        return `<!DOCTYPE html>
<html>
<head>
    <!-- ${pkg.version}> -->
    <meta charSet="utf-8">
    <title>QForms v${pkg.version}</title>
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
