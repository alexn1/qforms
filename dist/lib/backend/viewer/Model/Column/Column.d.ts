import Model from '../Model';
import Application from '../Application/Application';
declare class Column extends Model {
    static create(data: any, parent: any): Promise<Column>;
    fillAttributes(response: any): void;
    isKey(): boolean;
    isAuto(): boolean;
    getApp(): Application;
}
export = Column;
