class RowFormDateTimeFieldView extends RowFormFieldView {
    isCloseVisible() {
        return true;
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <DropdownDatePicker
                onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                format={ctrl.model.getFormat()}
                oldDates={this.props.oldDates}
                getMinDate={this.props.getMinDate}
            />
            <div>
                <TimeBox
                    onCreate={ctrl.onView2Create}
                    readOnly={!ctrl.isEditable()}
                    value={ctrl.getValueForTime()}
                    onChange={ctrl.onChange2}
                    placeholder={ctrl.getPlaceholder2()}
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
        </div>;
    }
}
