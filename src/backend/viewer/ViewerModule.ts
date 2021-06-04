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
    getScripts() {
        return [
            'lib/EventEmitter/EventEmitter.min.js',
            'lib/react/react.development.js',
            'lib/react/react-dom.development.js',
            'js/common.js',
            'js/common-jsx.js',
            'js/viewer.js',
            'js/viewer-jsx.js'
        ];
    }
}
export = ViewerModule;
