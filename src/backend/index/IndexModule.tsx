const path = require('path');

import ReactDOMServer from 'react-dom/server';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import { Helper } from '../Helper';
import { App } from './App';
import { Links } from './Links';
import { Scripts } from './Scripts';

export class IndexModule {
    hostApp: any;
    css: string[];
    js: string[];
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
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
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            // '/lib/react/react.production.min.js',
            // '/lib/react/react-dom.production.min.js',
            ...this.js,
        ];
    }
    render({ version, links, scripts, data }: any) {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links2 = ReactDOMServer.renderToStaticMarkup(<Links links={links} />);
        const scripts2 = ReactDOMServer.renderToStaticMarkup(<Scripts scripts={scripts} />);
        const data2 = JSON.stringify(data /*, null, 4*/);
        return `<!DOCTYPE html>
<html>
<head>
    <!-- ${version}> -->
    <meta charSet="utf-8">
    <title>QForms v${version}</title>
    <!-- links -->
    ${links2}
    <!-- scripts -->
    ${scripts2}
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
