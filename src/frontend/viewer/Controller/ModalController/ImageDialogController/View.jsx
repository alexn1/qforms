class ImageDialogView extends View {
    render() {
        console.log('ImageDialogView.render');
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <img className={`${this.getCssBlockName()}__image`} src={ctrl.getSrc()}/>
            <button className={`${this.getCssBlockName()}__close`} onClick={ctrl.onCloseClick}>
                <CloseIcon/>
            </button>
        </div>;
    }
}
