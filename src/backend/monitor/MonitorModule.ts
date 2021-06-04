import BackHostApp from '../BackHostApp';

class MonitorModule {
    backHostApp: BackHostApp;
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    fill() {
        return {
            nodeEnv : this.backHostApp.nodeEnv,
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
            'common/css/common.css',
            'monitor/css/monitor.css'
        ];
    }
    getScripts() {
        return [
            'lib/EventEmitter/EventEmitter.min.js',
            'lib/react/react.development.js',
            'lib/react/react-dom.development.js',
            'common/js/common.js',
            'common/js/common-jsx.js',
            'monitor/js/monitor-jsx.js'
        ];
    }
}
export = MonitorModule;
