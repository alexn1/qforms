import { DataSourceEditor } from '../DataSourceEditor';
import { DataSourceItems, SqlDataSourceAttributes, SqlDataSourceScheme } from '../../../../common/Scheme/DataSourceScheme';
export type SqlDataSourceParams = Partial<SqlDataSourceAttributes> & DataSourceItems & {
    name: string;
};
export declare class SqlDataSourceEditor extends DataSourceEditor<SqlDataSourceScheme> {
    static createData(params: SqlDataSourceParams): SqlDataSourceScheme;
}
