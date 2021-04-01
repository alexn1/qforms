const FieldEditor = require('../FieldEditor');

class ComboBoxFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'ComboBoxField',
            '@attributes': {
                name          : params.name,
                caption       : params.caption        ? params.caption        :    params.name,
                column        : params.column         ? params.column         :    params.name,
                value       : params.value        ? params.value        :             '',
                defaultValue  : params.defaultValue   ? params.defaultValue   :             '',
                param         : params.param          ? params.param          :        'false',
                isVisible     : params.isVisible      ? params.isVisible      :         'true',
                type          : params.type           ? params.type           :             '',
                width           : params.width         ? params.width        :                               '0',

                readOnly      : params.readOnly       ? params.readOnly       :        'false',
                notNull       : params.notNull        ? params.notNull        :        'false',
                dataSourceName: params.dataSourceName ? params.dataSourceName :             '',
                valueColumn   : params.valueColumn    ? params.valueColumn    :             '',
                displayColumn : params.displayColumn  ? params.displayColumn  :             '',
                placeholder   : params.placeholder    ? params.placeholder    :             '',
            }
        };
    }

}

module.exports = ComboBoxFieldEditor;
