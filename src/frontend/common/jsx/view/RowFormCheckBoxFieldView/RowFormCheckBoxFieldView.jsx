class RowFormCheckBoxFieldView extends RowFormFieldView {
    /*getClassName() {
        const ctrl = this.props.ctrl;
        return [
            'field',
            'RowFormCheckBoxFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }*/
    render() {
        // console.log('RowFormCheckBoxFieldView.render');
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <CheckBox
                // onCreate={ctrl.onViewCreate}
                checked={ctrl.renderValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
            />
        </div>;
    }
}
