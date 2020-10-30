class RowFormFileFieldView extends RowFormFieldView {
    /*getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormFileFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }*/
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            <input type="file"/>
        </div>;
    }
}
