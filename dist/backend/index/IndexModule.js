"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexModule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = __importDefault(require("path"));
const server_1 = __importDefault(require("react-dom/server"));
const BkApplication_1 = require("../viewer/BkModel/BkApplication/BkApplication");
const BkHelper_1 = require("../BkHelper");
const Links_1 = require("../Links");
const Scripts_1 = require("../Scripts");
const pkg = require('../../../package.json');
class IndexModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await BkHelper_1.BkHelper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'css')).map((path) => `/index/public/${path}`);
        this.js = (await BkHelper_1.BkHelper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'js')).map((path) => `/index/public/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const distDirPath = this.hostApp.makeDistDirPathForApp(this.hostApp.appsDirPath);
        const appInfos = await BkApplication_1.BkApplication.getAppInfos(this.hostApp.appsDirPath, distDirPath);
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
        return this.css;
    }
    getScripts() {
        return this.js;
    }
    async render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Links_1.Links, { links: this.getLinks() }));
        const scripts = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Scripts_1.Scripts, { scripts: this.getScripts() }));
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
exports.IndexModule = IndexModule;