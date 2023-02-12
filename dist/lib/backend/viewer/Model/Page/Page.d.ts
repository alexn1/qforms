import { Model } from '../Model';
import { BkDataSource } from '../DataSource/DataSource';
import { BkAction } from '../Action/Action';
import { BkApplication } from '../Application/Application';
import { Form } from '../Form/Form';
import { Context } from '../../../Context';
export declare class BkPage extends Model {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: Form[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): BkApplication;
    getForm(name: string): Form;
    getDataSource(name: string): BkDataSource;
}
