import BackHostApp from '../BackHostApp';

class EditorModule {
    backHostApp: BackHostApp;
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    getLinks() {
        return [
            'lib/codemirror-4.8/lib/codemirror.css',
            'lib/codemirror-4.8/theme/cobalt.css',
            'common/css/common.css',
            'css/editor.css'
        ];
    }
    getScripts() {
        return [
            'lib/react/react.development.js',
            'lib/react/react-dom.development.js',
            'lib/codemirror-4.8/lib/codemirror.js',
            'lib/codemirror-4.8/mode/javascript/javascript.js',
            'common/js/common.js',
            'common/js/common-jsx.js',
            'js/editor.js',
            'js/editor-jsx.js'
        ];
    }
}
export = EditorModule;
