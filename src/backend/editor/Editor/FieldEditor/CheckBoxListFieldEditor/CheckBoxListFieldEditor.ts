import {FieldEditor} from '../FieldEditor';

export class CheckBoxListFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'CheckBoxListField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly      : params.readOnly       ? params.readOnly       :        'false',
                notNull       : params.notNull        ? params.notNull        :        'false',
                dataSourceName: params.dataSourceName ? params.dataSourceName :             '',
                valueColumn   : params.valueColumn    ? params.valueColumn    :             '',
                displayColumn : params.displayColumn  ? params.displayColumn  :             '',
            }
        };
    }

}
