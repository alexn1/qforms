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
        return (
            <div className="Toolbar">
                {this.props.controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="saveFormButton"
                        title="Save"
                        isDisabled={this.props.controller.buttonIsDisabled.bind(this.props.controller)}
                        onClick={this.props.controller.onSaveClick.bind(this.props.controller)}
                    />
                }
                {this.props.controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="discardFormButton"
                        title="Discard"
                        isDisabled={this.props.controller.buttonIsDisabled.bind(this.props.controller)}
                        onClick={this.props.controller.onDiscardClick.bind(this.props.controller)}
                    />
                }
                {this.props.controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="refreshFormButton"
                        title="Refresh"
                        isDisabled={this.props.controller.buttonIsDisabled.bind(this.props.controller)}
                        onClick={this.props.controller.onRefresh.bind(this.props.controller)}
                    />
                }
                {Object.keys(this.props.controller.model.data.actions).length > 0 &&
                    <DropdownButton
                        actions={this.props.controller.getActions()}
                        onClick={this.onActionsClick}
                    />
                }
            </div>
        );
    }
}
