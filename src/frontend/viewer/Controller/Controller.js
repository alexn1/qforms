class Controller extends EventEmitter {
    constructor() {
        super();
        this.view = null;
    }
    onViewCreate = view => {
        // console.log('Controller.onViewCreate', this.model.getFullName());
        this.view = view;
    }
    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`ModelController.rerender no view: ${this.model.getFullName()}`);
    }
    getView() {
        return this.view;
    }
    getViewClass() {
        throw new Error(`${this.constructor.name}.getViewClass not implemented`);
    }
}
