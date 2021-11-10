class DialogView extends View {
    render() {
        return (
            <div className={this.getCssClassNames()}>
                <div className={`${this.getCssBlockName()}__container`}>
                    <div className={`${this.getCssBlockName()}__close`} onClick={this.getCtrl().onCloseClick}>
                        <CloseIcon2/>
                    </div>
                </div>
            </div>
        );
    }
}
