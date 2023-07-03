import { ModalController } from '../ModalController';
import { ImageDialogView } from './ImageDialogView';

export class ImageDialogController extends ModalController {
    constructor(options) {
        // console.debug('ImageDialogController.constructor', options);
        super(options);
        if (!options.src) throw new Error('no src');
    }

    getViewClass() {
        console.debug('ImageDialogController.getViewClass');
        return ImageDialogView;
    }

    getSrc() {
        return this.options.src;
    }

    onCloseClick = async (e) => {
        await this.close();
    };

    onKeyDown = async (e) => {
        if (e.key === 'Escape') {
            await this.close();
        }
    };

    onImageClick = async (e) => {
        console.debug('ImageDialogController.onImageClick');
        await this.close();
    };
}
