class ConfirmController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.closeCallback) throw new Error('no closeCallback');
    }
    getViewClass() {
        return ConfirmView;
    }
    close(result) {
        this.options.closeCallback(result);
    }
    onOkButtonClick = async e => {
        this.close(true);
    }
    onCloseClick = async e => {
        this.close(false);
    }
    async onDocumentKeyDown(e) {
        if (e.key === 'Escape') {
            this.close(false);
        }
    }
}
