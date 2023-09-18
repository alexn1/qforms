import { Context } from '../../Context';
import { pConsole } from '../../../pConsole';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { ViewerModule } from '../ViewerModule';
import { BkDataSource } from '../BkModel/BkDataSource/BkDataSource';
import { Result } from '../../../Result';
import {
    ReadActionQuery,
    ReadActionResponse,
    CreateActionDto,
    UpdateActionDto,
    DeleteActionDto,
} from '../../../types';

export class BkDataSourceController {
    constructor(private viewerModule: ViewerModule) {}

    // action
    async select(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkDataSourceController.select', context.getBody().page);
        const { page, form, ds } = context.getQuery() as ReadActionQuery;
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
            const response: ReadActionResponse = { rows, count, time };
            context.getRes().json(response);
        });
    }

    // action
    async insert(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkDataSourceController.insert', context.getReq()!.body.page);
        const body = context.getBody() as CreateActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.create(context);
                if (result === undefined) throw new Error('insert action: result is undefined');
                return result;
            });
            context.getRes().status(201).json(result);
            this.viewerModule.getHostApp().broadcastResult(application, context, result);
        });
    }

    // action
    async update(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkDataSourceController.update', context.getReq()!.body.page);
        const body = context.getBody() as UpdateActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.update(context);
                if (result === undefined) throw new Error('action update: result is undefined');
                return result;
            });
            context.getRes().json(result);
            this.viewerModule.getHostApp().broadcastResult(application, context, result);
        });
    }

    // action
    async delete(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkDataSourceController.delete', context.getReq()!.body.page);
        const body = context.getBody() as DeleteActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.delete(context);
                if (result === undefined) throw new Error('delete result is undefined');
                return result;
            });
            context.getRes().json(result);
            this.viewerModule.getHostApp().broadcastResult(application, context, result);
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
