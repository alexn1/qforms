import { Controller } from '../Controller';
export declare class ModelController extends Controller {
    model: any;
    parent: any;
    deinited: boolean;
    constructor(model: any, parent: any);
    init(): void;
    deinit(): void;
    getModel(): any;
    getParent(): any;
    getTitle(): any;
    getViewClass(): any;
}
