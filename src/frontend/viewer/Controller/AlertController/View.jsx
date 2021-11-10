class AlertView extends View {
    render() {
        return (
            <div className={this.getCssClassNames()}>
                <div className={`${this.getCssBlockName()}__container`}>
                    <div className={`${this.getCssBlockName()}__content flex-rows`}>
                        <div className={`${this.getCssBlockName()}__header`}>
                            <div className={`${this.getCssBlockName()}__title`}>{this.getCtrl().title}</div>
                            <div className={`${this.getCssBlockName()}__close`} onClick={this.getCtrl().onCloseClick}>
                                <CloseIcon2/>
                            </div>
                        </div>
                        <div className={`${this.getCssBlockName()}__main flex-max`}>{this.getCtrl().message}</div>
                        <div className={`${this.getCssBlockName()}__footer`}>
                            <Button classList={[`${this.getCssBlockName()}__ok-button`]} title={'OK'} onClick={this.getCtrl().onOkButtonClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
