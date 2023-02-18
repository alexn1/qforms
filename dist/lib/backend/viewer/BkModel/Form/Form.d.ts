import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../Action/Action';
import { BkField } from '../Field/Field';
import { BkPage } from '../Page/Page';
import { BkApplication } from '../Application/Application';
import { Context } from '../../../Context';
export declare class BkForm extends BkModel {
    dataSources: BkDataSource[];
    actions: BkAction[];
    fields: BkField[];
    constructor(data: any, parent: any);
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    _getSurrogateDataSourceResponse(context: Context): {
        class: string;
        name: string;
        keyColumns: string[];
        rows: {
            id: number;
        }[];
    };
    dumpRowToParams(row: any, params: any): void;
    replaceThis(context: Context, query: any): any;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): BkApplication;
    getPage(): BkPage;
    getFullName(): string;
    isNewMode(context: Context): boolean;
    getField(name: string): BkField | undefined;
    getDataSource(name: string): BkDataSource | undefined;
}
