class TreeItem2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        };
    }
    onDivMouseDown = e => {
        // console.log('TreeItem2.onDivMouseDown', e.currentTarget);
        this.props.tree.select(this.props.item);
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
        return !!this.props.item.items;
    }
    isOpened() {
        return this.state.opened;
    }
    render() {
        const item = this.props.item;
        const tree = this.props.tree;
        return <li key={item.title} className={this.isOpened() ? 'opened' : null}>
            <div onMouseDown={this.onDivMouseDown} className={this.isSelected() ? 'active' : null} style={{paddingLeft: this.props.paddingLeft}}>
                <span className={this.isNode() ? 'node' : 'leaf'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span>{item.title}</span>
            </div>
            {item.items &&
            <ul>
                {item.items.map(item => <TreeItem2 key={item.title} tree={tree} item={item} paddingLeft={this.props.paddingLeft+15}/>)}
            </ul>
            }
        </li>;
    }
}
