import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { pConsole } from '../../../pConsole';
import { PageActionQuery, PageActionResponse } from '../../../types';

export class BkPageController {
    async page(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkPageController.page', context.getPage());
        const { page: pageLinkName } = context.getQuery() as PageActionQuery;
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, pageLinkName);
            const pageData = await page.fill(context);
            if (pageData === undefined) throw new Error('page action: pageData is undefined');
            const response: PageActionResponse = { page: pageData };
            context.getRes().json(response);
        } finally {
            await application.release(context);
        }
    }
}
