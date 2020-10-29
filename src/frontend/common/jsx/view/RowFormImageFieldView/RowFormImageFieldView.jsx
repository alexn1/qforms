class RowFormImageFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormImageFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <Image src={ctrl.renderValueForView()}/>
        </div>;
    }
}
