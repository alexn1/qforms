import Model from '../Model';
import DataSource from '../DataSource/DataSource';
import Action from '../Action/Action';
import Application from '../Application/Application';
import Form from '../Form/Form';
import Context from '../../../Context';
declare class Page extends Model {
    dataSources: DataSource[];
    actions: Action[];
    forms: Form[];
    constructor(data: any, parent: any);
    init(context: any): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: any): Promise<any>;
    rpc(name: any, context: any): Promise<any>;
    getApp(): Application;
    getTitle(context: Context, response: any): string;
    getForm(name: any): Form;
    getDataSource(name: any): DataSource;
}
export = Page;
