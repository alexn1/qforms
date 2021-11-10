class AlertDialogController extends DialogController {
    getViewClass() {
        return AlertDialogView;
    }
    onOkButtonClick = async e => {
        this.close();
    }
}
