class ModelController extends EventEmitter {
    constructor(model, parent) {
        super();
        this.view     = null;
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
    onViewCreate = view => {
        // console.log('ModelController.onViewCreate', this.model.getFullName());
        this.view = view;
    }
    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`ModelController.rerender no view: ${this.model.getFullName()}`);
    }
    getModel() {
        return this.model;
    }
    getParent() {
        return this.parent;
    }
    getView() {
        return this.view;
    }
    getViewClass() {
        throw new Error(`${this.constructor.name}.getViewClass not implemented`);
    }
    getTitle() {
        return this.getModel().getCaption();
    }
}

window.QForms.ModelController = ModelController;
