import Model from '../Model';
import DataSource from '../DataSource/DataSource';
import Action from '../Action/Action';
import Field from '../Field/Field';
import Page from '../Page/Page';
import Application from '../Application/Application';
declare class Form extends Model {
    dataSources: DataSource[];
    actions: Action[];
    fields: Field[];
    static create(data: any, parent: any): Promise<any>;
    constructor(data: any, parent: any);
    init(context: any): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: any): Promise<any>;
    _getSurrogateDataSourceResponse(context: any): {
        class: string;
        name: string;
        keyColumns: string[];
        rows: {
            id: number;
        }[];
    };
    dumpRowToParams(row: any, params: any): void;
    replaceThis(context: any, query: any): any;
    rpc(name: any, context: any): Promise<any>;
    getApp(): Application;
    getPage(): Page;
    getFullName(): string;
    isNewMode(context: any): boolean;
    getField(name: any): Field;
    getDataSource(name: any): DataSource;
}
export = Form;
