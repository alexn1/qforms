class ModalController {
    constructor(options) {
        this.options = options;
    }
    onClose = async e => {
        console.log('ModalController.onClose');
        await this.close();
    }
    onCreate = async values => {
        console.log('ModalController.onCreate', values);
        await this.close();
        if (this.options.onCreate) {
            await this.options.onCreate(values);
        }
    }
    async close() {
        await EditorApp.editorApp.onModalClose();
    }
    getViewClass() {
        throw new Error('ModalController.getViewClass not implemented');
    }
}
