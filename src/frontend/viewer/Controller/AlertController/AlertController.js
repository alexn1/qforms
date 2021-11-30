class AlertController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.onClose) throw new Error('no onClose');
    }
    getViewClass() {
        return AlertView;
    }
    close(result) {
        this.options.onClose(result);
    }
    onOkButtonClick = async e => {
        this.close(true);
    }
    onCloseClick = async e => {
        this.close(false);
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            this.close(false);
        }
    }
}
