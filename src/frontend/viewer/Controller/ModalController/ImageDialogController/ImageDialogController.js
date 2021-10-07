class ImageDialogController extends ModalController {
    getViewClass() {
        console.log('ImageDialogController.getViewClass');
        return ImageDialogView;
    }
    onCloseClick = async e => {
        this.close();
    }
}
