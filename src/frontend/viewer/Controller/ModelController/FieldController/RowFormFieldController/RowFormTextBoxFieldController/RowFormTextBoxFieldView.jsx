class RowFormTextBoxFieldView extends RowFormFieldView {
    onCloseClick = async e => {
        console.log('RowFormTextBoxFieldView.onCloseClick');
        const ctrl = this.props.ctrl;
        ctrl.widget.state.value = '';
        ctrl.widget.setState({value: ''});
        ctrl.onChange('');
    }
    isCloseVisible() {
        // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
        const ctrl = this.props.ctrl;
        if (!ctrl.isEditable()) return false;
        if (!ctrl.widget) {
            return this.props.value !== undefined;
        }
        // console.log('ctrl.widget.state.value:', ctrl.widget.state.value);
        return ctrl.widget.state.value !== '';
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TextBox
                cssBlockName={`${this.getCssBlockName()}__input`}
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder() || null}
                autocomplete={ctrl.getModel().getAttr('autocomplete') || null}
            />
            <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
                <CloseIcon/>
            </div>
        </div>;
    }
}
window.QForms.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
