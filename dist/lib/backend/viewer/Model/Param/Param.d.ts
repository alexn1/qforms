import Model from '../Model';
import Application from '../Application/Application';
declare class Param extends Model {
    getValue(): any;
    getApp(): Application;
}
export = Param;
