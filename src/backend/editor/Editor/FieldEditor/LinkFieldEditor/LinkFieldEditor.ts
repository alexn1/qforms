import { FieldEditor } from '../FieldEditor';

export class LinkFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'LinkField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                notNull: params.notNull ? params.notNull : 'false',
                page: params.page ? params.page : '',
            },
        };
    }
}
