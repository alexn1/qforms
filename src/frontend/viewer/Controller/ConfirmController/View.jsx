class ConfirmView extends View {
    render() {
        // console.log('ConfirmView.render', this.getCtrl().options);
        return (
            <div className={this.getCssClassNames()}>
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
                            <Button classList={[`${this.getCssBlockName()}__cancel-button`]}
                                    title={this.getCtrl().options.cancelButton || 'Cancel'}
                                    onClick={this.getCtrl().onCloseClick}
                            />
                            <Button classList={[`${this.getCssBlockName()}__ok-button`]} title={'OK'} onClick={this.getCtrl().onOkButtonClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
