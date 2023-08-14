import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
import { PageScheme } from '../../../common/Scheme/PageScheme';
export declare class BkPage<TBkApplication extends BkApplication = BkApplication> extends BkModel<PageScheme> {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: BkForm[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): TBkApplication;
    findForm(name: string): BkForm | undefined;
    getForm(name: string): BkForm;
    findDataSource(name: string): BkDataSource | undefined;
    getDataSource(name: string): BkDataSource;
}
