import { Model } from '../Model';
import { ColumnData } from '../../../../common/ModelData/ColumnData';
export declare class Column extends Model<ColumnData> {
    constructor(data: any, parent: any);
    init(): void;
    getType(): string;
}
