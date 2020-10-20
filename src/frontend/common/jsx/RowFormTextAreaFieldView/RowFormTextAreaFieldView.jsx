class RowFormTextAreaFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormTextAreaFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <TextBox
                // onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceHolder()}
            />
        </div>;
    }
}
