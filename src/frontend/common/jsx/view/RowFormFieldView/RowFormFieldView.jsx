class RowFormFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        return [
            ...(this.props.classList || []),
            `RowForm${ctrl.model.getClassName()}View`,
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
}
