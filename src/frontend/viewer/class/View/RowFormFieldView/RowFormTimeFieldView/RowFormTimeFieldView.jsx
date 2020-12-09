class RowFormTimeFieldView extends RowFormFieldView {
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
        </div>
    }
}
