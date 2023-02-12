import { Model } from '../Model';
import { BkDataSource } from '../DataSource/DataSource';
import { BkAction } from '../Action/Action';
import { Field } from '../Field/Field';
import { BkPage } from '../Page/Page';
import { BkApplication } from '../Application/Application';
export declare class BkForm extends Model {
    dataSources: BkDataSource[];
    actions: BkAction[];
    fields: Field[];
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
    getApp(): BkApplication;
    getPage(): BkPage;
    getFullName(): string;
    isNewMode(context: any): boolean;
    getField(name: any): Field | undefined;
    getDataSource(name: string): BkDataSource;
}
