import { FieldEditor } from '../FieldEditor';

export class LabelFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'LabelField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
            },
        };
    }
}
