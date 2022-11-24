import {Helper} from "../Helper";

const path = require('path');
import {BackHostApp} from '../BackHostApp';

export class CommonModule {
    hostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(hostApp: BackHostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'common'), 'css')).map(path => `/common/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'common'), 'js' )).map(path => `/common/${path}`);
        // console.log('common.css:', this.css);
        // console.log('common.js:' , this.js);
    }
}
