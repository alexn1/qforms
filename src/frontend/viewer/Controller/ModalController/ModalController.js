class ModalController extends Controller {
    constructor(id) {
        super();
        if (!id) throw new Error('no id');
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getViewClass() {
        return Modal;
    }
}
