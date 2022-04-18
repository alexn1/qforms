class RowFormPhoneFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.state = {
            classList: []
        };
    }
    onCloseClick = async e => {
        const ctrl = this.getCtrl();
        this.getWidget().state.value = '';
        this.getWidget().setState({value: ''});
        ctrl.onChange('');
        this.getWidget().getElement().focus();
    }
    isCloseVisible() {
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable()) return false;
        return ctrl.getValueForWidget() !== '';
        /*if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', this.getWidget().state.value);
        return this.getWidget().state.value !== '';*/
    }
    onFocus = async e => {
        this.addCssClass('focus');
        await this.rerender();
    }
    onBlur = async e => {
        this.removeCssClass('focus');
        await this.rerender();
    }
    renderPhoneBox() {
        const ctrl = this.getCtrl();
        return <PhoneBox classList={[`${this.getCssBlockName()}__input`]}
                         value={ctrl.getValueForWidget()}
                         readOnly={!ctrl.isEditable()}
                         disabled={!ctrl.isEditable()}
                         autoFocus={ctrl.isAutoFocus()}
                         placeholder={ctrl.getPlaceholder() || null}
                         autocomplete={ctrl.getAutocomplete()}
                         onCreate={this.onWidgetCreate}
                         onChange={ctrl.onChange}
                         onFocus={this.onFocus}
                         onBlur={this.onBlur}
        />;
    }
    renderCloseButton() {
        return <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
            <CloseIcon/>
        </div>;
    }
    renderPhoneIcon() {
        return <div className={`${this.getCssBlockName()}__icon`} >
            <PhoneIcon/>
        </div>;
    }
    render() {
        // console.log('RowFormPhoneFieldView.render');
        return <div className={this.getCssClassNames()}>
            {this.renderPhoneBox()}
            {this.renderCloseButton()}
            {this.renderPhoneIcon()}
        </div>;
    }
}
window.QForms.RowFormPhoneFieldView = RowFormPhoneFieldView;
