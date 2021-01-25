class TreeItem2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            opened: props.item.opened !== undefined ? props.item.opened : false
        };
    }
    onDivMouseDown = e => {
        // console.log('TreeItem2.onDivMouseDown', e.currentTarget);
        const item = this.props.item;
        const tree = this.props.tree;
        if (!tree.isSelected(item)) {
            tree.select(item);
            if (item.onSelect) item.onSelect();
        }
    }
    onDivDoubleClick = e => {
        // console.log('TreeItem2.onDivDoubleClick');
        const item = this.props.item;
        if (item.onDoubleClick) item.onDoubleClick();
    }
    onNodeMouseDown = e => {
        // console.log('TreeItem2.onNodeMouseDown', e.currentTarget);
        e.stopPropagation();
        this.setState(prevState => {
            return {opened: !prevState.opened};
        });
    }
    isSelected() {
        return this.props.tree.state.selectedItem === this.props.item;
    }
    isNode() {
        return this.hasItems();
    }
    isOpened() {
        return this.state.opened;
    }
    hasItems() {
        const item = this.props.item;
        return !!(item.items && item.items.length);
    }
    render() {
        const item = this.props.item;
        const tree = this.props.tree;
        return <li key={item.title} className={this.isOpened() ? 'opened' : null}>
            <div className={this.isSelected() ? 'active' : null}
                 style={{paddingLeft: this.props.paddingLeft}}
                 onMouseDown={this.onDivMouseDown}
                 onDoubleClick={this.onDivDoubleClick}
            >
                <span className={this.isNode() ? 'node' : 'leaf'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span>{item.title}</span>
            </div>
            {this.hasItems() &&
            <ul>
                {item.items.map(item => <TreeItem2 key={item.title} tree={tree} item={item} paddingLeft={this.props.paddingLeft+15}/>)}
            </ul>
            }
        </li>;
    }
}
