import { ReactComponent } from '../../common/ReactComponent';
import { EditorFrontHostApp } from '../EditorFrontHostApp/EditorFrontHostApp';

export class EdModalController {
    options: any;
    view: ReactComponent;

    constructor(options) {
        this.options = options;
    }

    onClose = async (e) => {
        console.log('ModalController.onClose');
        await this.close();
    };

    onCreate = async (values) => {
        console.log('ModalController.onCreate', values);
        await this.close();
        if (this.options.onCreate) {
            await this.options.onCreate(values);
        }
    };

    async close() {
        await EditorFrontHostApp.editorApp.onModalClose();
    }

    getViewClass() {
        throw new Error('ModalController.getViewClass not implemented');
    }
}
