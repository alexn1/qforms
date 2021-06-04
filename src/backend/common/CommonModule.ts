import Helper from "../Helper";

const path = require('path');
import BackHostApp from '../BackHostApp';

class CommonModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getPublicDirPath(), 'common'), 'css')).map(path => `common/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getPublicDirPath(), 'common'), 'js' )).map(path => `common/${path}`);
        console.log('common.css:', this.css);
        console.log('common.js:' , this.js);
    }
}
export = CommonModule;
