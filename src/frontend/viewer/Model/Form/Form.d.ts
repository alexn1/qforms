import Model from '../Model';
import DataSource from '../DataSource/DataSource';

declare class Form extends Model {
    getDataSource(name: string): DataSource;
}
export = Form;
