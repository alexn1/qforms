const Editor = require('../Editor');
const backend = require('../../../../backend');

class ActionEditor extends Editor {

    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'Action',
            '@attributes': {
                name    : params.name,
                caption : params.caption || params.name
            }
        };
    }

    reformat(): Promise<any> {
        const newData = backend[`${this.getClassName()}Editor`].createData(this.attributes());
        this.setData('fields', newData);
        return newData;
    }
}

export = ActionEditor;
