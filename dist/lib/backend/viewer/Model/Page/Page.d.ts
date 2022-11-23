import { Model } from '../Model';
import DataSource = require('../DataSource/DataSource');
import Action = require('../Action/Action');
import { Application } from '../Application/Application';
import Form = require('../Form/Form');
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
    getForm(name: any): Form;
    getDataSource(name: any): DataSource;
}
export = Page;
