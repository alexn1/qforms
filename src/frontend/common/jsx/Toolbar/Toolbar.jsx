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
                        disabled={!this.props.controller.state.saveFormButton}
                        onClick={this.props.controller.onSaveClick.bind(this.props.controller)}
                    />
                }
                {this.props.controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="discardFormButton"
                        title="Discard"
                        disabled={!this.props.controller.state.discardFormButton}
                        onClick={this.props.controller.onDiscardClick.bind(this.props.controller)}
                    />
                }
                {this.props.controller.model.getDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        name="refreshFormButton"
                        title="Refresh"
                        disabled={!this.props.controller.state.refreshFormButton}
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
