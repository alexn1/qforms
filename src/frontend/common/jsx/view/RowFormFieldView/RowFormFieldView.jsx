class RowFormFieldView extends ReactComponent {
    getClassList() {
        const ctrl = this.props.ctrl;
        return [
            ...super.getClassList(),
            ...(ctrl.state.changed        ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error']   : [])
        ];
    }
}
