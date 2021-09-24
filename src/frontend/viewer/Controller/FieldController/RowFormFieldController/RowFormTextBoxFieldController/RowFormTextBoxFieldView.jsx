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
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder() || null}
                autocomplete={ctrl.getModel().getAttr('autocomplete') || null}
            />
            <div className={`close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                          strokeMiterlimit="10"></line>
                    <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                          strokeMiterlimit="10"></line>
                </svg>
            </div>
        </div>;
    }
}
window.QForms.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
