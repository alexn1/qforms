import { View } from '../View';
import { ModelController } from './ModelController';
export declare class ModelView<T extends ModelController> extends View<T> {
    renderActionIcon: any;
    getActionsForDropdownButton(): any;
    getCssBlockName(): any;
    getStyle(row?: any): any;
}
