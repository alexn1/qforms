import {FieldEditor} from '../FieldEditor';

class LabelFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
            }
        };
    }

}

export = LabelFieldEditor;
