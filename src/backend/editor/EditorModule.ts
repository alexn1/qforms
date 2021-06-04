import BackHostApp from '../BackHostApp';

class EditorModule {
    backHostApp: BackHostApp;
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    getLinks() {
        return [
        ];
    }
    getScripts() {
        return [

        ];
    }
}
export = EditorModule;
