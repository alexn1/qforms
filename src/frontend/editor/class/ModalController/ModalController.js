class ModalController {
    constructor() {
    }
    onClose = async e => {
        console.log('ModalController.onClose');
        await EditorController.editorController.onModalClose();
    }
}
