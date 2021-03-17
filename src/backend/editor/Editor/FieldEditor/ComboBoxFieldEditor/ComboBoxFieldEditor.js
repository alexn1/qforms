const FieldEditor = require('../FieldEditor');

class ComboBoxFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'ComboBoxField',
            '@attributes': {
                name          : params.name,
                caption       : params.caption        ? params.caption        :    params.name,
                column        : params.column         ? params.column         :    params.name,
                defaultValue  : params.defaultValue   ? params.defaultValue   :             '',
                isVisible     : params.isVisible      ? params.isVisible      :         'true',
                type          : params.type           ? params.type           :             '',
                readOnly      : params.readOnly       ? params.readOnly       :        'false',
                notNull       : params.notNull        ? params.notNull        :        'false',
                dataSourceName: params.dataSourceName ? params.dataSourceName :             '',
                valueColumn   : params.valueColumn    ? params.valueColumn    :             '',
                displayColumn : params.displayColumn  ? params.displayColumn  :             '',
                param         : params.param          ? params.param          :        'false',
                placeholder   : params.placeholder    ? params.placeholder    :             '',
            }
        };
    }

}

module.exports = ComboBoxFieldEditor;
