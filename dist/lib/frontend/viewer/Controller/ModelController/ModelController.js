"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const Controller_1 = require("../Controller");
const ModelView_1 = require("./ModelView");
class ModelController extends Controller_1.Controller {
    constructor(model, parent) {
        super();
        this.model = model;
        this.parent = parent;
        this.deinited = false;
    }
    init() { }
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
    getViewClass() {
        // console.log(`${this.constructor.name}.getViewClass`, this.getModel().getAttr('viewClass'));
        const model = this.getModel();
        if (!model.isAttr('viewClass')) {
            throw new Error(`${this.constructor.name} not supports view`);
        }
        const viewClassName = model.getAttr('viewClass');
        const viewClass = window[viewClassName];
        if (viewClass && !(viewClass.prototype instanceof ModelView_1.ModelView)) {
            throw new Error(`view class ${viewClassName} is not inherited from ModelView`);
        }
        return viewClass;
    }
    isActionEnabled(name) {
        return false;
    }
}
exports.ModelController = ModelController;
// @ts-ignore
window.ModelController = ModelController;
