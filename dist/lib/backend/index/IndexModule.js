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
const Helper_1 = require("../Helper");
const Links_1 = require("./Links");
const Scripts_1 = require("./Scripts");
class IndexModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper_1.Helper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'css')).map((path) => `/index/public/${path}`);
        this.js = (await Helper_1.Helper.getFilePaths(path_1.default.join(this.hostApp.getFrontendDirPath(), 'index/public'), 'js')).map((path) => `/index/public/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const appInfos = await BkApplication_1.BkApplication.getAppInfos(this.hostApp.appsDirPath, this.hostApp);
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
    render({ version, links, scripts, data }) {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links2 = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Links_1.Links, { links: links }));
        const scripts2 = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(Scripts_1.Scripts, { scripts: scripts }));
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
exports.IndexModule = IndexModule;
