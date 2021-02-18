class ModalView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <Modal>
            <div>
                <div className={'close'} onClick={ctrl.onClose}>&times;</div>
                <p>abc</p>
            </div>
        </Modal>;
    }
}
