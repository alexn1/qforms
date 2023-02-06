import { Controller } from '../Controller';
import { ModelView } from './ModelView';

export abstract class ModelController extends Controller {
    deinited: boolean = false;

    constructor(public model, public parent) {
        super();
    }

    init() {}

    deinit() {
        if (this.deinited)
            throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }

    getModel() {
        return this.model;
    }

    getParent() {
        return this.parent;
    }

    getTitle() {
        return this.getModel().getCaption();
    }

    getViewClass(): any {
        // console.log(`${this.constructor.name}.getViewClass`, this.getModel().getAttr('viewClass'));
        const model = this.getModel();
        if (!model.isAttr('viewClass')) {
            throw new Error(`${this.constructor.name} not supports view`);
        }
        const viewClassName = model.getAttr('viewClass');

        const viewClass: any = window[viewClassName];
        if (viewClass && !(viewClass.prototype instanceof ModelView)) {
            throw new Error(`view class ${viewClassName} is not inherited from ModelView`);
        }
        return viewClass;
    }

    isActionEnabled(name): boolean {
        return false;
    }
}

// @ts-ignore
window.ModelController = ModelController;
