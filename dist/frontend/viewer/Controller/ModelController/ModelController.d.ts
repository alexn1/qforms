import { Controller } from '../Controller';
import { Model } from '../../Model/Model';
export declare abstract class ModelController<TModel extends Model = Model> extends Controller {
    private model;
    private parent?;
    deinited: boolean;
    constructor(model: TModel, parent?: ModelController<Model<import("../../../../common").ModelData>> | undefined);
    init(): void;
    deinit(): void;
    getModel(): TModel;
    getParent<TModelController extends ModelController = ModelController>(): TModelController;
    getTitle(): string;
    getViewClass(): any;
    isActionEnabled(name: string): boolean;
}
