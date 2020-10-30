class RowFormComboBoxFieldView extends RowFormFieldView {
    /*getClassName() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return [
            'field',
            `RowFormComboBoxFieldView`,
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }*/
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <ComboBox
                    // onCreate={ctrl.onViewCreate}
                    nullable={true}
                    value={ctrl.renderValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    items={ctrl.getItems()}
                    placeholder={ApplicationController.isInDebugMode() ? '[null]' : null}
                />
            </div>
        );
    }
}