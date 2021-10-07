class ModalController extends Controller {
    constructor(app, id) {
        super();
        if (!app) throw new Error('no app');
        if (!id) throw new Error('no id');
        this.app = app;
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getViewClass() {
        return Modal;
    }
    getApp() {
        return this.app;
    }
    async onDocumentKeyDown(e) {
        console.log('ModalController.onDocumentKeyDown', e);
        if (e.key === 'Escape') {
            this.getApp().removeModal(this);
            this.getApp().rerender();
        }
    }
}
