const Editor = require('../Editor');

class PageLinkEditor extends Editor {

    constructor(appEditor, name, data) {
        super(data, appEditor);
        this.appEditor = appEditor;
        this.name      = name;
        // this.colName = 'pageLinks';
    }

    static createData(params) {
        return {
            '@class'     : 'PageLink',
            '@attributes': {
                name    : params.name,
                fileName: 'pages/{name}/{name}.json'.replace(/{name}/g, params.name),
                menu    : params.menu || (params.startup === 'true' ? 'Menu' : ''),
                startup : params.startup || 'false'
            }
        }
    }
}

module.exports = PageLinkEditor;
