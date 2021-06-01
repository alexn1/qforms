import Model from '../Model';

declare class DataSource extends Model {
    getValue(row: any, column: string): any;
}
export = DataSource;
