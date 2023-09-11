import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
import { PageScheme } from '../../../common/Scheme/PageScheme';
import { PageData } from '../../../../common/ModelData/PageData';
import { Optional } from '../../../../types';
export declare class BkPage<TBkApplication extends BkApplication = BkApplication> extends BkModel<PageScheme> {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: BkForm[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: PageData): void;
    fill(context: Context): Promise<PageData>;
    static getNewModeFromContext(context: Context): boolean;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): TBkApplication;
    findForm(name: string): Optional<BkForm>;
    getForm(name: string): BkForm;
    findDataSource(name: string): Optional<BkDataSource>;
    getDataSource(name: string): BkDataSource;
}
