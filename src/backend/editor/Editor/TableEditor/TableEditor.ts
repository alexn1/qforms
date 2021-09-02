const Editor = require('../Editor');

class TableEditor extends Editor {
    static createData(params) {
        // console.log('TableEditor.createData', params);
        return {
            '@class'     : 'Table',
            '@attributes': {
                name : params.name
            },
            columns: [
                ...(params.columns ? params.columns.map(Editor.createItemData) : [])
            ],
        };
    }
    getColName() {
        return 'tables';
    }
}

export = TableEditor;
