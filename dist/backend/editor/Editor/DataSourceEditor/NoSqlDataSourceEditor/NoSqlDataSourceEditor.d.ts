import { DataSourceEditor } from '../DataSourceEditor';
import { DataSourceItems, NoSqlDataSourceAttributes, NoSqlDataSourceScheme } from '../../../../common/Scheme/DataSourceScheme';
export type NoSqlDataSourceParams = Partial<NoSqlDataSourceAttributes> & Partial<DataSourceItems> & {
    name: string;
};
export declare class NoSqlDataSourceEditor extends DataSourceEditor<NoSqlDataSourceScheme> {
    static createData(params: NoSqlDataSourceParams): NoSqlDataSourceScheme;
}
