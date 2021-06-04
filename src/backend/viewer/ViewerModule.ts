import BackHostApp from '../BackHostApp';

class ViewerModule {
    backHostApp: BackHostApp;
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    getLinks() {
        return [
            'css/common.css',
            'css/viewer.css'
        ];
    }
}
export = ViewerModule;
