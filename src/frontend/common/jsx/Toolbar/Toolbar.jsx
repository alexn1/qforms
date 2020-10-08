class Toolbar extends ReactComponent {
    constructor(props) {
        super(props);
    }
    onActionsClick = async li => {
        // console.log('li:', li);
        const action = this.props.controller.model.data.actions[li.dataset.action];
        const result = await this.props.controller.onActionClick(action, this.props.controller.model.getRow());
        if (!result) alert(`no handler for ${action.name}`);
    }
    render() {
        const controller = this.props.controller;
        return (
            <div className="Toolbar">
                {controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="saveFormButton"
                        title="Save"
                        disabled={!((controller.state.changed || controller.state.hasNew) && controller.state.valid)}
                        onClick={controller.onSaveClick.bind(controller)}
                    />
                }
                {controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="discardFormButton"
                        title="Discard"
                        disabled={!(controller.state.changed)}
                        onClick={controller.onDiscardClick.bind(controller)}
                    />
                }
                {controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="refreshFormButton"
                        title="Refresh"
                        disabled={!(!controller.state.changed && !controller.state.hasNew)}
                        onClick={controller.onRefresh.bind(controller)}
                    />
                }
                {Object.keys(controller.model.data.actions).length > 0 &&
                    <DropdownButton
                        actions={controller.getActions()}
                        onClick={this.onActionsClick}
                    />
                }
            </div>
        );
    }
}
