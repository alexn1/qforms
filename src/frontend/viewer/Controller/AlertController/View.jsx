class AlertView extends View {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    render() {
        return (
            <div className={this.getCssClassNames()}
                 ref={this.el}
                 tabIndex={0}
                 onKeyDown={this.getCtrl().onKeyDown}
            >
                <div className={`${this.getCssBlockName()}__container`}>
                    <div className={`${this.getCssBlockName()}__content flex-column`}>
                        <div className={`${this.getCssBlockName()}__header`}>
                            <div className={`${this.getCssBlockName()}__title`} style={this.getCtrl().options.titleStyle || {color: 'red'}}>
                                {this.getCtrl().options.title || 'Alert'}
                            </div>
                            <div className={`${this.getCssBlockName()}__close`} onClick={this.getCtrl().onCloseClick}>
                                <CloseIcon2/>
                            </div>
                        </div>
                        <div className={`${this.getCssBlockName()}__main flex-max`}>
                            {this.getCtrl().options.message}
                        </div>
                        <div className={`${this.getCssBlockName()}__footer`}>
                            <Button classList={[`${this.getCssBlockName()}__ok-button`]} title={'OK'} onClick={this.getCtrl().onOkButtonClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
