import { Editor } from '../Editor';
import { PageLinkAttributes, PageLinkScheme } from '../../../common/Scheme/PageLinkScheme';
export type PageLinkParams = Partial<PageLinkAttributes> & {
    name: string;
};
export declare class PageLinkEditor extends Editor<PageLinkScheme> {
    static createData(params: PageLinkParams): PageLinkScheme;
    getColName(): string;
}
