class RowFormTimeFieldView extends RowFormFieldView {
    onCloseClick = async e => {
        console.log('RowFormTimeFieldView.onCloseClick');
        /*const ctrl = this.props.ctrl;
        ctrl.widget.state.value = '';
        ctrl.widget.setState({value: ''});
        ctrl.onChange(null);*/
    }
    isCloseVisible() {
        // console.log('RowFormTimeFieldView.isCloseVisible', this.props.value);
        if (this.props.readOnly) return false;
        const ctrl = this.props.ctrl;
        if (!ctrl.widget) {
            return this.props.value !== undefined;
        }
        // console.log('ctrl.widget.state.value:', ctrl.view.state.value);
        return ctrl.widget.state.value !== '';
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <TimeBox
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                onBlur={ctrl.onBlur}
                placeholder={ctrl.getPlaceholder()}
            />
            <div className={`close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                          strokeMiterlimit="10"></line>
                    <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                          strokeMiterlimit="10"></line>
                </svg>
            </div>
        </div>
    }
}
window.QForms.RowFormTimeFieldView = RowFormTimeFieldView;
