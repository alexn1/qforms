class ModalController {
    constructor() {
    }
    onClose = async e => {
        console.log('ModalController.onClose');
        await this.close();
    }
    onCreate = async e => {
        console.log('ModalController.onCreate');
    }
    async close() {
        await EditorController.editorController.onModalClose();
    }
}
