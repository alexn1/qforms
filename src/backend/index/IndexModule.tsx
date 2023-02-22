import path from 'path';

import ReactDOMServer from 'react-dom/server';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import { Helper } from '../Helper';
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
            await Helper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'index/public'),
                'css',
            )
        ).map((path) => `/index/public/${path}`);
        this.js = (
            await Helper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'index/public'),
                'js',
            )
        ).map((path) => `/index/public/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }

    async fill() {
        const appInfos = await BkApplication.getAppInfos(this.hostApp.appsDirPath, this.hostApp);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            appInfos: appInfos.map((appInfo) => ({
                fullName: appInfo.fullName,
                envs: appInfo.envs,
            })),
        };
    }

    getLinks() {
        return [...this.css];
    }

    getScripts() {
        return [...this.js];
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
            // console.log('DOMContentLoaded');
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
