class Toolbar extends ReactComponent {
    // constructor(props) {
    //     super(props);
    // }
    onActionsClick = async li => {
        // console.log('Toolbar.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const action = ctrl.model.data.actions[li.dataset.action];
        const result = await ctrl.onActionClick(action, ctrl.model.getRow());
        if (!result) alert(`no handler for ${action.name}`);
    }
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
                            enabled={ctrl.state.changed}
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
                    <DropdownButton
                        actions={ctrl.getActions()}
                        onClick={this.onActionsClick}
                    />
                }
            </div>
        );
    }
}
