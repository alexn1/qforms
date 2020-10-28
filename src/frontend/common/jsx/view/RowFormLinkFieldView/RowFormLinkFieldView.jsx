class RowFormLinkFieldView extends ReactComponent {
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
        return (
            <div className={this.getClassName()}>
                <a href="#">{ctrl.renderValueForView()}</a>
            </div>
        );
    }
}
