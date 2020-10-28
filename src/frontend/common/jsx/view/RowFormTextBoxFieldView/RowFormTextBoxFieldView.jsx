class RowFormTextBoxFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormTextBoxFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(row)}>
            <TextBox
                // onCreate={ctrl.onViewCreate}
                value={ctrl.renderValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceHolder()}
            />
        </div>;
    }
}
