class AlertController extends Controller {
    constructor(title, message, closeCallback) {
        super();
        if (!title) throw new Error('no title');
        if (!message) throw new Error('no message');
        if (!closeCallback) throw new Error('no closeCallback');
        this.title   = title;
        this.message = message;
        this.closeCallback = closeCallback;
    }
    getViewClass() {
        return AlertView;
    }
    close() {
        this.closeCallback();
    }
    onOkButtonClick = async e => {
        this.close();
    }
    onCloseClick = async e => {
        this.close();
    }
}
