class RowFormPhoneFieldView extends RowFormFieldView {
    onCloseClick = async e => {
        const ctrl = this.getCtrl();
        this.getWidget().state.value = '';
        this.getWidget().setState({value: ''});
        ctrl.onChange('');
    }
    isCloseVisible() {
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable()) return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', this.getWidget().state.value);
        return this.getWidget().state.value !== '';
    }
    render() {
        console.log('RowFormPhoneFieldView.render');
        const ctrl = this.getCtrl();
        return <div className={this.getCssClassNames()}>
            <PhoneBox classList={[`${this.getCssBlockName()}__input`]}
                      value={ctrl.getValueForWidget()}
                      readOnly={!ctrl.isEditable()}
                      disabled={!ctrl.isEditable()}
                      autoFocus={ctrl.isAutoFocus()}
                      placeholder={ctrl.getPlaceholder() || null}
                      autocomplete={ctrl.getAutocomplete()}
                      onCreate={this.onWidgetCreate}
                      onChange={ctrl.onChange}
            />
            <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`}
                 onClick={this.onCloseClick}
            >
                <CloseIcon/>
            </div>
        </div>;
    }
}
