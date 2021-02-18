class ModalController {
    onClose = async e => {
        console.log('ModalController.onClose');
        await this.close();
    }
    onCreate = async values => {
        console.log('ModalController.onCreate', values);
        await this.close();
    }
    async close() {
        await EditorController.editorController.onModalClose();
    }
    getViewClass() {
        throw new Error('ModalController.getViewClass not implemented');
    }
}
