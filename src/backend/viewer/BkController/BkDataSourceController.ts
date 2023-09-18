import { Context } from '../../Context';
import { pConsole } from '../../../pConsole';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { SelectActionQuery, SelectActionResponse } from '../../../types';
import { ViewerModule } from '../ViewerModule';
import { BkDataSource } from '../BkModel/BkDataSource/BkDataSource';

export class BkDataSourceController {
    constructor(private viewerModule: ViewerModule) {}

    // action
    async select(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkDataSourceController.select', context.getBody().page);
        const { page, form, ds } = context.getQuery() as SelectActionQuery;
        const start = Date.now();
        const dataSource = await BkDataSourceController.getDataSource(context, application, {
            page,
            form,
            ds,
        });
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const [rows, count] = await dataSource.read(context);
            const time = Date.now() - start;
            pConsole.debug('select time:', time);
            const response: SelectActionResponse = { rows, count, time };
            context.getRes().json(response);
        });
    }

    static async getDataSource(
        context: Context,
        application: BkApplication,
        { page, form, ds }: { page?: string; form?: string; ds: string },
    ): Promise<BkDataSource> {
        if (page) {
            const bkPage = await application.getPage(context, page);
            if (form) {
                return bkPage.getForm(form).getDataSource(ds);
            }
            return bkPage.getDataSource(ds);
        }
        return application.getDataSource(ds);
    }
}
