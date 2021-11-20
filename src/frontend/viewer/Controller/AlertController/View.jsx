class AlertView extends View {
    render() {
        return (
            <div className={this.getCssClassNames()}>
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