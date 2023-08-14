import { Editor } from '../Editor';
import { DataSourceAttributes, DataSourceItems, DataSourceScheme } from '../../../common/Scheme/DataSourceScheme';
export type DataSourceParams = Partial<DataSourceAttributes> & Partial<DataSourceItems> & {
    name: string;
};
export declare class DataSourceEditor<T extends DataSourceScheme = DataSourceScheme> extends Editor<T> {
    static createData(params: DataSourceParams): DataSourceScheme;
    static createAttributes(params: DataSourceParams): any;
    getCollectionDirPath(): Promise<string>;
    createModelBackJs(params: any): Promise<any>;
    getColName(): string;
    save(): Promise<void>;
}
