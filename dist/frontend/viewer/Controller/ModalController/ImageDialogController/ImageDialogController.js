"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDialogController = void 0;
const ModalController_1 = require("../ModalController");
const ImageDialogView_1 = require("./ImageDialogView");
class ImageDialogController extends ModalController_1.ModalController {
    constructor(options) {
        // console.debug('ImageDialogController.constructor', options);
        super(options);
        this.onCloseClick = async (e) => {
            await this.close();
        };
        this.onKeyDown = async (e) => {
            if (e.key === 'Escape') {
                await this.close();
            }
        };
        this.onImageClick = async (e) => {
            console.debug('ImageDialogController.onImageClick');
            await this.close();
        };
        if (!options.src)
            throw new Error('no src');
    }
    getViewClass() {
        console.debug('ImageDialogController.getViewClass');
        return ImageDialogView_1.ImageDialogView;
    }
    getSrc() {
        return this.options.src;
    }
}
exports.ImageDialogController = ImageDialogController;
