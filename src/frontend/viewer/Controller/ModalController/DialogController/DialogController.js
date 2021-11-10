class DialogController extends ModalController {
    getViewClass() {
        return DialogView;
    }
    onCloseClick = async e => {
        this.close();
    }
    onOkButtonClick = async e => {
        this.close();
    }
}
