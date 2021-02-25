class ActionList extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }
    onActionClick = async li => {
        console.log('ActionList.onActionClick', li);
        await this.props.ctrl.onActionClick(li.dataset.action);
    }
    render() {
        // console.log('ActionList.render', this.state.item);
        return <DropdownButton onClick={this.onActionClick} actions={this.state.item ? this.state.item.getActions().map(action => {
            return {name: action.action, title: action.caption};
        }) : []}>Actions</DropdownButton>
    }
}
