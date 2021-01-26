class TreeWidget2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    }
    select(item) {
        // console.log('TreeWidget2.select', item);
        if (this.isSelected(item)) return;
        this.setState({selectedItem: item});
        if (this.props.onItemSelect) this.props.onItemSelect(item);
    }
    onDoubleClick(item) {
        // console.log('TreeWidget2.onDoubleClick', item);
        if (this.props.onItemDoubleClick) this.props.onItemDoubleClick(item);
    }
    onOpen(item) {
        if (this.props.onItemOpen) this.props.onItemOpen(item);
    }
    isSelected(item) {
        return this.state.selectedItem === item;
    }
    render() {
        console.log('TreeWidget2.render'/*, this.props.items*/);
        const items = this.props.items;
        return <div className={'TreeWidget2'}>
            <ul>
                {items.map(item =>
                    <TreeItem2
                        key={item.title}
                        tree={this}
                        item={item}
                        paddingLeft={5}
                        onCreate={c => { if (item.ctrl) item.ctrl.c = c}}
                    />
                )}
            </ul>
        </div>;
    }
}
