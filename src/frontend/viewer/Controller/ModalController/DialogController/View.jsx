class DialogView extends View {
    render() {
        return (
            <div className={this.getCssClassNames()}>
                <div className={`${this.getCssBlockName()}__container`}>
                    <div className={`${this.getCssBlockName()}__content flex-rows`}>
                        <div className={`${this.getCssBlockName()}__header`}>
                            <div className={`${this.getCssBlockName()}__title`}>title</div>
                            <div className={`${this.getCssBlockName()}__close`} onClick={this.getCtrl().onCloseClick}>
                                <CloseIcon2/>
                            </div>
                        </div>
                        <div className={`${this.getCssBlockName()}__main flex-max`}>main</div>
                        <div className={`${this.getCssBlockName()}__footer`}>
                            <Button title={'OK'}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
