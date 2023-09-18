import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { ViewerModule } from '../ViewerModule';
import { BkDataSource } from '../BkModel/BkDataSource/BkDataSource';
export declare class BkDataSourceController {
    private viewerModule;
    constructor(viewerModule: ViewerModule);
    select(context: Context, application: BkApplication): Promise<void>;
    insert(context: Context, application: BkApplication): Promise<void>;
    update(context: Context, application: BkApplication): Promise<void>;
    _delete(context: Context, application: BkApplication): Promise<void>;
    static getDataSource(context: Context, application: BkApplication, { page, form, ds }: {
        page?: string;
        form?: string;
        ds: string;
    }): Promise<BkDataSource>;
}
