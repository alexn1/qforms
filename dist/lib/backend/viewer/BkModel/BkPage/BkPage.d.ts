import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
export declare class BkPage extends BkModel {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: BkForm[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): BkApplication;
    getForm(name: string): BkForm | undefined;
    getDataSource(name: string): BkDataSource | undefined;
}
