class ImageDialogController extends ModalController {
    constructor(app, id, src) {
        // console.log('ImageDialogController.constructor', src);
        super(app, id);
        if (!src) throw new Error('no src');
        this.src = src;
    }
    getViewClass() {
        console.log('ImageDialogController.getViewClass');
        return ImageDialogView;
    }
    onCloseClick = async e => {
        this.close();
    }
    getSrc() {
        return this.src;
    }
}
