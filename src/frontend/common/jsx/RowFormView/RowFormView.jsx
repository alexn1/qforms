class RowFormView extends ReactComponent {
    renderToolbar() {
        // console.log('Toolbar.renderToolbar');
        const ctrl = this.props.ctrl;
        const width = '90px';
        return (
            <div className="Toolbar">
                {ctrl.model.getDataSource().getClassName() === 'SqlDataSource' &&
                [
                    <Button
                        key="edit"
                        title="Edit"
                        onClick={ctrl.onEditClick}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />,
                    <Button
                        key="save"
                        title="Save"
                        enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                        onClick={ctrl.onSaveClick.bind(ctrl)}
                        visible={ctrl.state.mode === 'edit'}
                        width={width}
                    />,
                    <Button
                        key="cancel"
                        title="Cancel"
                        visible={ctrl.state.mode === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                        onClick={ctrl.onCancelClick}
                        width={width}
                    />,
                    <Button
                        key="discard"
                        title="Discard"
                        enabled={ctrl.state.changed || !ctrl.isValid()}
                        onClick={ctrl.onDiscardClick.bind(ctrl)}
                        visible={ctrl.state.mode === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        width={width}
                    />,
                    <Button
                        key="refresh"
                        title="Refresh"
                        enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                        onClick={ctrl.onRefresh.bind(ctrl)}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />
                ]
                }
                {Object.keys(ctrl.model.data.actions).length > 0 &&
                <DropdownButton actions={ctrl.getActions()} onClick={ctrl.onActionsClick}/>
                }
            </div>
        );
    }
    render() {
        console.log('RowFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`RowFormView ${model.getName()}`}>
                {this.renderToolbar()}
                <FormGrid ctrl={ctrl}/>
            </div>
        );
    }
}
