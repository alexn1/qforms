class AlertController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.closeCallback) throw new Error('no closeCallback');
    }
    getViewClass() {
        return AlertView;
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
}
