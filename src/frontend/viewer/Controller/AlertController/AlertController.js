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
    close() {
        this.options.closeCallback();
    }
    onOkButtonClick = async e => {
        this.close();
    }
    onCloseClick = async e => {
        this.close();
    }
}
