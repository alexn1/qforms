const path = require('path');

import {Application} from '../viewer/Model/Application/Application';
import {Helper} from "../Helper";
import {App} from './App';
import ReactDOMServer from 'react-dom/server';

export class IndexModule {
    hostApp: any;
    css: string[];
    js : string[];
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index'), 'css')).map(path => `/index/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index'), 'js' )).map(path => `/index/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const appInfos = await Application.getAppInfos(this.hostApp.appsDirPath);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv : this.hostApp.getNodeEnv(),
            appInfos: appInfos.map(appInfo => ({
                fullName: appInfo.fullName,
                envs    : appInfo.envs
            }))
        };
    }
    getLinks() {
        return [
            ...(this.hostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            '/lib/react/react.production.min.js',
            '/lib/react/react-dom.production.min.js',
            ...(this.hostApp.commonModule.js),
            ...(this.js)
        ];
    }
    render({version}: any) {
        const app = ReactDOMServer.renderToStaticMarkup(<App/>);

        return (
`<!DOCTYPE html>
<html>
<head>
    <!-- ${version}> -->
    <meta charSet="utf-8">
    <title>QForms v${version}</title>
</head>
<body>
<div id="root"></div>
</body>
</html>`
        );

    }
}
