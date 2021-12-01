class RowFormTimeFieldView extends RowFormFieldView {
    onCloseClick = async e => {
        console.log('RowFormTimeFieldView.onCloseClick');
        /*const ctrl = this.props.ctrl;
        this.getWidget().state.value = '';
        this.getWidget().setState({value: ''});
        ctrl.onChange(null);*/
    }
    isCloseVisible() {
        // console.log('RowFormTimeFieldView.isCloseVisible', this.props.value);
        if (this.props.readOnly) return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', ctrl.view.state.value);
        return this.getWidget().state.value !== '';
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TimeBox
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                onBlur={ctrl.onBlur}
                placeholder={ctrl.getPlaceholder()}
            />
            <div className={`close ${this.isCloseVisible() ? 'visible' : ''}`} onClick={this.onCloseClick}>
                <CloseIcon/>
            </div>
        </div>
    }
}
window.QForms.RowFormTimeFieldView = RowFormTimeFieldView;
