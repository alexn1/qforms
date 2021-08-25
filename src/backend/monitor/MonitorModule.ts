const path = require('path');

import BackHostApp from '../BackHostApp';
import Helper from "../Helper";

class MonitorModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'monitor'), 'css')).map(path => `/monitor/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'monitor'), 'js' )).map(path => `/monitor/${path}`);
        // console.log('monitor.css:', this.css);
        // console.log('monitor.js:' , this.js);
    }
    fill() {
        return {
            nodeEnv : this.backHostApp.getNodeEnv(),
            uptime: Date.now() - this.backHostApp.startTime.getTime(),
            applications: Object.keys(this.backHostApp.applications).map(route => {
                const app = this.backHostApp.applications[route];
                return {
                    route: route,
                    version: app.getVersion(),
                    pages: Object.keys(app.pages).map(name => {
                        return {
                            name: name
                        };
                    })
                };
            })
        };
    }
    getLinks() {
        return [
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            '/lib/EventEmitter/EventEmitter.min.js',
            '/lib/react/react.development.js',
            '/lib/react/react-dom.development.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
}
export = MonitorModule;
