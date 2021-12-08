class RowFormPasswordFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
            type: 'password'
        };
    }
    onCloseClick = async e => {
        // console.log('RowFormPasswordFieldView.onCloseClick');
        const ctrl = this.props.ctrl;
        this.getWidget().state.value = '';
        this.getWidget().setState({value: ''});
        ctrl.onChange('');
    }
    isCloseVisible() {
        // console.log('RowFormPasswordFieldView.isCloseVisible', this.props.value);
        const ctrl = this.props.ctrl;
        if (!ctrl.isEditable()) return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', this.getWidget().state.value);
        return this.getWidget().state.value !== '';
    }
    onFocus = async e => {
        // console.log('RowFormPasswordFieldView.onFocus');
        this.addCssClass('focus');
        await this.rerender();
    }
    onBlur = async e => {
        // console.log('RowFormPasswordFieldView.onBlur');
        this.removeCssClass('focus');
        await this.rerender();
    }
    onIconClick = e => {
        this.setState(prevState => {
            return {
                type: prevState.type === 'password' ? 'text' : 'password'
            };
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TextBox
                classList={[`${this.getCssBlockName()}__input`]}
                type={this.state.type}
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
            />
            <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`}
                 onClick={this.onCloseClick}
            >
                <CloseIcon/>
            </div>
            <div className={`${this.getCssBlockName()}__icon`} onClick={this.onIconClick}>
                {this.state.type === 'password' ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </div>
        </div>;
    }
}
window.QForms.RowFormPasswordFieldView = RowFormPasswordFieldView;
