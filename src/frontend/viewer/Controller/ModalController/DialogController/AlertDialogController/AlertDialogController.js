class AlertDialogController extends DialogController {
    constructor(app, id, title, message, closeCallback) {
        super(app, id);
        if (!title) throw new Error('no title');
        if (!message) throw new Error('no message');
        this.title   = title;
        this.message = message;
        this.closeCallback = closeCallback;
    }
    getViewClass() {
        return AlertDialogView;
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
}
