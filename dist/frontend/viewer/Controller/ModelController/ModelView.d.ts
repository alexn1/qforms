import { View } from '../View';
import { Model } from '../../Model/Model';
import { ModelController } from './ModelController';
export declare class ModelView<T extends ModelController<Model>> extends View<T> {
    renderActionIcon: any;
    getActionsForDropdownButton(): any;
    getCssBlockName(): string;
    getStyle(row?: any): any;
}
