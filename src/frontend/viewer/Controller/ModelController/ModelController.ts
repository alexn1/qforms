import { Controller } from '../Controller';
import { ModelView } from './ModelView';
import { Model } from '../../Model/Model';
import { Helper } from '../../../common';

export abstract class ModelController<TModel extends Model> extends Controller {
    deinited: boolean = false;

    constructor(public model: TModel, public parent) {
        super();
    }

    init() {}

    deinit() {
        if (this.deinited)
            throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }

    getModel(): TModel {
        return this.model;
    }

    getParent() {
        return this.parent;
    }

    getTitle(): string {
        return this.getModel().getCaption();
    }

    getViewClass(): any {
        // console.log(`${this.constructor.name}.getViewClass`, this.getModel().getAttr('viewClass'));
        const model = this.getModel();
        if (!model.isAttr('viewClass')) {
            throw new Error(`${this.constructor.name} not supports view`);
        }
        const viewClassName = model.getAttr('viewClass');
        if (viewClassName) {
            const viewClass: any = Helper.getGlobalClass(viewClassName);
            if (!viewClass) throw new Error(`no class ${viewClassName}`);
            if (!(viewClass.prototype instanceof ModelView)) {
                throw new Error(`view class ${viewClassName} is not inherited from ModelView`);
            }
            return viewClass;
        }
        return null;
    }

    isActionEnabled(name: string): boolean {
        return false;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.ModelController = ModelController;
}
