class RowFormComboBoxFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return [
            'field',
            `RowFormComboBoxFieldView`,
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <ComboBox
                    // onCreate={ctrl.onViewCreate}
                    value={ctrl.getValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    items={ctrl.getItems()}
                />
            </div>
        );
    }
}