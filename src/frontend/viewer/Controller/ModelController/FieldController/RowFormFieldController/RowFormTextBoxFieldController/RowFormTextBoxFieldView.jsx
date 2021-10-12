class RowFormTextBoxFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.state = {
            classList: []
        };
    }
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
    onFocus = async e => {
        // console.log('RowFormTextBoxFieldView.onFocus');
        this.addCssClass('focus');
        await this.rerender();
    }
    onBlur = async e => {
        // console.log('RowFormTextBoxFieldView.onBlur');
        this.removeCssClass('focus');
        await this.rerender();
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TextBox
                classList={[`${this.getCssBlockName()}__input`]}
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder() || null}
                autocomplete={ctrl.getModel().getAttr('autocomplete') || null}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
            <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
                <CloseIcon/>
            </div>
        </div>;
    }
}
window.QForms.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
