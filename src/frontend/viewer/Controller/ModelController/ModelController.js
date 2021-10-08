class ModelController extends Controller {
    constructor(model, parent) {
        super();
        this.model    = model;
        this.parent   = parent;
        this.deinited = false;
    }
    init() {
    }
    deinit() {
        if (this.deinited) throw new Error(`${this.model.getFullName()}: controller already deinited`);
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
        if (!model.isAttr('viewClass')) throw new Error(`${this.constructor.name} not supports view`);
        const viewClassName = model.getAttr('viewClass');
        return viewClassName ? eval(viewClassName) : null;
    }
}

window.QForms.ModelController = ModelController;
