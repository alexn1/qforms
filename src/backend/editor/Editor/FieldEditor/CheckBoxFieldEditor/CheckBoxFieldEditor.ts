import {FieldEditor} from '../FieldEditor';

export class CheckBoxFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'CheckBoxField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}
