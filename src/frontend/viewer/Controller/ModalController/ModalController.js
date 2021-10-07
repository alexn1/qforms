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
        throw new Error('not implemented');
    }
    getApp() {
        return this.app;
    }
    close() {
        this.getApp().removeModal(this);
        this.getApp().rerender();
    }
    async onDocumentKeyDown(e) {
        console.log('ModalController.onDocumentKeyDown', e);
        if (e.key === 'Escape') {
            this.close();
        }
    }
}
