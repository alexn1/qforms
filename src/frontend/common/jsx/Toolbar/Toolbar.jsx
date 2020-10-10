class Toolbar extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className="Toolbar">
                {ctrl.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    [
                        <Button
                            key="saveFormButton"
                            name="saveFormButton"
                            title="Save"
                            enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                            onClick={ctrl.onSaveClick.bind(ctrl)}
                        />,
                        <Button
                            key="discardFormButton"
                            name="discardFormButton"
                            title="Discard"
                            enabled={ctrl.state.changed || !ctrl.isValid()}
                            onClick={ctrl.onDiscardClick.bind(ctrl)}
                        />,
                        <Button
                            key="refreshFormButton"
                            name="refreshFormButton"
                            title="Refresh"
                            enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                            onClick={ctrl.onRefresh.bind(ctrl)}
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
