const Editor = require('../Editor');
const backend = require('../../../../backend');

class KeyColumnEditor extends Editor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': params.name
            }
        };
    }
    reformat(): Promise<any> {
        const newData = backend[`${this.getClassName()}Editor`].createData(this.attributes());
        this.setData('keyColumns', newData);
        return newData;
    }
}

export = KeyColumnEditor;
