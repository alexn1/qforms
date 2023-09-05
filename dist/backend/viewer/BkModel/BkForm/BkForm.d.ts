import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkField } from '../BkField/BkField';
import { BkPage } from '../BkPage/BkPage';
import { BkApplication } from '../BkApplication/BkApplication';
import { Context } from '../../../Context';
import { RawRow } from '../../../../types';
import { FormScheme } from '../../../common/Scheme/FormScheme';
import { FormData } from '../../../../common/ModelData/FormData';
export declare class BkForm<TFormScheme extends FormScheme = FormScheme> extends BkModel<TFormScheme> {
    dataSources: BkDataSource[];
    actions: BkAction[];
    fields: BkField[];
    constructor(data: TFormScheme, parent: BkPage);
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: FormData): void;
    fill(context: Context): Promise<any>;
    _getSurrogateDataSourceResponse(context: Context): {
        class: string;
        name: string;
        keyColumns: string[];
        rows: RawRow[];
    };
    dumpRowToParams(row: RawRow, context: Context): void;
    replaceThis(context: Context, query: string): string;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): BkApplication;
    getPage(): BkPage;
    getFullName(): string;
    isNewMode(context: Context): boolean;
    findField(name: string): BkField | undefined;
    getField(name: string): BkField;
    findDataSource(name: string): BkDataSource | undefined;
    getDataSource(name: string): BkDataSource;
}
