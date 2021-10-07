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
}

window.QForms.ModelController = ModelController;
