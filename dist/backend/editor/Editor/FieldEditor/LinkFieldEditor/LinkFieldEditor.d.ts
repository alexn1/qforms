import { FieldEditor } from '../FieldEditor';
import { LinkFieldAttributes, LinkFieldScheme } from '../../../../common/Scheme/FieldScheme/LinkFieldScheme';
export type LinkFieldParams = Partial<LinkFieldAttributes> & {
    name: string;
};
export declare class LinkFieldEditor extends FieldEditor<LinkFieldScheme> {
    static createData(params: LinkFieldParams): LinkFieldScheme;
}
