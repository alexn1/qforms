import { FieldEditor } from '../FieldEditor';

import {
    LinkFieldAttributes,
    LinkFieldScheme,
} from '../../../../common/Scheme/FieldScheme/LinkFieldScheme';

export type LinkFieldParams = Partial<LinkFieldAttributes> & { name: string };

export class LinkFieldEditor extends FieldEditor<LinkFieldScheme> {
    static createData(params: LinkFieldParams): LinkFieldScheme {
        return {
            '@class': 'LinkField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                notNull: params.notNull ? params.notNull : 'false',
                page: params.page ? params.page : '',
                displayColumn: params.displayColumn ? params.displayColumn : '',
            },
        };
    }
}
