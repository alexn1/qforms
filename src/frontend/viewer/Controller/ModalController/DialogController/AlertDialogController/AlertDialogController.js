class AlertDialogController extends DialogController {
    constructor(app, id, title, message) {
        super(app, id);
        if (!title) throw new Error('no title');
        if (!message) throw new Error('no message');
        this.title   = title;
        this.message = message;
    }
    getViewClass() {
        return AlertDialogView;
    }
    onOkButtonClick = async e => {
        this.close();
    }
}
