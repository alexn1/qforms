class ImageDialogView extends View {
    render() {
        console.log('ImageDialogView.render');
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <button className={`${this.getCssBlockName()}__close`} onClick={ctrl.onCloseClick}>
                    <CloseIcon/>
                </button>
            </div>
        );
    }
}
