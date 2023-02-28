import { ModelView } from '../ModelView';
import { FieldController } from './FieldController';
export declare class FieldView<T extends FieldController> extends ModelView<T> {
    getStyle(row: any): any;
}
