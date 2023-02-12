import { Model } from '../Model';
import { DataSource } from '../DataSource/DataSource';
import { Action } from '../Action/Action';
import { Application } from '../Application/Application';
import { Form } from '../Form/Form';
export declare class Page extends Model {
    dataSources: DataSource[];
    actions: Action[];
    forms: Form[];
    init(context: any): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: any): Promise<any>;
    rpc(name: any, context: any): Promise<any>;
    getApp(): Application;
    getForm(name: any): Form;
    getDataSource(name: any): DataSource;
}
