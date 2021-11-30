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
    getSrc() {
        return this.src;
    }
    onCloseClick = async e => {
        this.close();
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            this.close();
        }
    }
}
