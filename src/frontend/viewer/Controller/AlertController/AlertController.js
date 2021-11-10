class AlertController extends Controller {
    constructor(title, message, closeCallback) {
        super();
        if (!title) throw new Error('no title');
        if (!message) throw new Error('no message');
        this.title   = title;
        this.message = message;
        this.closeCallback = closeCallback;
    }
    getViewClass() {
        return AlertView;
    }
    close() {
        super.close();
        if (this.closeCallback) {
            this.closeCallback();
        }
    }
    onOkButtonClick = async e => {
        this.close();
    }
    onCloseClick = async e => {
        this.close();
    }
}
