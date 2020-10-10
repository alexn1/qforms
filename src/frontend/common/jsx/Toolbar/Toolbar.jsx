class Toolbar extends ReactComponent {
    render() {
        console.log('Toolbar.render', this.props, this.props.ctrl.state.mode === 'view');
        const ctrl = this.props.ctrl;
        return (
            <div className="Toolbar">
                {ctrl.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    [
                        <Button
                            key="edit"
                            title="Edit"
                            onClick={ctrl.onEditClick}
                            visible={ctrl.state.mode === 'view'}
                        />,
                        <Button
                            key="cancel"
                            title="Cancel"
                            visible={ctrl.state.mode === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                            onClick={ctrl.onCancelClick}
                        />,
                        <Button
                            key="discard"
                            title="Discard"
                            enabled={ctrl.state.changed || !ctrl.isValid()}
                            onClick={ctrl.onDiscardClick.bind(ctrl)}
                            visible={ctrl.state.mode === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        />,
                        <Button
                            key="save"
                            title="Save"
                            enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                            onClick={ctrl.onSaveClick.bind(ctrl)}
                            visible={ctrl.state.mode === 'edit'}
                        />,
                        <Button
                            key="refresh"
                            title="Refresh"
                            enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                            onClick={ctrl.onRefresh.bind(ctrl)}
                            visible={ctrl.state.mode === 'view'}
                        />
                    ]
                }
                {Object.keys(ctrl.model.data.actions).length > 0 &&
                    <DropdownButton actions={ctrl.getActions()} onClick={ctrl.onActionsClick}/>
                }
            </div>
        );
    }
}
