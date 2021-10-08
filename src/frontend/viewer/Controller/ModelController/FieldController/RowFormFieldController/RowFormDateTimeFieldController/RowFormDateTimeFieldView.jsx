class RowFormDateTimeFieldView extends RowFormFieldView {
    onCloseDown = async e => {
        console.log('RowFormDateTimeFieldView.onCloseDown');
        const ctrl = this.props.ctrl;
        ctrl.widget2.setState({value: ''}, () => {
            ctrl.onChange2(null);
        });
    }
    isCloseVisible() {
        if (this.props.readOnly) return false;
        const ctrl = this.props.ctrl;
        if (!ctrl.widget2) {
            return this.props.value !== undefined;
        }
        return ctrl.widget2.state.value !== '';
    }
    render() {
        // console.log('RowFormDateTimeFieldView.render');
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssClassNames()} ${this.props.ctrl.state.value ? 'datetime' : 'date'}`}
                 style={this.getStyle(ctrl.getRow())}>
                <DropdownDatePicker
                    onCreate={ctrl.onWidgetCreate}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    placeholder={ctrl.getPlaceholder()}
                    format={ctrl.model.getFormat()}
                    oldDates={this.props.oldDates}
                    getMinDate={this.props.getMinDate}
                />
                <div className={'time'}>
                    <TimeBox
                        onCreate={ctrl.onView2Create}
                        readOnly={!ctrl.isEditable()}
                        value={ctrl.getValueForTime()}
                        onChange={ctrl.onChange2}
                        onBlur={ctrl.onBlur2}
                        placeholder={ctrl.getPlaceholder2()}
                    />
                    <div className={`close ${this.isCloseVisible() ? 'visible' : ''}`} onMouseDown={this.onCloseDown}>
                        <CloseIcon/>
                    </div>
                </div>
            </div>
        );
    }
}
window.QForms.RowFormDateTimeFieldView = RowFormDateTimeFieldView;
