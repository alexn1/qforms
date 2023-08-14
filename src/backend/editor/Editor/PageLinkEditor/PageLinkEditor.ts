import { Editor } from '../Editor';

import { PageLinkAttributes, PageLinkScheme } from '../../../common/Scheme/PageLinkScheme';

export type PageLinkParams = Partial<PageLinkAttributes> & {
    name: string;
};

export class PageLinkEditor extends Editor<PageLinkScheme> {
    static createData(params: PageLinkParams): PageLinkScheme {
        return {
            '@class': 'PageLink',
            '@attributes': {
                name: params.name,
                fileName: params.fileName || `pages/${params.name}/${params.name}.json`,
                menu: params.menu || (params.startup === 'true' ? 'Menu' : ''),
                startup: params.startup || 'false',
            },
        };
    }

    getColName() {
        return 'pageLinks';
    }
}
