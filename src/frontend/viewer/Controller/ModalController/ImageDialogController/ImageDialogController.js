class ImageDialogController extends ModalController {
    constructor(options) {
        // console.log('ImageDialogController.constructor', options);
        super(options);
        if (!options.src) throw new Error('no src');
    }
    getViewClass() {
        console.log('ImageDialogController.getViewClass');
        return ImageDialogView;
    }
    getSrc() {
        return this.options.src;
    }
    onCloseClick = async e => {
        await this.close();
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            await this.close();
        }
    }
}
