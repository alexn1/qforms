import Application from '../viewer/Model/Application/Application';

class AppModule {
    hostApp: any;
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async fill() {
        const appInfos = await Application.getAppInfos(this.hostApp.appsDirPath);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv : this.hostApp.nodeEnv,
            appInfos: appInfos.map(appInfo => ({
                fullName: appInfo.fullName,
                envs    : appInfo.envs
            }))
        };
    }
    getLinks() {
        return [
            'common/css/common.css',
            'app/css/app.css'
        ];
    }
    getScripts() {
        return [
            'lib/EventEmitter/EventEmitter.min.js',
            'lib/react/react.development.js',
            'lib/react/react-dom.development.js',
            'common/js/common.js',
            'common/js/common-jsx.js',
            'app/js/app.js',
            'app/js/app-jsx.js'
        ];
    }
}
export = AppModule;
