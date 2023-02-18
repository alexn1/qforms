import { BkModel } from '../Model';
import { BkDataSource } from '../DataSource/BkDataSource';
import { BkAction } from '../Action/Action';
import { BkApplication } from '../Application/Application';
import { BkForm } from '../Form/Form';
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
