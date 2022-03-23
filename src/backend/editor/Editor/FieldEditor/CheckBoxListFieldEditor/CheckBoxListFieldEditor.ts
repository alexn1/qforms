const FieldEditor = require('../FieldEditor');

class CheckBoxListFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'CheckBoxListField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly      : params.readOnly       ? params.readOnly       :        'false',
                notNull       : params.notNull        ? params.notNull        :        'false',
                placeholder   : params.placeholder    ? params.placeholder    :             '',
                dataSourceName: params.dataSourceName ? params.dataSourceName :             '',
                valueColumn   : params.valueColumn    ? params.valueColumn    :             '',
                displayColumn : params.displayColumn  ? params.displayColumn  :             '',
            }
        };
    }

}

export = CheckBoxListFieldEditor;
