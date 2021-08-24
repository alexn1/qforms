const path = require('path');

import BackHostApp from '../BackHostApp';
import Helper from "../Helper";

class EditorModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'editor'), 'css')).map(path => `/editor/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'editor'), 'js' )).map(path => `/editor/${path}`);
        // console.log('editor.css:', this.css);
        // console.log('editor.js:' , this.js);
    }
    getLinks() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.css',
            '/lib/codemirror-4.8/theme/cobalt.css',
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            '/lib/react/react.development.js',
            '/lib/react/react-dom.development.js',
            '/lib/codemirror-4.8/lib/codemirror.js',
            '/lib/codemirror-4.8/mode/javascript/javascript.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
}
export = EditorModule;
