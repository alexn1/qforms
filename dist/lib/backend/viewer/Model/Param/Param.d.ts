import Model = require('../Model');
import Application = require('../Application/Application');
declare class Param extends Model {
    getValue(): any;
    getApp(): Application;
}
export = Param;
