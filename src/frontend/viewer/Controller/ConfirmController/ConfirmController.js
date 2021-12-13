class ConfirmController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.onClose) throw new Error('no onClose');
    }
    getViewClass() {
        return ConfirmView;
    }
    close(result) {
        this.options.onClose(result);
    }
    onYesClick = e => {
        this.close(true);
    }
    onCloseClick = e => {
        this.close(false);
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            this.close(false);
        }
    }
}
