import { Model } from '../Model';
import { DataSource } from '../DataSource/DataSource';
import { Action } from '../Action/Action';
import { Application } from '../Application/Application';
import { Form } from '../Form/Form';
import { Context } from '../../../Context';
export declare class Page extends Model {
    dataSources: DataSource[];
    actions: Action[];
    forms: Form[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): Application;
    getForm(name: string): Form | undefined;
    getDataSource(name: string): DataSource | undefined;
}
