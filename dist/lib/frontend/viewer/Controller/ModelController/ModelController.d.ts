import { Controller } from '../Controller';
import { Model } from '../../Model/Model';
export declare abstract class ModelController<TModel extends Model> extends Controller {
    model: TModel;
    parent: any;
    deinited: boolean;
    constructor(model: TModel, parent: any);
    init(): void;
    deinit(): void;
    getModel(): TModel;
    getParent(): any;
    getTitle(): string;
    getViewClass(): any;
    isActionEnabled(name: any): boolean;
}
