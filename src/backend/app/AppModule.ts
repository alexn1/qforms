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
}
export = AppModule;
