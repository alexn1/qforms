class ModalController extends Controller {
    constructor(options = {}) {
        super();
        if (!options.app) throw new Error('no app');
        if (!options.id) throw new Error('no id');
        this.options = options;
    }
    getId() {
        return this.options.id;
    }
    getApp() {
        return this.options.app;
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
