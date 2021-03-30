class ActionList extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }
    onClick = async li => {
        console.log('ActionList.onClick', li);
        await this.props.onClick(li.dataset.action);
    }
    render() {
        // console.log('ActionList.render', this.state.item);
        return <DropdownButton onClick={this.onClick} actions={this.state.item ? this.state.item.getActions().map(action => {
            return {name: action.action, title: action.caption};
        }) : []}>Actions</DropdownButton>
    }
}
