import BackHostApp from '../BackHostApp';

class ViewerModule {
    backHostApp: BackHostApp;
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    getLinks() {
        return [
            'css/common.css',
            'viewer/css/viewer.css'
        ];
    }
    getScripts() {
        return [
            'lib/EventEmitter/EventEmitter.min.js',
            'lib/react/react.development.js',
            'lib/react/react-dom.development.js',
            'js/common.js',
            'js/common-jsx.js',
            'viewer/js/viewer.js',
            'viewer/js/viewer-jsx.js'
        ];
    }
}
export = ViewerModule;
