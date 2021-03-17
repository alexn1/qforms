const FieldEditor = require('../FieldEditor');

class LinkFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class' : 'LinkField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      : params['name'],
                column      : params['column']       ? params['column']       : params['name'],
                defaultValue: params['defaultValue'] ? params['defaultValue'] :             '',
                isVisible   : params['isVisible']    ? params['isVisible']    :         'true',
                type        : params['type']         ? params['type']         :             '',
                notNull     : params['notNull']      ? params['notNull']      :        'false',
                param       : params.param           ? params.param           :        'false',
            }
        };
    }

}

module.exports = LinkFieldEditor;
