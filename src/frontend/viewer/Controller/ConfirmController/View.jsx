class ConfirmView extends View {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    render() {
        // console.log('ConfirmView.render', this.getCtrl().options);
        if (!this.getCtrl().options.yesButton) throw new Error('no yesButton option');
        if (!this.getCtrl().options.noButton) throw new Error('no noButton option');
        return (
            <div className={this.getCssClassNames()}
                 ref={this.el}
                 tabIndex={0}
                 onKeyDown={this.getCtrl().onKeyDown}
            >
                <div className={`${this.getCssBlockName()}__container`}>
                    <div className={`${this.getCssBlockName()}__content flex-column`}>
                        <div className={`${this.getCssBlockName()}__header`}>
                            <div className={`${this.getCssBlockName()}__title`} style={this.getCtrl().options.titleStyle}>
                                {this.getCtrl().options.title || 'Confirm'}
                            </div>
                            <div className={`${this.getCssBlockName()}__close`} onClick={this.getCtrl().onCloseClick}>
                                <CloseIcon2/>
                            </div>
                        </div>
                        <div className={`${this.getCssBlockName()}__main flex-max`}>
                            {this.getCtrl().options.message}
                        </div>
                        <div className={`${this.getCssBlockName()}__footer`}>
                            <Button classList={[`${this.getCssBlockName()}__no-button`]}
                                    title={this.getCtrl().options.noButton}
                                    onClick={this.getCtrl().onCloseClick}
                            />
                            <Button classList={[`${this.getCssBlockName()}__yes-button`]}
                                    title={this.getCtrl().options.yesButton}
                                    onClick={this.getCtrl().onYesClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getElement().focus();
    }
}
