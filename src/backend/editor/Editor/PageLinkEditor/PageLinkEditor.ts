const Editor = require('../Editor');

class PageLinkEditor extends Editor {
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

export = PageLinkEditor;
