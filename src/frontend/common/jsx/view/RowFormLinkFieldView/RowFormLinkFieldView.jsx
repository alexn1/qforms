class RowFormLinkFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormLinkFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.renderValueForView()}</a>
            </div>
        );
    }
}
