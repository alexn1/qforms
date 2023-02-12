import { Model } from '../Model';
import { BkDataSource } from '../DataSource/DataSource';
import { BkAction } from '../Action/Action';
import { BkApplication } from '../Application/Application';
import { BkForm } from '../Form/Form';
import { Context } from '../../../Context';
export declare class BkPage extends Model {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: BkForm[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): BkApplication;
    getForm(name: string): BkForm;
    getDataSource(name: string): BkDataSource;
}
