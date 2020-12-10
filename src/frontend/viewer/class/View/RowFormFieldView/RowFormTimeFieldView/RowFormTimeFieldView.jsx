class RowFormTimeFieldView extends RowFormFieldView {
    onCloseClick = async e => {
        console.log('RowFormTimeFieldView.onCloseClick');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <TimeBox
                onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                onBlur={ctrl.onBlur}
                placeholder={ctrl.getPlaceholder()}
            />
            <div className={`close visible`} onClick={this.onCloseClick}>
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
