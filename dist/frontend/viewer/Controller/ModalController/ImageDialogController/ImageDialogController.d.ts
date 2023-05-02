import { ModalController } from '../ModalController';
import { ImageDialogView } from './ImageDialogView';
export declare class ImageDialogController extends ModalController {
    constructor(options: any);
    getViewClass(): typeof ImageDialogView;
    getSrc(): any;
    onCloseClick: (e: any) => Promise<void>;
    onKeyDown: (e: any) => Promise<void>;
    onImageClick: (e: any) => Promise<void>;
}
